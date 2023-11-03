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