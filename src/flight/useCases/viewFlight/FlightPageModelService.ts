import { type Flight, type Amount } from '../../domain/FlightService';

export function createFlightPageModel({
    isLoading,
    error,
    data: flight,
}: {
    isLoading: boolean;
    data?: Flight;
    error: Error | null;
}):
    | { state: 'LOADING' }
    | { state: 'ERROR' }
    | {
          state: 'SUCCESS';
          airline: string;
          departureAirport: string;
          arrivalAirport: string;
          route: string;
          date: string;
          times: string;
          duration: string;
          stopsLabel: string;
          price: string;
      } {
    if (isLoading) {
        return { state: 'LOADING' };
    }

    if (error) {
        return { state: 'ERROR' };
    }

    if (!flight) {
        return { state: 'LOADING' };
    }

    return {
        state: 'SUCCESS',
        airline: flight.airline,
        departureAirport: flight.departure.airport,
        arrivalAirport: flight.arrival.airport,
        route: `${flight.departure.airport} → ${flight.arrival.airport}`,
        date: formatDate(flight.departure.time),
        times: `${formatTime(flight.departure.time)} → ${formatTime(flight.arrival.time)}`,
        duration: formatDuration(flight.departure.time, flight.arrival.time),
        stopsLabel: formatStops(flight.stops),
        price: formatPrice(flight.price),
    };
}

function formatDate(iso: string): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(iso));
}

function formatTime(iso: string): string {
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    }).format(new Date(iso));
}

function formatDuration(departure: string, arrival: string): string {
    const minutes = Math.round(
        (new Date(arrival).getTime() - new Date(departure).getTime()) / 60_000,
    );
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;

    return `${hours}h ${remainder}m`;
}

function formatStops(stops: number): string {
    if (stops === 0) {
        return 'Direct';
    }

    return `${stops} stop${stops > 1 ? 's' : ''}`;
}

function formatPrice({ value, precision, currency }: Amount): string {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
    }).format(value / 10 ** precision);
}
