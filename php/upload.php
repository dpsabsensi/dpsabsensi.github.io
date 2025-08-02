<?php
// upload.php
ini_set("display_errors", 1);
error_reporting(E_ALL);

ob_start(); // Tangkap semua output tidak terduga
include_once __DIR__ . "/lib.php";

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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

// Log awal request
file_put_contents(__DIR__ . "/../log/log_request.txt", print_r([
    "method" => $_SERVER["REQUEST_METHOD"],
    "headers" => getallheaders(),
    "files" => $_FILES,
    "post" => $_POST
], true));

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (
        !isset($_FILES["csvFile"]) ||
        $_FILES["csvFile"]["error"] !== UPLOAD_ERR_OK ||
        !is_uploaded_file($_FILES["csvFile"]["tmp_name"])
    ) {
        http_response_code(400);
        $response["message"] = "❌ Upload file gagal atau file tidak valid.";
        goto finish;
    }

    // Simpan ke folder sementara
    $uploadTempFolder = realpath(__DIR__ . "/../data/temp/") . '/';
    ensure_dir($uploadTempFolder);

    $originalName = basename($_FILES["csvFile"]["name"]);
    $fileNameTemp = "upload_" . time() . "_" . $originalName;
    $tempPath = $uploadTempFolder . $fileNameTemp;

    // Debug log sebelum move
    file_put_contents(__DIR__ . "/../log/debug_move.txt", json_encode([
        "from" => $_FILES["csvFile"]["tmp_name"],
        "to" => $tempPath,
        "is_uploaded_file" => is_uploaded_file($_FILES["csvFile"]["tmp_name"]),
        "file_exists_tmp" => file_exists($_FILES["csvFile"]["tmp_name"]),
        "writable_target" => is_writable(dirname($tempPath))
    ]));

    if (!move_uploaded_file($_FILES["csvFile"]["tmp_name"], $tempPath)) {
        http_response_code(500);
        $response["message"] = "❌ Gagal menyimpan file sementara.";
        goto finish;
    }

    // Ekstrak tanggal dari baris ke-4 CSV
    $handle = fopen($tempPath, "r");
    for ($i = 0; $i < 3; $i++) fgetcsv($handle, 0, ";");
    $meta = fgetcsv($handle, 0, ";");
    fclose($handle);

    preg_match("/From (\d{2})\/\d{2}\/(\d{4})/", implode(" ", $meta), $matches);
    $tahun = $matches[2] ?? date("Y");

    // Simpan ke folder berdasarkan tahun
    $uploadFolder = __DIR__ . "/../data/uploads/$tahun/";
    ensure_dir($uploadFolder);

    $fileNameCSV = "absensi_" . date("Y-m-d_His") . ".csv";
    $finalPath = $uploadFolder . $fileNameCSV;

    if (!copy($tempPath, $finalPath)) {
        http_response_code(500);
        $response["message"] = "❌ Gagal menyalin file ke folder tujuan.";
        goto finish;
    }

    // Jalankan parser
    $_POST["filename"] = $fileNameCSV;
    $_POST["tahun"] = $tahun;

    ob_start();
    include __DIR__ . "/parse.php";
    $parseOutput = ob_get_clean();

    file_put_contents(__DIR__ . "/../log/log_parse.txt", $parseOutput);

    $parseJson = json_decode($parseOutput, true);
    if (!$parseJson || empty($parseJson["success"])) {
        $response["message"] = "❌ Parsing gagal.";
        $response["parse_log"] = $parseOutput;
    } else {
        $response["success"] = true;
        $response["message"] = "✅ Upload dan parsing berhasil.";
        $response["filename"] = $fileNameCSV;
        $response["parse_log"] = $parseOutput;
    }
}

finish:
$extraOutput = ob_get_clean();

$logFinal = [
    "time" => date("Y-m-d H:i:s"),
    "output_buffer" => $extraOutput,
    "response" => $response,
    "files" => $_FILES,
    "post" => $_POST,
    "server" => [
        "script" => $_SERVER["SCRIPT_FILENAME"] ?? '',
        "method" => $_SERVER["REQUEST_METHOD"] ?? '',
        "content_type" => $_SERVER["CONTENT_TYPE"] ?? '',
    ]
];

file_put_contents(__DIR__ . "/../log/log_upload_debug.json", json_encode($logFinal, JSON_PRETTY_PRINT));

// Jika ada output aneh (HTML, error, dsb) sebelum JSON, catat ke file khusus
if (trim($extraOutput) !== "") {
    file_put_contents(__DIR__ . "/../log/log_unexpected_output.txt", $extraOutput);
}

// Pastikan browser tetap terima JSON
header("Content-Type: application/json");
echo json_encode($response);
