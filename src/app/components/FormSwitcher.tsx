"use client";
import React from "react";


interface FormSwitcherContextProps {
    setActiveForm: (number: number) => void,
    nextForm: () => void,
    previousForm: () => void
}

export const FormSwitcherContext = React.createContext<FormSwitcherContextProps>(
    { setActiveForm: (number: number) => {}, nextForm: () => {}, previousForm: () => {} });

// must be the parent of all forms that will be switched between

export default function FormSwitcher({ children, displayFormsAs }: { children: React.ReactNode[], displayFormsAs?: 'block' | 'inline-block' | 'flex' }) {

    const [activeIndex, setActiveIndex] = React.useState(0);

    function setActiveForm(index: number) {
        setActiveIndex(index);
    }

    function nextForm() {
        setActiveIndex((prev) => prev + 1)
    }

    function previousForm() {
        setActiveIndex((prev) => {
            if(prev - 1 < 0) {
                return 0;
            }

            return prev - 1;
        })
    }

    return (
        <FormSwitcherContext.Provider value={{ setActiveForm, nextForm, previousForm }}>
            {children.map((item, index) => {
                return <div key={index} className={`${activeIndex === index ? displayFormsAs || 'block' : 'hidden'}`}>
                    {item}
                </div>
            })}
        </FormSwitcherContext.Provider>
    )
}



