
const mapDiv = document.getElementById('map');
const getLocationBtn = document.getElementById('getLocationBtn');
const removeLocationBtn = document.getElementById('removeLocationBtn');


const latitude = localStorage.getItem('lat');
const longitude = localStorage.getItem('long');


if (latitude && longitude) {
  getLocationBtn.disabled = true;
  displayMap(latitude, longitude);
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        // alert('Geolocation is not supported by this browser.');
        mapDiv.innerText="Geolocation is not supported by this browser."
    }
  }
// callback function for getCurrentPosition
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
   
    localStorage.setItem('lat', latitude);
    localStorage.setItem('long', longitude);
    
    getLocationBtn.disabled = true;
    displayMap(latitude, longitude);
  }

  getLocationBtn.addEventListener('click', getLocation);

// add event listener to removeLocation button
removeLocationBtn.addEventListener('click', () => {
  // remove latitude and longitude from local storage
  localStorage.removeItem('lat');
  localStorage.removeItem('long');
  // enable getLocation button and remove map
  getLocationBtn.disabled = false;
  mapDiv.innerHTML = '';
});



// function to display map using Google Maps
function displayMap(latitude, longitude) {

  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', mapUrl);
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '500');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('style', 'border:0');
  
  mapDiv.appendChild(iframe);
}
