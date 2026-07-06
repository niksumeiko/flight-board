# Flight Board — a "test data builder" kata

A tiny React SPA that displays **the closest flight** fetched from an API. The
rendering needs expressive data transformation (times, duration, price, stops),
which lives in a **ViewModel factory** (`createFlightPageModel`).

## The kata

Every test currently **inlines the full API domain object** (`Flight`) as its
arrangement — in the unit tests, in the adapter tests, and in the integration
test. The same fat object is repeated everywhere, even when a test only cares
about one derived field.

Your job: **replace the inlined stubs with a Builder** (the design pattern), so
each test arranges only what is relevant and reads intent-first, e.g.

```ts
aFlight().departingFrom('LHR').arrivingAt('JFK').build();
```

## Where the stubs live

| Test type          | File                                                                 | Runner            |
| ------------------ | -------------------------------------------------------------------- | ----------------- |
| Unit (ViewModel)   | `src/flight/useCases/viewFlight/__tests__/FlightPageModelService.test.ts` | Vitest       |
| Adapter (MSW)      | `src/flight/useCases/viewFlight/__tests__/FlightAdapter.test.ts`      | Vitest + MSW      |
| Integration        | `src/flight/useCases/viewFlight/__tests__/ViewFlight.test.tsx`        | Playwright CT     |

The unit and integration tests arrange the **same** `Flight` shape — the unit
test asserts only the derived field under test, while the integration test
intercepts the request and asserts what reaches the screen. That duplication is
what the builder removes.

## Scripts

```bash
npm install
npm run start                    # API + app
npm run test:unit                # Vitest: ViewModel + adapter (MSW)
npm run test:integration:headless  # Playwright component test
```

## Domain

```ts
type Flight = {
    id: string;
    airline: string;
    departure: { airport: string; time: string };   // IATA + ISO
    arrival: { airport: string; time: string };      // IATA + ISO
    stops: number;
    price: { value: number; precision: number; currency: string };
};
```
