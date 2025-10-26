import {ButtonHTMLAttributes, ReactNode} from "react";
import {buttonClasses} from "@/app/lib/reuse-classes";


export default function Choice({ children, isActive, onClick, ...rest }: { children: ReactNode, isActive: boolean, onClick: () => void, rest?: ButtonHTMLAttributes<HTMLButtonElement>}) {

    return (
        <button onClick={onClick} className={buttonClasses + ` ${isActive ? "bg-app_red-light" : ""} `} {...rest}>
            {children}
        </button>
    )

}