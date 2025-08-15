<?php
// parse.php
include_once __DIR__ . '/lib.php';
include_once __DIR__ . "/indexer.php";


ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

$tahun = date("Y");
$uploadDir = __DIR__ . "/uploads/$tahun/";
$jsonDir = __DIR__ . "/json/$tahun/";

function getNamaBulan($angka) {
    $bulanMap = [
        '01' => 'januari', '02' => 'februari', '03' => 'maret',
        '04' => 'april',   '05' => 'mei',      '06' => 'juni',
        '07' => 'juli',    '08' => 'agustus',  '09' => 'september',
        '10' => 'oktober', '11' => 'november', '12' => 'desember'
    ];
    return $bulanMap[$angka] ?? 'bulan-unknown';
}

if (empty($_POST["filename"])) {
    echo json_encode(["success" => false, "message" => "❌ Tidak ada filename dikirim."]);
    exit;
}

$filename = basename($_POST["filename"]); // sanitize
$filepath = $uploadDir . $filename;

if (!file_exists($filepath)) {
    echo json_encode(["success" => false, "message" => "❌ File tidak ditemukan: $filepath"]);
    exit;
}

$data = [];
$userLogs = [];
$firstDatetime = null;

$handle = fopen($filepath, "r");

if ($handle !== false) {
    // Lewati 3 baris pertama
    for ($i = 0; $i < 3; $i++) fgetcsv($handle, 1000, ";");
    $headers = fgetcsv($handle, 1000, ";");

    while (($row = fgetcsv($handle, 1000, ";")) !== false) {
        $entry = array_combine($headers, $row);

        $id = trim($entry["User ID"]);
        $nama = trim($entry["Full Name"]);
        $datetime = trim($entry["Date/Time"]);

        if (!$id || !$nama || !$datetime) continue;

        if ($firstDatetime === null) {
            $firstDatetime = $datetime; // format: 06/01/2025 07:48
        }

        [$date, $time] = explode(" ", $datetime);

        // Deteksi apakah hari Sabtu
        $dateTimeObj = DateTime::createFromFormat("Y/m/d", $date);
        $isSaturday = $dateTimeObj && $dateTimeObj->format("N") == 6; // 6 = Sabtu

        // Konversi ke timestamp jam-menit
        $timeOnly = DateTime::createFromFormat("H:i", $time);
        $hour = (int)$timeOnly->format("H");
        $minute = (int)$timeOnly->format("i");
        $minutesSinceMidnight = $hour * 60 + $minute;

        // Tentukan tipe berdasarkan waktu
        if ($minutesSinceMidnight >= 420 && $minutesSinceMidnight <= 600) { // 07:00 - 10:00
            $type = "in";
        } elseif ($minutesSinceMidnight >= 690 && $minutesSinceMidnight <= 780) { // 11:30 - 13:00
            $logsForDate = $userLogs[$id]["logs"][$date] ?? [];
            $prev = end($logsForDate);
            if ($prev && isset($prev["type"]) && $prev["type"] === "break-in") {
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

        if (!isset($userLogs[$id])) {
            $userLogs[$id] = [
                "id" => (int)$id,
                "nama" => $nama,
                "logs" => []
            ];
        }

        if (!isset($userLogs[$id]["logs"][$date])) {
            $userLogs[$id]["logs"][$date] = [];
        }

        $userLogs[$id]["logs"][$date][] = [
            "time" => $time,
            "type" => $type
        ];
    }

    fclose($handle);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Gagal membuka file untuk dibaca."
    ]);
    ob_end_flush();
    exit;
}

// Tentukan nama file berdasarkan log pertama
if ($firstDatetime) {
    [$tgl,] = explode(" ", $firstDatetime);
    [$bulanAngka, , $tahun] = explode("/", $tgl);
    $outputFileName = "{$tahun}-{$bulanAngka}.json";
} else {
    $outputFileName = pathinfo($filename, PATHINFO_FILENAME) . ".json"; // fallback
}

// Simpan ke file JSON
$outputPath = $jsonDir;
if (!is_dir($outputPath)) {
    mkdir($outputPath, 0777, true);
}

$outputFile = $outputPath . $outputFileName;
file_put_contents($outputFile, json_encode(array_values($userLogs), JSON_PRETTY_PRINT));

// Output hasil
echo json_encode([
    "success" => true,
    "message" => "Parsing selesai.",
    "output" => "/json/$tahun/$outputFileName",
    "data" => $userLogs
]);

ob_end_flush();
file_put_contents(__DIR__ . "/logs/log_parse_debug_last.txt", ob_get_contents());
generate_json_index();
?>