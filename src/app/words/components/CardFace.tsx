export default function CardFace({ children }: { children: React.ReactNode }){
    return (
        <div className={`absolute top-0 left-0 w-full h-full rounded-md flex items-center justify-center
            bg-app_yellow text-app_red-light [backface-visibility:hidden] overflow-hidden text-3xl`}>
            {children}
        </div>
    );
}