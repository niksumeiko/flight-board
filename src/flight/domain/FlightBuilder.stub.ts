export const createFlight = (id = 'DEFAULT_FLIGHT_ID'): FlightBuilder => {
    const state = {
        id,
        airline: 'DEFAULT_AIRLINE',
        departure: {
            airport: 'DEFAULT_DEPARTURE_AIRPORT_CODE',
            time: new Date().toISOString(),
        },
        arrival: {
            airport: 'DEFAULT_ARRIVAL_AIRPORT_CODE',
            time: new Date().toISOString(),
        },
        stops: 1,
        price: { value: 100, precision: 2, currency: 'EUR' },

        withDeparture(airport: string, time = state.departure.time) {
            state.departure.airport = airport;
            state.departure.time = time;

            return state;
        },
        withArrival(airport: string, time = state.arrival.time) {
            state.arrival.airport = airport;
            state.arrival.time = time;

            return state;
        },
    };

    return state;
};