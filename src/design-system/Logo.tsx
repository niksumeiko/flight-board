type Props = {
    variant?: 'xl' | 'sm';
};

export const Logo = ({ variant = 'xl' }: Props) => {
    const size = variant === 'xl' ? 'text-2xl' : 'text-base';

    return (
        <div className={`flex items-center gap-2 font-bold text-white ${size}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={variant === 'xl' ? 'w-7 h-7' : 'w-4 h-4'}
                aria-hidden="true"
            >
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
            </svg>
            <span>Flight Board</span>
        </div>
    );
};
