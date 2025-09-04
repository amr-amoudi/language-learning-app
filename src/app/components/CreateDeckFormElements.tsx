import {buttonClasses, inputClasses, labelClasses} from '@/app/lib/reuse-classes'
import CreateForm from './CreateForm'
import { createDeckAction } from '../lib/form_actions'
import { ActionResult } from '../lib/types'
import useInputChange from '../hooks/useInputChange'
import SubmitButton from "@/app/components/SubmitButton";

export default function CreateDeckFormElements({ updateDecksState }: { updateDecksState: (data: ActionResult) => void }) {
  const [inputValue, handleInputChange] = useInputChange({
    name: ''
  })

  return (
    <CreateForm action={createDeckAction} onSuccessFunction={{ onSuccess: updateDecksState }}>
        <div className="flex justify-center items-center flex-col">
            <label className={labelClasses} htmlFor="name">name: </label>
            <input value={inputValue.name} onChange={handleInputChange} id="name" placeholder="eg. first deck" name="name" className={inputClasses} />
        </div>
        <SubmitButton className={`${buttonClasses} absolute bottom-5 left-1/2 transform -translate-x-1/2`} fallBackText={'Creating...'}>Create!</SubmitButton>
    </CreateForm>
  )
}
