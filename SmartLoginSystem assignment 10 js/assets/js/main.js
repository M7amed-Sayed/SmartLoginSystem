// all inputs
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

//Signup warnings
var userNameWarn = document.getElementById("userNameWarn");
var userEmailWarn = document.getElementById("userEmailWarn");
var userPasswordWarn = document.getElementById("userPasswordWarn");

var requirementListName = document.querySelectorAll(
  ".requirement-list-name li"
);
var requirementListEmail = document.querySelectorAll(
  ".requirement-list-email li"
);
var requirementListPassword = document.querySelectorAll(
  ".requirement-list-password li"
);

//Clear all inputs
function clearInputs() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  signupName.classList.remove("is-valid");
  signupEmail.classList.remove("is-valid");
  signupPassword.classList.remove("is-valid");
}

var username = localStorage.getItem("sessionUsername");
if (username) {
  // document.getElementById("username").innerHTML = "Welcome " + username;
  document.getElementById("username").innerHTML = `<div class="glitch-wrapper">
   <div class="glitch" data-glitch="Welcome">Welcome "${username}"</div>
</div>`;
}

var signUpArray = [];
var validateName,
  validateEmail,
  validatePassword = false;

if (localStorage.getItem("users") == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem("users"));
}

// ============= for SignUp ================
//for check inputs is empty or not
function isEmpty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function isEmailExist() {
  debugger;
  for (var i = 0; i < signUpArray.length; i++) {
    if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return true;
    }
  }
}

function signUp() {
  debugger;
  if (!isEmpty()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }
  if (!validateName || !validateEmail || !validatePassword) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Please Make Sure all inputs meets requirements</span>';
    return false;
  }
  var baseURL = window.location.origin;
  var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  debugger;
  if (isEmailExist()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Email already exists</span>';
  } else {
    signUpArray.push(signUp);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
    setTimeout(function () {
      location.replace(baseURL + "/index.html");
    }, 2000);
  }
}

// ============= for Login ================
function isLoginEmpty() {
  if (signinPassword.value == "" || signinEmail.value == "") {
    return false;
  } else {
    return true;
  }
}

function login() {
  debugger;
  var baseURL = window.location.origin;
  if (!isLoginEmpty()) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }
  let password = signinPassword.value;
  let email = signinEmail.value;
  const foundUser = signUpArray.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password.toLowerCase() === password.toLowerCase()
  );

  if (foundUser) {
    localStorage.setItem("sessionUsername", foundUser.name);
    location.replace(baseURL + "/home.html");
  } else {
    document.getElementById("incorrect").innerHTML =
      '<span class="p-2 text-danger">Incorrect email or password</span>';
  }
}

function logout() {
  localStorage.removeItem("sessionUsername");
}
