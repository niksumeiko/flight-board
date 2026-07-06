import { Flight } from './FlightService.ts';

export async function fetchClosestFlight() {
    const response = await fetch('http://localhost:3001/api/v1/flight');

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data: Flight = await response.json();

    return data;
}
