function getAmadeusToken(clientId, clientSecret) {
    const authUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token'; // URL de autenticación de Amadeus (puede variar en producción)
    

    // Datos requeridos para la solicitud de token
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);

    return fetch(authUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
           
        },
        body: data,
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener el token de Amadeus');
        }
    })
    .then(data => {
        const accessToken = data.access_token;
        return accessToken;
    })
    .catch(error => {
        console.error(error);
        return null;
    });
}

// Uso de la función para obtener un token
const clientId = 'vFAgjkG4GNw4o8as9aSdlqhYHWvbFt9s'; // Reemplaza con tu cliente ID de Amadeus
const clientSecret = 'GNNN7muQQqXqLjRz'; // Reemplaza con tu cliente secret de Amadeus

getAmadeusToken(clientId, clientSecret)
    .then(accessToken => {
        if (accessToken) {
            console.log('Token de Amadeus obtenido:', accessToken);
            // Aquí puedes utilizar el accessToken para realizar solicitudes a la API de Amadeus
        } else {
            console.log('No se pudo obtener el token de Amadeus.');
        }
    });


    function searchFlights(accessToken, origin, destination, departureDate, returnDate, passengers) {
        const apiUrl = 'https://test.api.amadeus.com/v1/shopping/flight-destinations';
        'Authorization: Bearer GNNN7muQQqXqLjRz'
    
        // Datos requeridos para la solicitud de búsqueda de vuelos
        const requestData = {
            origin,
            destination,
            departureDate,
            returnDate,
            adults: passengers, // Cantidad de pasajeros
        };
    
        return fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            },
            // Incluye los parámetros de búsqueda en la URL
            // Esto puede variar según la API de Amadeus, asegúrate de consultar la documentación
            // para los parámetros específicos de búsqueda.
            // Por ejemplo:
            // body: JSON.stringify(requestData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud de búsqueda de vuelos');
            }
        })
        .then(data => {
            // Procesa los resultados de búsqueda de vuelos aquí
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    searchFlights('JFK', 'LAX', '2023-11-02');