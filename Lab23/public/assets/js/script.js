document.addEventListener("DOMContentLoaded", function() {
    const errorBlock = document.querySelector(".error-block");
    if (errorBlock.textContent.trim() !== "") {
      errorBlock.parentElement.classList.add("has-error");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const errorBlock = document.querySelector(".success-block");
    if (errorBlock.textContent.trim() !== "") {
      errorBlock.parentElement.classList.add("has-success");
    }
});