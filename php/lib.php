<?php
// lib.php

date_default_timezone_set("Asia/Jakarta");

// Fungsi bantu untuk memastikan folder ada
function ensure_dir($path) {
    if (!is_dir($path)) {
        mkdir($path, 0777, true); // recursive
    }
}

// Buat folder log, upload, dan json jika belum ada
$base = dirname(__DIR__);

$paths = [
    "$base/log",
    "$base/data/uploads/" . date("Y"),
    "$base/data/json/" . date("Y")
];

foreach ($paths as $path) {
    ensure_dir($path); // ✅ gunakan fungsi ini, biar konsisten
}
