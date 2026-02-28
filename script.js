function login(){

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(user && pass){

localStorage.setItem("currentUser",user);
window.location.href="dashboard.html";

}
else{
document.getElementById("error").innerText="Enter Username + Password";
}

}

function loadHome(){

let user = localStorage.getItem("currentUser");

document.getElementById("main-content").innerHTML=
"<h2>Hello " + user + "</h2><p>System Secure</p>";
}

function loadForm(){

document.getElementById("main-content").innerHTML=`
<iframe width="100%" height="80vh"
src="https://docs.google.com/forms/d/e/1FAIpQLSc0nEq5miwEXDaBhYyFhvJC1miMQuS8uXL7X6CX0c7yisyTlg/viewform?embedded=true">
</iframe>
`;
}

function logout(){
window.location.href="index.html";
}