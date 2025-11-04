interface ToggleableTextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
    isShown: boolean;
    onClick?: () => void;
    className?: string;
    rest?: React.HTMLAttributes<HTMLDivElement>;
}

export default function BlurredText({children, isShown, onClick, className,...rest}: ToggleableTextProps){

    return (
        <div {...rest} className={`${!isShown ? "blur-sm" : "blur-none"} border-white transition-all duration-150 select-none ${className}`} onClick={onClick}>
            {children}
        </div>
    )
}