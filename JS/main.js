"use strict"

// Variable para pasajero y obtención de fecha de mañana para el buscador de billetes
const passengers = 1

function tomorrow() {

    const actualDate = new Date();
    const day = actualDate.getDate()+1;
    const month = actualDate.getMonth()+1;
    const year = actualDate.getFullYear();

    const departureDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return departureDate;
};

const departureDate = tomorrow();

console.log(departureDate);





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
});