'use client'

import SignUpAction, {LoginAction} from "@/app/lib/form_actions";
import {useActionState,  useEffect, useState} from "react";
import {ActionResult} from "@/app/lib/types";
import Inputs from "@/app/login/components/Inputs";
import useDisplayError from "@/app/hooks/useDisplayError";

export default function LogInForm(){
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const initialState: ActionResult = {
        succeeded: false,
        errors: [],
        successValue: undefined,
    }

    const [errorElement, setErrorMessage] = useDisplayError([""], 3000)
    const [data, action] = useActionState(isLogin ? LoginAction : SignUpAction, initialState)

    useEffect(() => {
        if (!data.succeeded && data.errors && data.errors[0]) {
            setErrorMessage(data.errors)
        }
    }, [data])

    function changeForm() {
        setIsLogin(!isLogin)
    }

    return (
        <form action={action} className={"w-screen h-screen flex flex-col justify-center items-center gap-4"}>
            { ...errorElement }
            <div className={"relative w-full"}>
                <button className={"absolute right-2 -top-10 px-5 py-2.5 text-xs text-app_yellow font-bold underline"} onClick={changeForm} type={"button"}>{ isLogin ? "Don't have an account?" : "Already have an account?" }</button>
            </div>
            <h1 className={"text-app_yellow text-2xl text-center font-bold"}>{ isLogin ? "login to your already existing account" : "create a new account" }</h1>
            <Inputs></Inputs>
            <button className={"bg-app_orange text-app_red-dark border-app_yellow border rounded-xl w-[95%] h-10"} type="submit">{ !isLogin ? "Sign Up" : "LogIn" }</button>
        </form>
    )
}
