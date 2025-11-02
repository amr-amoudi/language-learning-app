// src/app/start/[deck_id]/components/helperComponents/Choice.tsx
import {ButtonHTMLAttributes, ReactNode} from "react";

interface ChoiceProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isActive: boolean;
    onClick: () => void;
}

export default function Choice({children,isActive, onClick, className = "",...rest}: ChoiceProps) {
    const merged = `${className} ${isActive ? "bg-app_red-light" : ""} cursor-pointer text-xl font-medium bg-app_orange text-app_red-dark border-2 rounded-lg hover:bg-app_red-light border-app_yellow hover:text-app_yellow`.trim();

    return (
        <button
            type="button"
            {...rest}
            onClick={onClick}
            className={merged}
        >
            {children}
        </button>
    );
}
