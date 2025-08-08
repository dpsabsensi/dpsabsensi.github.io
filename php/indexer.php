<?php
// indexer.php
function generate_json_index() {
    $baseDir = __DIR__ . '/../public/data/json/';
    $index = [];

    $bulanMap = [
        'januari', 'februari', 'maret', 'april', 'mei', 'juni',
        'juli', 'agustus', 'september', 'oktober', 'november', 'desember'
    ];

    // Telusuri semua folder tahun di bawah /data/json/
    foreach (glob($baseDir . '*', GLOB_ONLYDIR) as $tahunFolder) {
        $tahun = basename($tahunFolder);
        $index[$tahun] = [];

        foreach (glob("$tahunFolder/*.json") as $file) {
            $namaFile = pathinfo($file, PATHINFO_FILENAME); // contoh: 2025-06
            if (preg_match("/^(\d{4})-(\d{2})$/", $namaFile, $match)) {
                $tahunParsed = $match[1];
                $bulanParsed = $match[2];

                if (!isset($index[$tahunParsed])) $index[$tahunParsed] = [];
                $index[$tahunParsed][] = $bulanParsed;
            }
        }

        // Unik dan urutkan bulannya
        $index[$tahun] = array_values(array_unique($index[$tahun]));
        usort($index[$tahun], function($a, $b) use ($bulanMap) {
            return array_search($a, $bulanMap) - array_search($b, $bulanMap);
        });
    }

    // Simpan ke file JSON
    $outputFile = $baseDir . 'list_index.json';
    file_put_contents($outputFile, json_encode($index, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo "✅ Berhasil generate index: $outputFile\n";
}
?>