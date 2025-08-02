<?php
$targetPath = realpath(__DIR__ . '/../data/') . '/';

if (!file_exists($targetPath)) {
    mkdir($targetPath, 0777, true); // buat folder jika belum ada
}

if (isset($_FILES['csvFile'])) {
    $filename = basename($_FILES['csvFile']['name']);
    $savePath = $targetPath . $filename;

    if (move_uploaded_file($_FILES['csvFile']['tmp_name'], $savePath)) {
        echo "✅ Berhasil upload ke $savePath";
    } else {
        echo "❌ Gagal upload";
    }
} else {
    echo "❌ Tidak ada file diupload.";
}
?>
