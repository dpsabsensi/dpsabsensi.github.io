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
    const uploadRes = await fetch('../php/upload.php', {
      method: 'POST',
      body: formData,
    });

    // Ambil respons sebagai teks mentah terlebih dahulu
    const rawText = await uploadRes.text();
    // console.log("Raw response dari upload.php:", rawText);
    
    // Coba parse ke JSON
    let uploadResult;
    try {
      uploadResult = JSON.parse(rawText);
    } catch (err) {
      console.error("Error parsing JSON dari upload.php:", err.message, rawText);
      messageEl.innerText = "❌ Upload gagal: Respons server bukan JSON valid. Periksa console log.";
      return;
    }

    // if (!uploadResult.success) {
    //   messageEl.innerText = '❌ Upload gagal: ' + uploadResult.message;
    //   return;
    // }
    
    // Jika upload berhasil, lanjutkan proses parse
    const filename = uploadResult.filename;
    messageEl.innerText = "📁 File di-upload, mulai parse...";

    const parseForm = new FormData();
    parseForm.append('filename', filename);

    const parseRes = await fetch('../php/parse.php', {
      method: 'POST',
      body: parseForm,
    });

    const parseRaw = await parseRes.text();
    console.log("Raw response dari parse.php:", parseRaw);
    let parseResult;
    try {
      parseResult = JSON.parse(parseRaw);
    } catch (err) {
      console.error("Error parsing JSON dari parse.php:", err.message, parseRaw);
      messageEl.innerText = "❌ Parse gagal: Respons server bukan JSON valid. Periksa console log.";
      return;
    }

    // if (!parseResult.success) {
    //   messageEl.innerText = '⚠️ Parsing gagal: ' + parseResult.message;
    //   return;
    // }

    messageEl.innerText = '✅ Sukses! Data berhasil diparse';
    // console.log("Parsed data:", parseResult.data);
  } catch (error) {
    messageEl.innerText = '❌ Terjadi kesalahan: ' + error.message;
  }
});