import {createContext, useContext} from "react";
import {ActionResult} from "@/app/lib/types";
import {ModalContext} from "@/app/components/PhoneModal";


export const OnSuccessContext = createContext<{ onSuccess: (data: ActionResult) => void }>({ onSuccess: (data: ActionResult) => {} })

export default function OnSuccess({ children, onSuccess }: { children: React.ReactNode; onSuccess: (data: ActionResult) => void }){
    const { setIsOpen } = useContext(ModalContext)

    function closeModalOnSuccess(data: ActionResult){
        onSuccess(data)
        if(setIsOpen){
            setIsOpen(false);
        }
    }

    return <OnSuccessContext.Provider value={{ onSuccess: closeModalOnSuccess }}>
        {children}
    </OnSuccessContext.Provider>;
}



