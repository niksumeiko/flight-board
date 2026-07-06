import type { RouteObject } from 'react-router-dom';
import { FlightPage } from './flight/useCases/viewFlight/FlightPage.tsx';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <FlightPage />,
    },
];
