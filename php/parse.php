<?php
// parse.php
include_once __DIR__ . '/lib.php';
include_once __DIR__ . "/indexer.php";

ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

$tahun = $_POST["tahun"] ?? date("Y");
$uploadDir = __DIR__ . "/uploads/$tahun/";
$jsonDir   = __DIR__ . "/json/$tahun/";

// === Load libur nasional ===
$holidayFile = __DIR__ . "/holidays/$tahun.json";
$holidayMap = [];
if (file_exists($holidayFile)) {
    $dataLibur = json_decode(file_get_contents($holidayFile), true);
    foreach ($dataLibur as $row) {
        if (!empty($row["is_national_holiday"])) {
            $holidayMap[$row["date"]] = true; // format: YYYY-MM-DD
        }
    }
}

// === Cek input ===
if (empty($_POST["filename"])) {
    echo json_encode(["success" => false, "message" => "❌ Tidak ada filename dikirim."]);
    exit;
}

$filename = basename($_POST["filename"]);
$filepath = $uploadDir . $filename;

if (!file_exists($filepath)) {
    echo json_encode(["success" => false, "message" => "❌ File tidak ditemukan: $filepath"]);
    exit;
}

// === Mulai parsing ===
$userLogs      = [];
$firstDatetime = null;
$debugRows     = [];

$handle = fopen($filepath, "r");
if ($handle === false) {
    echo json_encode(["success" => false, "message" => "❌ Gagal membuka file."]);
    exit;
}

// Lewati 3 baris meta
for ($i = 0; $i < 3; $i++) fgetcsv($handle, 0, ",");

// Ambil header kolom
$headers = fgetcsv($handle, 0, ",");
file_put_contents(__DIR__ . "/logs/headers_debug.txt", print_r($headers, true));

while (($row = fgetcsv($handle, 0, ",")) !== false) {
    if (count($row) <= 1) continue; // skip kosong/rusak
    $entry = array_combine($headers, $row);
    if (!$entry) continue;

    $id       = trim($entry["User ID"] ?? "");
    $nama     = trim($entry["Full Name"] ?? "");
    $datetime = trim($entry["Date/Time"] ?? "");

    if (!$id || !$nama || !$datetime) continue;

    if ($firstDatetime === null) {
        $firstDatetime = $datetime; // format: 06/01/2025 07:48
    }

    [$date, $time] = explode(" ", $datetime);

    // Parse tanggal ke objek
    $dateTimeObj = DateTime::createFromFormat("m/d/Y", $date);
    if (!$dateTimeObj) continue;
    $ymd = $dateTimeObj->format("Y-m-d");
    $isSaturday = $dateTimeObj->format("N") == 6;

    // Debug holidayMap
    file_put_contents(__DIR__ . "/logs/holiday_debug.txt", json_encode($holidayMap, JSON_PRETTY_PRINT));

    file_put_contents(
        __DIR__ . "/logs/holiday_check.txt",
        "$ymd → " . (isset($holidayMap[$ymd]) ? "HOLIDAY" : "WORKDAY") . PHP_EOL,
        FILE_APPEND
    );

    // Konversi jam ke menit
    $timeOnly = DateTime::createFromFormat("H:i", $time);
    if (!$timeOnly) continue;
    $hour  = (int)$timeOnly->format("H");
    $minute = (int)$timeOnly->format("i");
    $minutesSinceMidnight = $hour * 60 + $minute;

    // Tentukan tipe
    if ($minutesSinceMidnight >= 420 && $minutesSinceMidnight <= 600) { // 07:00 - 10:00
        $type = "in";
    } elseif ($minutesSinceMidnight >= 690 && $minutesSinceMidnight <= 780) { // 11:30 - 13:00
        $logsForDate = $userLogs[$id]["days"][$ymd]["logs"] ?? [];
        $prev = end($logsForDate);
        if ($prev && $prev["type"] === "break-in") {
            $type = "break-out";
        } else {
            $type = "break-in";
        }
    } elseif (
        (!$isSaturday && $minutesSinceMidnight >= 960) ||  // >= 16:00
        ($isSaturday && $minutesSinceMidnight >= 840)      // >= 14:00
    ) {
        $type = "out";
    } else {
        continue;
    }

    // Simpan ke struktur
    if (!isset($userLogs[$id])) {
        $userLogs[$id] = [
            "id"   => (int)$id,
            "nama" => $nama,
            "days" => []
        ];
    }
    if (!isset($userLogs[$id]["days"][$ymd])) {
        $userLogs[$id]["days"][$ymd] = [
            "logs"    => [],
            "holiday" => isset($holidayMap[$ymd]) ? true : false,
            "status"  => "A"
        ];
    }
    $userLogs[$id]["days"][$ymd]["logs"][] = [
        "time" => $time,
        "type" => $type
    ];

    // simpan debug row
    if (count($debugRows) < 10) {
        $debugRows[] = $entry;
    }
}
fclose($handle);

// === Lengkapi semua tanggal dalam bulan meski kosong ===
if ($firstDatetime) {
    [$tgl] = explode(" ", $firstDatetime);
    [$bulanAngka, $hariAwal, $tahunAwal] = explode("/", $tgl); // format mm/dd/YYYY

    $monthStart = new DateTime("$tahunAwal-$bulanAngka-01");
    $monthEnd   = clone $monthStart;
    $monthEnd->modify('last day of this month');

    $period = new DatePeriod($monthStart, new DateInterval('P1D'), $monthEnd->modify('+1 day'));

    foreach ($userLogs as &$user) {
        foreach ($period as $d) {
            $ymd = $d->format("Y-m-d");
            if (!isset($user["days"][$ymd])) {
                $user["days"][$ymd] = [
                    "logs"    => [],
                    "holiday" => isset($holidayMap[$ymd]) ? true : false,
                    "status"  => isset($holidayMap[$ymd]) ? "L" : "A"
                ];
            }
        }
        ksort($user["days"]); // biar urut tanggal
    }
    unset($user);
}

// Simpan debug parsing
file_put_contents(__DIR__ . "/logs/rows_debug.txt", print_r($debugRows, true));
file_put_contents(__DIR__ . "/logs/log_parse_debug_last.txt", json_encode($userLogs, JSON_PRETTY_PRINT));

// === Hitung status harian + summary ===
foreach ($userLogs as &$user) {
    $summary = ["H"=>0,"A"=>0,"L"=>0,"MT"=>0,"H+L"=>0];
    foreach ($user["days"] as $tgl => &$day) {
        $logs = $day["logs"];
        $jamMasuk = null;
        $jamKeluar = null;
        foreach ($logs as $l) {
            if ($l["type"] === "in" && !$jamMasuk) $jamMasuk = $l["time"];
            if ($l["type"] === "out") $jamKeluar = $l["time"];
        }

        if ($day["holiday"]) {
            if (empty($logs)) {
                $day["status"] = "L";
                $summary["L"]++;
            } else {
                $day["status"] = "H";
                $summary["H"]++;
                $summary["H+L"]++;
            }
        } else {
            if ($jamMasuk && $jamKeluar) {
                $day["status"] = "H";
                $summary["H"]++;
            } elseif (!empty($logs)) {
                $day["status"] = "MT";
                $summary["MT"]++;
            } else {
                $day["status"] = "A";
                $summary["A"]++;
            }
        }
    }
    $user["summary"] = $summary;
}
unset($user, $day);

// === Tentukan nama file output JSON ===
if ($firstDatetime) {
    [$tgl] = explode(" ", $firstDatetime);
    [$bulanAngka, $hari, $tahun] = explode("/", $tgl); // format mm/dd/YYYY
    $outputFileName = "{$tahun}-{$bulanAngka}.json";
} else {
    $outputFileName = pathinfo($filename, PATHINFO_FILENAME) . ".json";
}

// Simpan ke file JSON
if (!is_dir($jsonDir)) {
    mkdir($jsonDir, 0777, true);
}
$outputFile = $jsonDir . $outputFileName;
file_put_contents($outputFile, json_encode(array_values($userLogs), JSON_PRETTY_PRINT));

// === Response ke frontend ===
echo json_encode([
    "success" => true,
    "message" => "Parsing selesai.",
    "output"  => "/json/$tahun/$outputFileName",
    "data"    => $userLogs
]);

generate_json_index();