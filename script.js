const officerInput = document.getElementById('officerSearch');
const selectedOfficers = document.getElementById('selectedOfficers');
const suggestionsList = document.getElementById('officerSuggestions');
let officersList = [];

// Fetch officers from Google Script
fetch('https://script.google.com/macros/s/AKfycbwLNWHGGRaBJL79vrDwZ_vflEjJgdIPq41hxT-V4P4K-Bru3pX5H_E-pzXHs0U6z144/exec?type=officers')
  .then(res => res.json())
  .then(data => {
    officersList = data; // assuming array of strings
    console.log('Officers loaded:', officersList);
  })
  .catch(err => console.error('Error fetching officers:', err));

// Show suggestions
officerInput.addEventListener('input', function() {
  const value = this.value.toLowerCase();
  suggestionsList.innerHTML = '';
  if (!value) return;
  
  const matches = officersList.filter(officer => officer.toLowerCase().includes(value));
  matches.forEach(match => {
    const li = document.createElement('li');
    li.textContent = match;
    li.addEventListener('click', () => {
      officerInput.value = match;
      suggestionsList.innerHTML = '';
    });
    suggestionsList.appendChild(li);
  });
});

// Add officer to selected list
function addOfficer() {
  const officerName = officerInput.value.trim();
  if (!officerName) return;
  
  const li = document.createElement('li');
  li.textContent = officerName;
  selectedOfficers.appendChild(li);
  officerInput.value = '';
}

// Prevent form submission for demo
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Booking saved (demo)');
});
