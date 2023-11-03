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