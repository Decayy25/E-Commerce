interface ButtonProps {
    onClick?: () => void;
    title: string;
    className: string;
}

export default function Button(porps: ButtonProps) {
    return (
        <button className={`px-4 py-2 bg-var(--Nvidia--) 
            text-white rounded hover:bg-var(--Intel--) 
            transition duration-300"`}
            onClick={porps.onClick}
        >
            {porps.title}
        </button>
    );
}