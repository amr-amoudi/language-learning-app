"use client"
import {Dispatch, SetStateAction, useEffect, useState} from "react";

interface ToggleableTextProps<T> {
    children: React.ReactNode,
    showOnToggle?: T;
    CopyToggleState?: Dispatch<SetStateAction<boolean>>;
}


// show on toggle to show anything passed init
export default function ToggleableText<T>({children, showOnToggle, CopyToggleState}: ToggleableTextProps<T>){
    const [isToggled, setIsToggled] = useState<boolean>(false);

    useEffect(() => {
        if(CopyToggleState){
            CopyToggleState(isToggled);
        }
    }, [CopyToggleState, isToggled]);

    return (
        <div className={`${!isToggled ? "blur-sm" : "blur-none"} border-white transition-all duration-150`} onClick={() => setIsToggled(true)}>
            {children}
        </div>
    )
}

