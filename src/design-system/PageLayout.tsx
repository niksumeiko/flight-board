import { type PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white max-w-[600px] w-full min-h-[600px] rounded-lg shadow py-6">
                {children}
            </div>
        </div>
    );
}

export function ContentLayout({ children }: PropsWithChildren) {
    return <div className="p-10">{children}</div>;
}
