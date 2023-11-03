<<<<<<< HEAD
curl https://travelimpactmodel.googleapis.com/v1/flights:computeFlightEmissions?key=$AIzaSyD_cuYNY-hC9YQQkeRO0zVPsG3Fbm3ck44 \
  -H "Content-Type: application/json" -d \
  '{
    "flights": [
      {
        "origin": "ZRH",
        "destination": "CDG",
        "operatingCarrierCode": "AF",
        "flightNumber": 1115,
        "departureDate": {"year": 2024, "month": 6, "day": 1}
      },
      {
        "origin": "CDG",
        "destination": "BOS",
        "operatingCarrierCode": "AF",
        "flightNumber": 334,
        "departureDate": {"year": 2024, "month": 6, "day": 1}
      },
      {
        "origin": "ZRH",
        "destination": "BOS",
        "operatingCarrierCode": "LX",
        "flightNumber": 52,
        "departureDate": {"year": 2024, "month": 5, "day": 1}
      }
    ]
  }'
=======
"use strict";

// Conexión a la API 
    
    // Example POST method implementation:
async function postData() {  
        
        // Peticion POST para obtener el token
        // Guardo el token
    const token = "Bearer tSA0eGwdzr9VqVVR7jSk6BpeD6T956Ql";
    

    const response = await fetch( 
        "test.api.amadeus.com/v1/reference-data/locations",  
           {     
        method: "GET",   
        headers: {       
            "Content-Type": "application/json",      
            'Content-Type': 'application/x-www-form-urlencoded',        
            Authorization: token,    
            },    
        }  
    );  
    const data = await response.json(); // parses JSON response into native JavaScript objects 
    console.log(data);
    
};

postData();
>>>>>>> 8595188fe1ffa571f7c140ec60bb4079a8bf1b2e
