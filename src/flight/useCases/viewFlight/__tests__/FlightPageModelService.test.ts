import { describe, expect, it } from 'vitest';
import { createFlightPageModel } from '../FlightPageModelService.ts';
import { createFlight } from '../../../domain/FlightBuilder.stub.ts';

describe('flight page model', () => {
    it('returns model when the flight is being fetched', () => {
        const queries = [
            { isLoading: true, error: null },
            { isLoading: false, data: undefined, error: null },
        ];

        queries.forEach((query) => {
            const result = createFlightPageModel(query);

            expect(result).toEqual({ state: 'LOADING' });
        });
    });

    it('returns model when the flight retrieval failed', () => {
        const query = { isLoading: false, error: new Error() };

        const result = createFlightPageModel(query);

        expect(result).toEqual({ state: 'ERROR' });
    });

    it('maps the route from departure and arrival airport codes', () => {
        const query = {
            isLoading: false,
            error: null,
            // data: {
            //     id: 'FL-8842',
            //     airline: 'British Airways',
            //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
            //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
            //     stops: 1,
            //     price: { value: 21000, precision: 2, currency: 'GBP' },
            // } satisfies Flight,
            data: createFlight()
                .withDeparture('LHR')
                .withArrival('JFK'),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({
            state: 'SUCCESS',
            departureAirport: 'LHR',
            arrivalAirport: 'JFK',
            route: 'LHR → JFK',
        });
    });

    it('formats the departure date', () => {
        const query = {
            isLoading: false,
            error: null,
            // data: {
            //     id: 'FL-8842',
            //     airline: 'British Airways',
            //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
            //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
            //     stops: 1,
            //     price: { value: 21000, precision: 2, currency: 'GBP' },
            // } satisfies Flight,
            data: createFlight().withDeparture('LHR', '2026-07-10T10:30:00Z'),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ date: '10 Jul 2026' });
    });

    it('formats the departure and arrival times', () => {
        const query = {
            isLoading: false,
            error: null,
            // data: {
            //     id: 'FL-8842',
            //     airline: 'British Airways',
            //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
            //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
            //     stops: 1,
            //     price: { value: 21000, precision: 2, currency: 'GBP' },
            // } satisfies Flight,
            data: createFlight()
                .withDeparture('LHR', '2026-07-10T10:30:00Z')
                .withArrival('JFK', '2026-07-10T14:05:00Z'),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ times: '10:30 → 14:05' });
    });

    it('computes the flight duration', () => {
        const query = {
            isLoading: false,
            error: null,
            // data: {
            //     id: 'FL-8842',
            //     airline: 'British Airways',
            //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
            //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
            //     stops: 1,
            //     price: { value: 21000, precision: 2, currency: 'GBP' },
            // } satisfies Flight,
            data: createFlight()
                .withDeparture('LHR', '2026-07-10T10:30:00Z')
                .withArrival('JFK', '2026-07-10T14:05:00Z'),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ duration: '3h 35m' });
    });

    it('labels a flight with no stops as direct', () => {
        const query = {
            isLoading: false,
            error: null,
            // data: {
            //     id: 'FL-1000',
            //     airline: 'British Airways',
            //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
            //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
            //     stops: 0,
            //     price: { value: 21000, precision: 2, currency: 'GBP' },
            // } satisfies Flight,
            data: createFlight().withoutStops(),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ stopsLabel: 'Direct' });
    });

    it('labels a single stop in the singular', () => {
        const query = {
            isLoading: false,
            error: null,
            // data: {
            //     id: 'FL-1001',
            //     airline: 'British Airways',
            //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
            //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
            //     stops: 1,
            //     price: { value: 21000, precision: 2, currency: 'GBP' },
            // } satisfies Flight,
            data: createFlight().withStops(1),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ stopsLabel: '1 stop' });
    });

    it('labels multiple stops in the plural', () => {
        const query = {
            isLoading: false,
            error: null,
            // data: {
            //     id: 'FL-1002',
            //     airline: 'British Airways',
            //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
            //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
            //     stops: 2,
            //     price: { value: 21000, precision: 2, currency: 'GBP' },
            // } satisfies Flight,
            data: createFlight().withStops(2),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ stopsLabel: '2 stops' });
    });

    it('formats the price in pounds', () => {
        const query = {
            isLoading: false,
            error: null,
            // data: {
            //     id: 'FL-8842',
            //     airline: 'British Airways',
            //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
            //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
            //     stops: 1,
            //     price: { value: 21000, precision: 2, currency: 'GBP' },
            // } satisfies Flight,
            data: createFlight().withPrice(210, 'GBP'),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ price: '£210.00' });
    });

    it('formats the price in the given currency', () => {
        const query = {
            isLoading: false,
            error: null,
            // data: {
            //     id: 'FL-9001',
            //     airline: 'Delta',
            //     departure: { airport: 'JFK', time: '2026-08-01T06:00:00Z' },
            //     arrival: { airport: 'LAX', time: '2026-08-01T12:30:00Z' },
            //     stops: 0,
            //     price: { value: 49900, precision: 2, currency: 'EUR' },
            // } satisfies Flight,
            data: createFlight().withPrice(499, 'EUR'),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ price: '€499.00' });
    });
});
