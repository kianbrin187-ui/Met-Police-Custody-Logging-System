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
<iframe class="form-frame"
src="YOUR GOOGLE FORM EMBED LINK HERE">
</iframe>
`;
}

function logout(){
window.location.href="index.html";
}