document.querySelectorAll(".tab-btn").forEach(button => {
  button.addEventListener("click", () => {
    const parent = button.closest(".form-container");
    parent.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    parent.querySelectorAll(".form-content").forEach(form => form.classList.remove("active"));

    button.classList.add("active");
    parent.querySelector("#" + button.dataset.tab).classList.add("active");
  });
});


const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})


