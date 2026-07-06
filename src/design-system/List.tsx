export function List({ children }: { children: React.ReactNode }) {
    return <ul className="flex flex-col gap-1 my-2">{children}</ul>;
}

export function ListItem({ label, value }: { label: string; value: string }) {
    return (
        <li className="text-lg text-gray-400">
            <span className="font-medium">{label}:</span> {value}
        </li>
    );
}
