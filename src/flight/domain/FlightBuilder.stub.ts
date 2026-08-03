import { Flight } from './FlightService.ts';

type FlightBuilder = Flight & BuilderMethods;

type BuilderMethods = {
    withDeparture(airport: string, time?: string): FlightBuilder;
    withArrival(airport: string, time?: string): FlightBuilder;
};

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
    };

    const methods: BuilderMethods = {
        withDeparture(airport: string, time = state.departure.time) {
            state.departure.airport = airport;
            state.departure.time = time;

            return builder;
        },
        withArrival(airport: string, time = state.arrival.time) {
            state.arrival.airport = airport;
            state.arrival.time = time;

            return builder;
        },
    };

    const builder = state as FlightBuilder;

    Object.defineProperties(builder, Object.fromEntries(
        Object.entries(methods).map(([key, value]) => [key, {
            value,
            enumerable: false,
            writable: true,
        }]),
    ))

    return builder;
};