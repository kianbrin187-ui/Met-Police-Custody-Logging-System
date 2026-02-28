const users = {
"admin":"met123",
"officer1":"police1"
};

/* Boot → Login */
setTimeout(()=>{
document.getElementById("login-container").classList.remove("hidden");
},3000);

/* Login */

function loginUser(){

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

if(users[user] && pass === "met123"){

localStorage.setItem("currentUser",user);
window.location.href="dashboard.html";

}
else{
document.getElementById("error").innerText="Invalid Credentials";
}

}

/* Dashboard */

function loadHome(){

let user = localStorage.getItem("currentUser");

document.getElementById("main-content").innerHTML=`
<h2>Hello ${user}</h2>
<p>System Status: Secure</p>
`;
}

function loadForm(){

document.getElementById("main-content").innerHTML=`

<div class="form-card">

<h2>Police Report Form</h2>

<iframe class="form-frame"
src="https://docs.google.com/forms/d/e/1FAIpQLSc0nEq5miwEXDaBhYyFhvJC1miMQuS8uXL7X6CX0c7yisyTlg/viewform?embedded=true">
</iframe>

</div>
`;
}

function logout(){
window.location.href="index.html";
}