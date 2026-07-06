import type { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routes } from './routes';

const queryClient = new QueryClient();

export const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </QueryClientProvider>
    );
};
