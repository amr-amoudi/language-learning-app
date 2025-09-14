import {useEffect, useRef} from "react";

export default function DeckName({ children }: { children: React.ReactNode }) {
    const ref = useRef<null | HTMLHeadingElement>(null);

    useEffect(() => {
        const text = ref.current

        if(text){
            if(text?.scrollWidth > text.clientWidth){
                text.className += 'scroll';
            }
        }

    }, [])


    return (
        <div className={'overflow-scroll max-w-[400px]'}>
            <h1 className={'text-2xl'} ref={ref}>{ children }</h1>
        </div>
    )
}


