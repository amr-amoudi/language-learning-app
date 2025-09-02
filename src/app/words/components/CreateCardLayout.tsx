'use client';

import PhoneModal from "@/app/components/PhoneModal";
import {Dispatch, SetStateAction, useState} from "react";
import CreateCardFormElements from "@/app/components/CreateCardFormElements";
import {usePathname} from "next/navigation";


export default function CreateCardLayout(){
    const deckId: string = usePathname().split('/')[2];
    const [current, setCurrent] = useState({
        isOpen: false,
        modalHtml: <CreateCardFormElements deckId={deckId} />
    });

    function openModal() {
        setCurrent(prev => (
            { ...prev, isOpen: true }
        ));
    }

    function closeModal(){
        setCurrent(prev => ({ ...prev, isOpen: false }));
    }

    return (
        <>
            <div className="w-screen flex justify-center text-center flex-col items-center
                          bg-transparent border-x-0 border-b-0 mt-5 font-semibold text-changer">
                <button onClick={openModal} className="w-[80%] border-app_yellow bg-transparent-orange py-2.5 px-1
                                rounded-lg border-2 text-3xl flex items-center justify-center
                                my-5 text-app_red-dark h-[60px] overflow-hidden relative bg-transperint-orange cursor-pointer">
                    {/* the spin animation lives here */}
                    <div className="roles-slider">
                        <span className="role">+</span>
                        <span className="role">Create A Card</span>
                        <span className="role">Add Words</span>
                        <span className="role">+</span>
                    </div>
                </button>
            </div>
            <PhoneModal isOpen={current.isOpen} closeModalState={closeModal as Dispatch<SetStateAction<boolean>>}>
                {current.modalHtml}
            </PhoneModal>
        </>
    )
}



