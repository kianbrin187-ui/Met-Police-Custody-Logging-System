// --- Officer Autocomplete & Multiple Officer Selection ---
const officerInput = document.getElementById('officerSearch');
const selectedOfficers = document.getElementById('selectedOfficers');
const suggestionsList = document.getElementById('officerSuggestions');
let officersList = [];

// Fetch officers from Google Sheet
fetch('https://script.google.com/macros/s/AKfycbwLNWHGGRaBJL79vrDwZ_vflEjJgdIPq41hxT-V4P4K-Bru3pX5H_E-pzXHs0U6z144/exec?type=officers')
  .then(res => res.json())
  .then(data => {
    officersList = data.map(o => o.name || o);
  })
  .catch(err => console.error('Error fetching officers:', err));

// Autocomplete suggestions
officerInput.addEventListener('input', function() {
  const value = this.value.toLowerCase();
  suggestionsList.innerHTML = '';
  if(!value) return;

  const matches = officersList.filter(officer => officer.toLowerCase().includes(value));
  matches.slice(0,5).forEach(match => {
    const li = document.createElement('li');
    li.textContent = match;
    li.addEventListener('click', () => {
      officerInput.value = match;
      suggestionsList.innerHTML = '';
    });
    suggestionsList.appendChild(li);
  });
});

document.addEventListener('click', e => {
  if(e.target !== officerInput) suggestionsList.innerHTML = '';
});

// Add officer to selected list
function addOfficer() {
  const name = officerInput.value.trim();
  if(!name) return;

  const existing = Array.from(selectedOfficers.children).some(li => li.textContent === name);
  if(existing) return;

  const li = document.createElement('li');
  li.textContent = name;
  selectedOfficers.appendChild(li);
  officerInput.value = '';
}

// --- View Arrests Button with Username/Password ---
function openArrests() {
  const username = prompt("Enter username:");
  const password = prompt("Enter password:");
  const allowedUsers = {
    "BX":"password1",
    "SX":"password2",
    "GX":"password3"
  };

  if(allowedUsers[username] && allowedUsers[username] === password){
    window.open("https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE", "_blank");
  } else {
    alert("Access denied: invalid credentials.");
  }
}

// --- Submit Form to Google Sheet ---
document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    custodyOfficer: document.getElementById('custodyOfficer').value,
    officers: Array.from(selectedOfficers.children).map(li => li.textContent),
    suspectName: document.getElementById('suspectName').value,
    reason: document.getElementById('reason').value,
    location: document.getElementById('location').value,
    timeOfArrest: document.getElementById('timeOfArrest').value,
    cautionRead: document.getElementById('cautionRead').value,
    searched: document.getElementById('searched').value,
    itemsFound: document.getElementById('itemsFound').value,
    forceUsed: document.getElementById('forceUsed').value,
    additionalInfo: document.getElementById('additionalInfo').value,
    allergies: document.getElementById('allergies').value,
    biometrics: document.getElementById('biometrics').value,
    medication: document.getElementById('medication').value,
    alerting: document.getElementById('alerting').value,
    dependents: document.getElementById('dependents').value,
    recentMedication: document.getElementById('recentMedication').value
  };

  fetch("YOUR_WEB_APP_URL_HERE", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resp => {
    if(resp.status === "success"){
      alert("Booking saved successfully!");
      document.getElementById('bookingForm').reset();
      selectedOfficers.innerHTML = "";
    } else {
      alert("Error saving booking: " + resp.message);
    }
  })
  .catch(err => alert("Error: " + err.message));
});
