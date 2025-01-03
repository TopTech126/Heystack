const applyModal = document.getElementById("apply-modal");
const openApply = document.getElementsByClassName("open-apply");
const closeApply = document.getElementsByClassName("close-apply")[0];

for (let i = 0; i < openApply.length; i++) {
  openApply[i].addEventListener("click", function (e) {
    applyModal.style.display = "block";
  })
}

if (closeApply) {
  closeApply.onclick = function () {
    applyModal.style.display = "none";
  }
}

window.onclick = function (event) {
  if (event.target == applyModal) {
    if (applyModal)
      applyModal.style.display = "none";
  }
}

