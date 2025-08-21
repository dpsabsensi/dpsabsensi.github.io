<?php
// upload.php
ini_set("display_errors", 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit();
}

$response = [
    "success" => false,
    "message" => "Terjadi kesalahan.",
    "filename" => null,
    "parse_log" => null
];

if (!isset($_FILES["csvFile"]) || $_FILES["csvFile"]["error"] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    $response["message"] = "❌ Upload file gagal atau file tidak valid.";
    echo json_encode($response);
    exit;
}

include_once __DIR__ . "/lib.php";

// Simpan ke folder sementara
$uploadTempFolder = realpath(__DIR__ . "/tmp/") . '/';
ensure_dir($uploadTempFolder);

$originalName = basename($_FILES["csvFile"]["name"]);
$fileNameTemp = "upload_" . time() . "_" . $originalName;
$tempPath = $uploadTempFolder . $fileNameTemp;

if (!move_uploaded_file($_FILES["csvFile"]["tmp_name"], $tempPath)) {
    http_response_code(500);
    $response["message"] = "❌ Gagal menyimpan file sementara.";
    echo json_encode($response);
    exit;
}

// Ekstrak tahun dari baris ke-4
$handle = fopen($tempPath, "r");
for ($i = 0; $i < 3; $i++) fgetcsv($handle, 0, ";");
$meta = fgetcsv($handle, 0, ";");
fclose($handle);

preg_match("/From (\d{2})\/\d{2}\/(\d{4})/", implode(" ", $meta), $matches);
$tahun = $matches[2] ?? date("Y");

// Simpan ke folder berdasarkan tahun
$uploadFolder = __DIR__ . "/uploads/$tahun/";
ensure_dir($uploadFolder);

$fileNameCSV = "absensi_" . date("Y-m-d_His") . ".csv";
$finalPath = $uploadFolder . $fileNameCSV;

if (!copy($tempPath, $finalPath)) {
    http_response_code(500);
    $response["message"] = "❌ Gagal menyalin file ke folder tujuan.";
    echo json_encode($response);
    exit;
}

// Jalankan parser
$_POST["filename"] = $fileNameCSV;
$_POST["tahun"] = $tahun;

ob_start();
include __DIR__ . "/parse.php";
$parseOutput = trim(ob_get_clean());

// Debug log kalau mau lihat isi mentah
file_put_contents(__DIR__ . "/logs/parse_raw_last.txt", $parseOutput);

$parseJson = json_decode($parseOutput, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    $response["message"] = "❌ Parsing gagal (JSON error: " . json_last_error_msg() . ")";
    $response["parse_log"] = $parseOutput;
} elseif (empty($parseJson["success"])) {
    $response["message"] = "❌ Parsing gagal (tidak ada flag success).";
    $response["parse_log"] = $parseOutput;
} else {
    $response["success"] = true;
    $response["message"] = "✅ Upload dan parsing berhasil.";
    $response["filename"] = $fileNameCSV;
    $response["parse_log"] = $parseJson; // <-- simpan sudah decode, bukan raw string
}

echo json_encode($response);
