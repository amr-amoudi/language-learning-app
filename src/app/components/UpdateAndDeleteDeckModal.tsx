import OnSuccess from "@/app/components/OnSuccess";
import UpdateFormModal from "@/app/components/UpdateFormModal";
import DeleteForm from "@/app/components/DeleteForm";
import SubmitButton from "@/app/components/SubmitButton";
import {buttonClasses, deleteButtonStyle} from "@/app/lib/reuse-classes";
import {usePathname} from "next/navigation";
import {deleteDeckFromAction} from "@/app/lib/form_actions";
import FormSwitcher, {FormSwitcherContext} from "@/app/components/FormSwitcher";
import React from "react";
import UpdateDeckForm from "@/app/components/UpdateDeckForm";
import {ActionResult, Deck} from "@/app/lib/types";
import {DecksContext} from "@/app/words/components/DecksContent";


// Update Response Example
// {
//   "succeeded": true,
//   "successValue": [
//     {
//       "id": "56b500d1-d721-48af-af7d-4fb28860d557",
//       "name": "help",
//       "user_id": "c1fc20c4-d5c7-43e9-85d7-b0c905a6f8a9",
//       "is_active": true
//     }
//   ],
//   "errors": null
// }

// Delete response example
//{
//   "succeeded": true,
//   "successValue": {
//     "deckId": "56b500d1-d721-48af-af7d-4fb28860d557"
//   },
//   "errors": null
// }


export default function UpdateAndDeleteDeckModal({ deckName }: { deckName: string }) {
    const { setDecks } = React.useContext(DecksContext);
    const deckId = usePathname().split('/')[2];

    function handleOnSuccess(data: ActionResult){
        if(Array.isArray(data.successValue)){
            const updatedDeck = data.successValue[0] as Deck;
            setDecks((prev) => prev.map(deck => {
                if(deck.id === updatedDeck.id){
                    return updatedDeck;
                }else {
                    return deck;
                }
            }))
        }else {
            const deletedDeckId = (data.successValue as { deckId: string }).deckId;
            setDecks((prev) => prev.filter(deck => deck.id !== deletedDeckId));
        }
    }

    return (
        <OnSuccess onSuccess={handleOnSuccess}>
            <FormSwitcher className={"h-full"}>
                <DeleteForm action={(_, formData) => deleteDeckFromAction(_, formData, deckId)}>
                    <h1 className={"text-2xl"}>Name: &#34;{deckName}&#34;</h1>

                    <div className={"flex items-center justify-center absolute bottom-5 left-[50%] right-[50%]"}>
                        <SubmitButton fallBackText={"Deleting..."} className={deleteButtonStyle}>
                            Delete
                        </SubmitButton>
                        <FormSwitcherContext.Consumer>
                            {({nextForm}) => (
                                // when clicked, switch to update form
                                <button type={'button'} className={buttonClasses} onClick={() => {
                                    nextForm()
                                }}> Edit </button>
                            )}
                        </FormSwitcherContext.Consumer>
                    </div>
                </DeleteForm>
                <UpdateFormModal>
                    <UpdateDeckForm deckId={deckId} name={deckName}>
                        <FormSwitcherContext.Consumer>
                            {({previousForm}) => (
                                <button
                                    className={`top-2.5 left-0 text-app_orange font-bold text-direct underline outline-none mb-2 ml-2 absolute text-sm`}
                                    onClick={previousForm}
                                    type={'button'}
                                >
                                    {"<- Go Back"}
                                </button>
                            )}
                        </FormSwitcherContext.Consumer>
                        <SubmitButton className={`${buttonClasses} absolute bottom-5 left-1/2 transform -translate-x-1/2`} fallBackText={'Updating...'}>
                            Update!
                        </SubmitButton>
                    </UpdateDeckForm>
                </UpdateFormModal>
            </FormSwitcher>
        </OnSuccess>
    )
}


