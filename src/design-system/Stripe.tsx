import { type PropsWithChildren, Children } from 'react';
import cx from 'classnames';

export function Stripe({
    children,
    variant = 'primary',
}: PropsWithChildren<{ variant?: 'primary' | 'secondary' }>) {
    const count = Children.count(children);

    return (
        <div
            className={cx('p-2.5 flex items-center', {
                'bg-sky-500': variant === 'primary',
                'bg-sky-300 px-10': variant === 'secondary',
                'justify-center': count === 1,
                'justify-between': count !== 1,
            })}
        >
            {children}
        </div>
    );
}
