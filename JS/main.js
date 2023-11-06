"use strict";

async function getAmadeusToken(clientId, clientSecret) {
  try {
    
    const authUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (!response.ok) {
      
      throw new Error("Error al obtener el token de Amadeus");
    }

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    
    console.error("Error:", error.message);
    return null;
  }
}

const searchForm = document.getElementById("flight-search-form");
searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  document.getElementById("loading-message").style.display = "block";

  
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;

  console.log(origin);
  console.log(destination);



  async function searchFlights(token, origin, destination, departureDate, passengers) {
    
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${passengers}&nonStop=false&max=1`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      });
  
      if (!response.ok) {
        
        document.getElementById("error-message").textContent = "Error al obtener el vuelo";
        return;
      }
  
      const datosVuelo = await response.json();
      console.log(datosVuelo);
  
      if (datosVuelo.data === 0) {
        
        document.getElementById("error-message").textContent = "No se han encontrado ningún vuelo";
        return;
      }
  
      const vueloBarato = datosVuelo.data[0];
      console.log(vueloBarato);
  
      document.getElementById("flight-origin").textContent = origin;
      document.getElementById("flight-destination").textContent = destination;
      document.getElementById("flight-departure").textContent = vueloBarato.itineraries[0].segments[0].departure.at;
      document.getElementById("flight-arrival").textContent = vueloBarato.itineraries[0].segments[0].arrival.at;
      document.getElementById("flight-airline").textContent = vueloBarato.itineraries[0].segments[0].carrierCode;
      document.getElementById("flight-price").textContent = vueloBarato.price.total;
      document.getElementById("flight-currency").textContent = vueloBarato.price.currency;

      document.getElementById("loading-message").style.display = "none";
  
      
      document.getElementById("flight-result").classList.remove("hidden");
      
    } catch (error) {
      
      console.error("Error:", error);
    }
  }
  

  // Uso de la función para obtener un token
  const clientId = "vFAgjkG4GNw4o8as9aSdlqhYHWvbFt9s"; 
  const clientSecret = "GNNN7muQQqXqLjRz"; 

  let token = await getAmadeusToken(clientId, clientSecret);
  if (token !== null) console.log(token);

 // Busqueda de fecha y variable pasajero
  const passengers = 1;

  function tomorrow() {
    const actualDate = new Date();
    const day = actualDate.getDate() + 1;
    const month = actualDate.getMonth() + 1;
    const year = actualDate.getFullYear();

    const departureDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    return departureDate;
  }

  const departureDate = tomorrow();

  console.log(departureDate);

  searchFlights(token, origin, destination, departureDate, passengers);
});


// Verificar que lo introducido en el input sean tres caracteres en mayusculas

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("flight-search-form");
//   const errorMessage = document.getElementById("error-message");

//   form.addEventListener("submit", function (event) {
//     const originInput = document.getElementById("origin");
//     const destinationInput = document.getElementById("destination");

//     const originValue = originInput.value.trim(); 
//     const destinationValue = destinationInput.value.trim();

    
//     const uppercaseRegex = /^[A-Z]{3}$/;

//     if (!uppercaseRegex.test(originValue) || !uppercaseRegex.test(destinationValue)) {
//       event.preventDefault();

     
//       errorMessage.textContent = "¡¡¡Los campos de origen y destino deben tener exactamente 3 letras mayúsculas!!!";
//     } else {
      
//       errorMessage.textContent = "";
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("flight-search-form");
  const errorMessage = document.getElementById("error-message");
  const resultDiv = document.getElementById("flight-result");

  form.addEventListener("submit", function (event) {
    
    resultDiv.classList.add("hidden");
    errorMessage.classList.add("hidden");
  });


  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", function () {
    
    resultDiv.classList.add("hidden");
    errorMessage.classList.add("hidden");
    
    document.getElementById("flight-origin").textContent = "";
    document.getElementById("flight-destination").textContent = "";
    document.getElementById("flight-departure").textContent = "";
    document.getElementById("flight-arrival").textContent = "";
    document.getElementById("flight-airline").textContent = "";
    document.getElementById("flight-price").textContent = "";
    document.getElementById("flight-currency").textContent = "";
  });
});



/*
// Obtén el formulario de búsqueda y agrega un controlador de eventos para la búsqueda
const searchForm = document.getElementById('flight-search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtén los valores de entrada del formulario
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    
    const departureDate = document.getElementById('departure-date').value;
    

    // Por ejemplo:
    fetch(`/search-flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&passengers=${passengers}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = ''; // Limpia los resultados anteriores
            data.forEach(result => {
                // Crea y agrega elementos HTML para mostrar cada resultado de vuelo
                // resultsContainer.appendChild(...);
            });
        })
        .catch(error => {
            console.error(error);
        });
});*/
