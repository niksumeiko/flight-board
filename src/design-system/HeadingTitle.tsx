import { PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';

const size = {
    h1: 'text-2xl font-bold',
    h2: 'text-xl font-bold',
    h3: 'text-lg',
    h4: 'text-base',
    h5: 'text-sm',
    h6: 'text-xs',
};

export const HeadingTitle = ({
    children,
    level,
    icon,
    indent = false,
}: PropsWithChildren<{
    level: 1 | 2 | 3 | 4 | 5 | 6;
    icon?: ReactNode;
    indent?: boolean;
}>) => {
    const Tag = `h${level}` as const;

    return (
        <Tag
            className={cx(`flex items-center gap-2 text-2xl ${size[Tag]}`, {
                'ml-4': indent,
            })}
        >
            {children}
            {icon}
        </Tag>
    );
};
