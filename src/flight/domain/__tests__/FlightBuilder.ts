import { Flight } from '../FlightService';

export function aFlight() {
    const flightData = defaultData();
    return makeFlightBuilder(flightData);
}

function makeFlightBuilder(data: Flight) {
    return {
        build() {
            return data;
        },
        departingFrom(airport: string, time: string = data.departure.time) {
            return makeFlightBuilder({
                ...data,
                departure: { ...data.departure, airport, time },
            });
        },
        arrivingAt(airport: string, time: string = data.arrival.time) {
            return makeFlightBuilder({
                ...data,
                arrival: { ...data.arrival, airport, time },
            });
        },
        withNoStops() {
            return makeFlightBuilder({
                ...data,
                stops: 0,
            });
        },
        withNumberOfStops(stops: number) {
            return makeFlightBuilder({
                ...data,
                stops,
            });
        },
        withPrice({
            value,
            precision,
            currency,
        }: {
            value: number;
            precision: number;
            currency: string;
        }) {
            return makeFlightBuilder({
                ...data,
                price: { value, precision, currency },
            });
        },
    };
}

const defaultData = () =>
    ({
        id: 'FL-8842',
        airline: 'British Airways',
        departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
        arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
        stops: 1,
        price: { value: 21000, precision: 2, currency: 'GBP' },
    }) satisfies Flight;
