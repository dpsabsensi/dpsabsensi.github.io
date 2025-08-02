<?php
// parse.php
include_once __DIR__ . "/lib.php";

ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

$tahun = date("Y");
$uploadDir = __DIR__ . "/../data/uploads/$tahun/";
$jsonDir = __DIR__ . "/../data/json/$tahun/";

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
        $type = (!isset($userLogs[$id]["logs"][$date]) || count($userLogs[$id]["logs"][$date]) % 2 == 0) ? "in" : "out";

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
    $namaBulan = getNamaBulan($bulanAngka);
    $outputFileName = strtolower($namaBulan . $tahun) . ".json";
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
    "output" => "data/json/$tahun/$outputFileName",
    "data" => $userLogs
]);

ob_end_flush();
file_put_contents(__DIR__ . "/../log/log_parse_debug_last.txt", ob_get_contents());
?>
