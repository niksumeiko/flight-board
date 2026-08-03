import { expect, test } from '../../../../../playwright/test';
import { App } from '../../../../App.tsx';

test('shows the closest flight', async ({ mount, page }) => {
    await page.route('**/api/v1/flight', (route) =>
        route.fulfill({
            // json: {
            //     id: 'FL-8842',
            //     airline: 'British Airways',
            //     departure: { airport: 'LHR', time: '2026-07-10T10:30:00Z' },
            //     arrival: { airport: 'JFK', time: '2026-07-10T14:05:00Z' },
            //     stops: 1,
            //     price: { value: 21000, precision: 2, currency: 'GBP' },
            // },
            json: createFlight()
                .withDeparture('LHR', '2026-07-10T10:30:00Z')
                .withArrival('JFK', '2026-07-10T14:05:00Z'),
        }),
    );

    await mount(<App />, '/');

    await expect(page.getByText('LHR → JFK')).toBeVisible();
    await expect(page.getByText('10 Jul 2026')).toBeVisible();
});
