import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchClosestFlight } from '../FlightAdapter.ts';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('flight adapter', () => {
    it('returns the closest flight on success', async () => {
        const flight = createFlight();
        server.use(
            http.get('http://localhost:3001/api/v1/flight', () =>
                // HttpResponse.json({
                //     id: 'FL-8842',
                //     airline: 'British Airways',
                //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
                //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
                //     stops: 1,
                //     price: { value: 21000, precision: 2, currency: 'GBP' },
                // }),
                HttpResponse.json(flight)
            ),
        );

        const result = await fetchClosestFlight();

        expect(result).toEqual(flight);
    });

    it('throws when the request fails', async () => {
        server.use(
            http.get(
                'http://localhost:3001/api/v1/flight',
                () => new HttpResponse(null, { status: 500 }),
            ),
        );

        await expect(fetchClosestFlight()).rejects.toThrow();
    });
});
