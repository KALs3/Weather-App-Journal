// Personal API Key for OpenWeatherMap API
const API_KEY = ""; //enter OpenWeatherMap API
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
// asigns zip code value from the dropdown menu options
const zipcodes = document.getElementById('zipcodes');
zipcodes.addEventListener("change", function() {
document.getElementById('zip').value = zipcodes.value;
});


document.getElementById('generate').addEventListener('click', startProcess);


async function startProcess() {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;  
  try {
    if(zipCode===''){
      // checks if the zipcode is valid if not it will asign a class called active which displays a message to the user 
      document.getElementById('error').classList.toggle('active');
    }
    else{
      document.getElementById('error').classList.remove('active');// if the user enters a correct info the class will be removed and the procces continue
      const weatherData = await MakeURl(baseUrl, zipCode, API_KEY);
      await postData('/add', {
      temp: weatherData.main.temp,
      name: weatherData.name,
      icon:weatherData.weather[0],
      date: newDate,
      feelings
    })
    
    updateUI()
  };
    
  } catch (error) {
    console.error(error);
  }
}

function MakeURl(baseUrl, zipCode, API_KEY) {
  return fetch(`${baseUrl}${zipCode}${API_KEY}`)
    .then(response => response.json());
}


async function postData(url = '', data = {}) {
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

async function updateUI() {
  const response = await fetch('/all');
  try {
    const data = await response.json();
    document.getElementById('temp').innerHTML ='temperature: ' +data.temp+'°C ';
    document.getElementById('date').innerHTML = 'date: '+data.date;
    document.getElementById('content').innerHTML ='your feelings: ' +data.content;
    document.getElementById('status').innerHTML = 'city name: '+data.name;
    document.getElementById('icon').src='http://openweathermap.org/img/wn/'+data.icon.icon+'@2x.png';
  } catch (error) {
    console.error(error);
  }
} 
