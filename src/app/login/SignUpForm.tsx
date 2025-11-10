'use client'
import {LoginAction} from "@/app/lib/form_actions";
import {FormSwitcherContext} from "@/app/components/FormSwitcher";
import {useActionState, useContext} from "react";
import {ActionResult} from "@/app/lib/types";


export default function SignUpForm(){
    const { previousForm } = useContext(FormSwitcherContext);
    const initialState: ActionResult = {
        succeeded: false,
        errors: [],
        successValue: undefined,
    }
    const [_, action] = useActionState(LoginAction, initialState)

    return (
        <form action={action}>
            <button onClick={previousForm} type={"button"}>login</button>
            <input name={'username'} className={"bg-app_yellow"} type={"text"}></input>
            <input name={'password'} className={"bg-app_yellow"} type={"text"}></input>
            <button type={"submit"}>sign up</button>
        </form>
    )
}

