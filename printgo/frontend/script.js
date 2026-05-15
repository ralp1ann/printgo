const form = document.getElementById("printForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  statusText.innerHTML = "Mengirim pesanan...";

  try {
    const response = await fetch("https://NAMA-BACKEND.up.railway.app/upload", {
      method: "POST",
      body: formData
    });

    const result = await response.text();

    statusText.innerHTML = result;

    form.reset();
  } catch (error) {
    statusText.innerHTML = "Gagal mengirim pesanan";
  }
});