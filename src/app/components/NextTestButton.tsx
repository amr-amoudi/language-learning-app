"use client";
import {FormSwitcherContext} from "@/app/components/FormSwitcher";
import {ButtonHTMLAttributes, useContext} from "react";

interface NextTestButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    action: () => void;
    removeDefaultAction?: boolean;
    children?: React.ReactNode;
    rest?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    className?: string;
}


export default function NextTestButton({action, children, className, removeDefaultAction,...rest}: NextTestButtonProps){
    const { nextForm } = useContext(FormSwitcherContext);

    return (
        <button {...rest} className={`absolute bottom-5 bg-app_orange w-[95%] h-fit py-3 text-app_red-dark border-app_yellow border rounded-lg font-bold text-3xl ${className}`} onClick={() => {
            action();
            if(!removeDefaultAction){
                nextForm();
            }
        }}>{children || "Next"}</button>
    )
}


