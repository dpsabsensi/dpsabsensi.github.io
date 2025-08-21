// app.js
document.getElementById('upload-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fileInput = document.querySelector('input[type="file"]');
  const formData = new FormData();
  formData.append('csvFile', fileInput.files[0]);

  const messageEl = document.getElementById('message');
  messageEl.innerText = "⏳ Uploading...";

  try {
    // Panggil endpoint upload.php
    const uploadRes = await fetch('https://pusatpneumatic.com/absen/upload.php', {
      method: 'POST',
      body: formData,
    });

    // Ambil respons sebagai teks mentah
    const rawText = await uploadRes.text();

    // Parse ke JSON
    let uploadResult;
    try {
      uploadResult = JSON.parse(rawText);
    } catch (err) {
      console.error("Error parsing JSON dari upload.php:", err.message, rawText);
      messageEl.innerText = "❌ Upload gagal: Respons server bukan JSON valid. Periksa console log.";
      return;
    }

    // Cek status sukses
    if (!uploadResult.success) {
      messageEl.innerText = '❌ Upload gagal: ' + uploadResult.message;
      return;
    }

    // ✅ Upload dan parsing berhasil
    messageEl.innerText = '✅ Sukses! Data berhasil diparse';
    console.log("Parsed data:", uploadResult.parse_log);

    // Langsung akses hasil parsing (sudah berupa object)
    if (uploadResult.parse_log && uploadResult.parse_log.data) {
      console.log("User Logs:", uploadResult.parse_log.data);
    }

  } catch (error) {
    messageEl.innerText = '❌ Terjadi kesalahan: ' + error.message;
  }
});