const button = document.querySelector("button");

// runtime check
if (button) {
  button.addEventListener("click", () => console.log("clicked"));
}
