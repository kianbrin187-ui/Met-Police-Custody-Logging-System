// Boot animation
setTimeout(function(){
document.getElementById("login-container").classList.remove("hidden");
}, 3000);

// Login
function loginUser(){

const users = {
"admin":"met123",
"officer1":"police1"
};

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(users[user] && users[user] === pass){
window.location.href = "dashboard.html";
}
else{
document.getElementById("error").innerText = "Invalid Username or Password";
}

}

// Dashboard panel loader

function loadHome(){
document.getElementById("main-content").innerHTML = `
<h2>System Status: Active</h2>
<p>Secure Network Connected</p>
<p>Welcome Officer</p>
`;
}

function loadArrestForm(){
document.getElementById("main-content").innerHTML = `
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc0nEq5miwEXDaBhYyFhvJC1miMQuS8uXL7X6CX0c7yisyTlg/viewform?embedded=true"
style="width:100%; height:80vh; border:none;"></iframe>
`;
}

function loadCustody(){
document.getElementById("main-content").innerHTML = `
<iframe src="https://docs.google.com/spreadsheets/d/1gwpjY4qQ4U59kASsyFLvgkYKMdKCV0MOqqEBOn3cTqQ/edit"
style="width:100%; height:80vh; border:none;"></iframe>
`;
}

function loadLinks(){
document.getElementById("main-content").innerHTML = `
<iframe src="https://linktr.ee/PiggyanddoUKCR"
style="width:100%; height:80vh; border:none;"></iframe>
`;
}