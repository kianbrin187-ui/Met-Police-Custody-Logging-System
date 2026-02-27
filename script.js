const users = {
"admin":"met123",
"officer1":"police1",
"officer2":"metpolice"
};

function login(){

let id = document.getElementById("officerID").value;
let pass = document.getElementById("password").value;

if(users[id] === pass){
window.location.href = "dashboard.html";
}
else{
document.getElementById("error").innerText = "Invalid Credentials";
}

}
