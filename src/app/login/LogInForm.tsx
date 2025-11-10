'use client'

import {LoginAction} from "@/app/lib/form_actions";
import {useActionState, useContext} from "react";
import {FormSwitcherContext} from "@/app/components/FormSwitcher";
import {ActionResult} from "@/app/lib/types";


export default function LogInForm(){
    const { nextForm } = useContext(FormSwitcherContext)
    const initialState: ActionResult = {
        succeeded: false,
        errors: [],
        successValue: undefined,
    }
    const [_, action] = useActionState(LoginAction, initialState)

    return (
        <form action={action}>
            <button onClick={nextForm} type={"button"}>Sign Up</button>
            <input type={"text"} name={"username"} className={"bg-app_yellow"}/>
            <input type="text" name={"password"} className={"bg-app_yellow"}/>
            <button type="submit">Login</button>
        </form>
    )
}
