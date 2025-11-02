import NextPreviousFormButtons from "@/app/start/[deck_id]/components/helperComponents/NextPreviousFormButtons";


export default function SessionCompleted(){
    return (
        <div className={"flex flex-col items-center justify-center my-20"}>
            <h1 className={"text-5xl text-app_orange mb-10"}>Session Completed!</h1>
            <p className={"text-2xl text-app_yellow mb-20"}>Great job on completing your session. Keep up the good work!</p>
            <NextPreviousFormButtons></NextPreviousFormButtons>
        </div>
    )
}


