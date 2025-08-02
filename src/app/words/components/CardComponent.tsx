'use client';
import React, {useEffect} from "react";
import PhoneModal from "@/app/components/PhoneModal";

interface CardComponentProps {
    id: string;
    description?: string;
    children: React.ReactNode;
}


export default function CardComponent({ id, description, children }: CardComponentProps ){
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [showInfoButton, setShowInfoButton] = React.useState(true);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setShowInfoButton(true);
        }, 350);

        return () => clearTimeout(timeOut);
    }, [isFlipped]);

    return (
        <div className={`w-screen flex items-center justify-center my-2.5`}>
            {/* the main container for the card*/}
            <div className={'w-[70%] min-h-[80px] bg-none relative'}>
                {/*the card itself*/}
                <div onClick={() => {
                    setIsFlipped(!isFlipped)
                    setShowInfoButton(false);
                }} className={`relative w-full h-full min-h-[80px] rounded-md
                                transition-all duration-500 border-app_red-dark border-2 px-2 py-1 
                                [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    {children}
                </div>


                {/* if description exists */}
                { description && showInfoButton && <button onClick={() => setIsOpen(true)} className={`absolute top-1 left-1 border-2 
                border-app_red-light rounded-full w-[25px] h-[25px] flex items-center justify-center text-xl text-app_yellow bg-transparent-orange
                `}>i</button> }
                { description && showInfoButton && <PhoneModal height={'h-[40%]'} isOpen={isOpen} closeStateFun={setIsOpen}>
                    <p className={'text-xl py-5 ml-5'}>
                        {description}
                    </p>
                </PhoneModal> }
            </div>
        </div>
    )
}


