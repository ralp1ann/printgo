// your code goes hereconst uploadBtn = document.querySelector(".upload");
const cancelBtn = document.querySelector(".cancel");

const fileInput = document.querySelector("input[type='file']");
const uploadArea = document.querySelector(".upload-area");

const progressBar = document.querySelector(".progress-bar");
const floatingUpload = document.querySelector(".floating-upload");

const tabs = document.querySelectorAll(".tabs button");

uploadBtn.addEventListener("click", () => {

  const nama = document.querySelector("input[placeholder='Masukkan nama']").value;

  const hp = document.querySelector("input[placeholder='08xxxxxxxxxx']").value;

  const lokasi = document.querySelector("input[placeholder='Kos, kelas, atau alamat']").value;

  if(nama === "" || hp === "" || lokasi === ""){

    alert("Lengkapi data terlebih dahulu!");

    return;

  }

  const orderId = "PG-" + Math.floor(Math.random() * 99999);

  localStorage.setItem(orderId, "Pesanan Sedang Diproses");

  alert(
    "Pesanan berhasil dikirim!\n\nNomor Pesanan:\n" + orderId
  );

});

cancelBtn.addEventListener("click", () => {

  location.reload();

});

fileInput.addEventListener("change", () => {

  if(fileInput.files.length > 0){

    const fileName = fileInput.files[0].name;

    document.querySelector(".file-info h4").innerHTML = fileName;

    floatingUpload.style.display = "flex";

    let progress = 0;

    const interval = setInterval(() => {

      progress += 10;

      progressBar.style.width = progress + "%";

      floatingUpload.querySelector("span").innerHTML =
        progress + "%";

      if(progress >= 100){

        clearInterval(interval);

      }

    }, 150);

  }

});

tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    tabs.forEach(btn => {
      btn.classList.remove("active");
    });

    tab.classList.add("active");

    if(tab.innerText === "Lacak Pesanan"){

      const nomor = prompt(
        "Masukkan Nomor Pesanan\nContoh: PG-12345"
      );

      if(nomor){

        const status = localStorage.getItem(nomor);

        if(status){

          alert(
            "Status Pesanan:\n\n" + status
          );

        } else {

          alert(
            "Nomor pesanan tidak ditemukan"
          );

        }

      }

    }

  });

});
