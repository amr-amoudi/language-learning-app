import {HTMLAttributes, ReactNode} from "react";
import {useFormStatus} from "react-dom";


interface SubmitButtonProps extends HTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    className?: string;
    // Text to show when the form is pending
    fallBackText?: string;
    // if you want to override the type
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