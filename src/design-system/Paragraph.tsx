import { PropsWithChildren } from 'react';

export const Paragraph = ({ children }: PropsWithChildren) => {
    return <p className="my-3">{children}</p>;
};
