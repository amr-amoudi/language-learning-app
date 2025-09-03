import { ReactNode } from "react";
import {useFormStatus} from "react-dom";


interface SubmitButtonProps {
    children: ReactNode;
    className: string;
    fallBackText?: string;
    type?: "submit" | "button" | "reset" | undefined;
    rest?: React.HTMLAttributes<HTMLButtonElement>;
}

export default function SubmitButton({ children, className, type, fallBackText, rest }: SubmitButtonProps){
    const { pending } = useFormStatus()

    return (
        <button {...rest} type={type ? type : "submit"} className={`${className} ${pending ? 'cursor-not-allowed' : ''}`}>
            { fallBackText && pending ? fallBackText : children }
        </button>
    )
}