import {createContext} from "react";
import {ActionResult} from "@/app/lib/types";


export const OnSuccessContext = createContext<{ onSuccess: (data: ActionResult) => void }>({ onSuccess: (data: ActionResult) => {} })

export default function OnSuccess({ children, onSuccess }: { children: React.ReactNode; onSuccess: (data: ActionResult) => void }){
    return <OnSuccessContext.Provider value={{ onSuccess }}>
        {children}
    </OnSuccessContext.Provider>;
}



