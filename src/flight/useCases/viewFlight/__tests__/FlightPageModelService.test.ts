import { describe, expect, it } from 'vitest';
import { aFlight } from '../../../domain/__tests__/FlightBuilder.ts';
import { createFlightPageModel } from '../FlightPageModelService.ts';

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
            data: aFlight().departingFrom('LHR').arrivingAt('JFK').build(),
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
            data: aFlight()
                .departingFrom('LHR', '2026-07-10T10:30:00Z')
                .build(),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ date: '10 Jul 2026' });
    });

    it('formats the departure and arrival times', () => {
        const query = {
            isLoading: false,
            error: null,
            data: aFlight()
                .departingFrom('LHR', '2026-07-10T10:30:00Z')
                .arrivingAt('JFK', '2026-07-10T14:05:00Z')
                .build(),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ times: '10:30 → 14:05' });
    });

    it('computes the flight duration', () => {
        const query = {
            isLoading: false,
            error: null,
            data: aFlight()
                .departingFrom('LHR', '2026-07-10T10:30:00Z')
                .arrivingAt('JFK', '2026-07-10T14:05:00Z')
                .build(),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ duration: '3h 35m' });
    });

    it('labels a flight with no stops as direct', () => {
        const query = {
            isLoading: false,
            error: null,
            data: aFlight().withNoStops().build(),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ stopsLabel: 'Direct' });
    });

    it('labels a single stop in the singular', () => {
        const query = {
            isLoading: false,
            error: null,
            data: aFlight().withNumberOfStops(1).build(),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ stopsLabel: '1 stop' });
    });

    it('labels multiple stops in the plural', () => {
        const query = {
            isLoading: false,
            error: null,
            data: aFlight().withNumberOfStops(2).build(),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ stopsLabel: '2 stops' });
    });

    it('formats the price in pounds', () => {
        const query = {
            isLoading: false,
            error: null,
            data: aFlight()
                .withPrice({
                    value: 21000,
                    precision: 2,
                    currency: 'GBP',
                })
                .build(),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ price: '£210.00' });
    });

    it('formats the price in the given currency', () => {
        const query = {
            isLoading: false,
            error: null,
            data: aFlight()
                .withPrice({
                    value: 49900,
                    precision: 2,
                    currency: 'EUR',
                })
                .build(),
        };

        const result = createFlightPageModel(query);

        expect(result).toMatchObject({ price: '€499.00' });
    });
});
