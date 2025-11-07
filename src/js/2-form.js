const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
form.elements.email.value = savedData.email || "";
form.elements.message.value = savedData.message || "";

form.addEventListener("input", (e) => {
  const data = {
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    return alert("Fill please all fields");
  }

  console.log({ email, message });
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});