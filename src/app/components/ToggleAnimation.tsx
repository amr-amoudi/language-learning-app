import {useEffect, useState} from "react";

interface ToggleAnimationProps {
    startAnimation: boolean;
    children: React.ReactNode;
    duration: number
}

export default function ToggleAnimation({ children, startAnimation, duration }: ToggleAnimationProps) {
    const [state, setState] = useState<{animationStart: boolean;mount: boolean}>({
        animationStart: startAnimation,
        mount: startAnimation
    });

    useEffect(() => {
        // if startAnimation is true, mount and show the component with animation
        if (startAnimation) {
            setState({...state, mount: true});
            const timer = setTimeout(() => {
                // start the animation after mounting the component
                setState({...state, animationStart: true});
            }, 10);
            return () => clearTimeout(timer);
        } else {
            // start the exit animation
            setState({...state, animationStart: false});
            const timer = setTimeout(() => {
                // unmount after the exit animation completed
                setState({...state, mount: false});
            }, duration); // This duration should match CSS transition-duration
            return () => clearTimeout(timer);
        }
    }, [startAnimation]);

    // don't mount children if shouldRender is false
    if(!state.mount){
        return null;
    }

    return (
        <div>
            {state.animationStart && children}
        </div>
    )
}



