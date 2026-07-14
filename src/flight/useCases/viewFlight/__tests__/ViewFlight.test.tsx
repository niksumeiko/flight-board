import { expect, test } from '../../../../../playwright/test';
import { App } from '../../../../App.tsx';
import { aFlight } from '../../../domain/__tests__/FlightBuilder.ts';

test('shows the closest flight', async ({ mount, page }) => {
    await page.route('**/api/v1/flight', (route) =>
        route.fulfill({
            json: aFlight()
                .departingFrom('LHR', '2026-07-10T10:30:00Z')
                .arrivingAt('JFK', '2026-07-10T14:05:00Z')
                .build(),
        }),
    );

    await mount(<App />, '/');

    await expect(page.getByText('LHR → JFK')).toBeVisible();
    await expect(page.getByText('10 Jul 2026')).toBeVisible();
});
