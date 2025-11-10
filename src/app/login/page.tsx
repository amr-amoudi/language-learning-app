'use client';


import FormSwitcher from "@/app/components/FormSwitcher";
import LogInForm from "@/app/login/LogInForm";
import SignUpForm from "@/app/login/SignUpForm";

export default function Login() {


  return (
      <FormSwitcher>
          <LogInForm></LogInForm>
          <SignUpForm></SignUpForm>
      </FormSwitcher>
  )
}
