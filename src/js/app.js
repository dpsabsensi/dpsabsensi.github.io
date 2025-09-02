// app.js
import { API_URL } from './config.js';

function showMessage(text, type = "info") {
  const msg = document.getElementById("message");
  msg.textContent = text;

  // reset bg based on type
  msg.classList.remove("bg-blue-600", "bg-red-600", "bg-green-600");
  if (type === "error") msg.classList.add("bg-red-600");
  else if (type === "success") msg.classList.add("bg-green-600");
  else msg.classList.add("bg-blue-600");

  // Fade in
  msg.classList.remove("opacity-0");
  msg.classList.add("opacity-100");

  // Fade out after 3s
  setTimeout(() => {
    msg.classList.remove("opacity-100");
    msg.classList.add("opacity-0");
  }, 3000);
}

document.getElementById('upload-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fileInput = document.querySelector('input[type="file"]');
  const formData = new FormData();
  formData.append('csvFile', fileInput.files[0]);

  showMessage("⏳ Uploading...", "info");

  try {
    const uploadRes = await fetch(`${API_URL}/upload.php`, {
      method: 'POST',
      body: formData,
    });

    const rawText = await uploadRes.text();

    let uploadResult;
    try {
      uploadResult = JSON.parse(rawText);
    } catch (err) {
      console.error("Error parsing JSON dari upload.php:", err.message, rawText);
      showMessage("❌ Upload gagal: respons server bukan JSON valid.", "error");
      return;
    }

    if (!uploadResult.success) {
      showMessage('❌ Upload gagal: ' + uploadResult.message, "error");
      return;
    }

    // ✅ Upload dan parsing berhasil
    showMessage('✅ Sukses! Data berhasil diparse', "success");
    console.log("Parsed data:", uploadResult.parse_log);

    if (uploadResult.parse_log && uploadResult.parse_log.data) {
      console.log("User Logs:", uploadResult.parse_log.data);
    }

  } catch (error) {
    showMessage('❌ Terjadi kesalahan: ' + error.message, "error");
  }
});