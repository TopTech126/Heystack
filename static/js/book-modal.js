const bookModal = document.getElementById("book-modal");
const btn = document.getElementById("open-book-modal");
const btn2 = document.getElementById("open2-book-modal");
const span = document.getElementsByClassName("book-close-button")[0];

btn.onclick = function() {
  bookModal.style.display = "block";
}

btn2.onclick = function() {
  bookModal.style.display = "block";
}

span.onclick = function() {
  bookModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == bookModal) {
    bookModal.style.display = "none";
  }
}
