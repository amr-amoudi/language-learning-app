import OnSuccess from "@/app/components/OnSuccess";
import UpdateFormModal from "@/app/components/UpdateFormModal";


export default function UpdateDeckModal(){
    return (
        <OnSuccess onSuccess={(data) => {console.log(data)}}>
            <UpdateFormModal>
                <></>
            </UpdateFormModal>
        </OnSuccess>
    )
}


