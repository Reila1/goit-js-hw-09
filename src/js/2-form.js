let formData = {
  email: "",
  message: "",
};

const form = document.querySelector(".feedback-form");
const localStorageKey = "feedback-form-state";
function onFormInput(event) {
  if (event.target.name === 'email' || event.target.name === 'message') {
    formData[event.target.name] = event.target.value.trim();
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(formData));
    } catch (error) {
      console.error("Помилка запису в локальне сховище:", error);
    }
  }
}

function populateForm() {
  try {
    const savedState = localStorage.getItem(localStorageKey);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState && typeof parsedState === 'object') {
        formData = {
          email: parsedState.email || "",
          message: parsedState.message || "", 
        };
        form.elements.email.value = formData.email;
        form.elements.message.value = formData.message;
      }
    }
  } catch (error) {
    console.error("Помилка читання або парсингу локального сховища:", error);
    formData = { email: "", message: "" };
  }
}
function onFormSubmit(event) {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return; 
  }

  console.log(formData); 
  try {
    localStorage.removeItem(localStorageKey);
  } catch (error) {
    console.error("Помилка видалення з локального сховища:", error);
  }

  formData = { email: "", message: "" };
  form.reset(); 
}

populateForm();
form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);