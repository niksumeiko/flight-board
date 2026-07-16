import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchClosestFlight } from '../FlightAdapter.ts';
import { aFlight } from './FlightBuilder.ts';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('flight adapter', () => {
    it('returns the closest flight on success', async () => {
        const flightData = aFlight().build();

        server.use(
            http.get('http://localhost:3001/api/v1/flight', () =>
                HttpResponse.json(flightData),
            ),
        );

        const result = await fetchClosestFlight();

        expect(result).toEqual(flightData);
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
