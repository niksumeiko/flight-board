import { test as base, expect } from '@playwright/experimental-ct-react';
import type { MountResult } from '@playwright/experimental-ct-react';
import type { JSX } from 'react';

type Mount = (component: JSX.Element, path?: string) => Promise<MountResult>;

export const test = base.extend<{ mount: Mount }>({
    mount: async ({ mount }, use) => {
        await use((component, path) =>
            mount(component, path ? { hooksConfig: { path } } : undefined),
        );
    },
});

export { expect };
