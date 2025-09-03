import { inputClasses, labelClasses } from '@/app/lib/reuse-classes'
import CreateForm from './CreateForm'
import { createDeckAction } from '../lib/form_actions'
import { ActionResult } from '../lib/types'
import useInputChange from '../hooks/useInputChange'

export default function CreateDeckFormElements({ updateDecksState }: { updateDecksState: (data: ActionResult) => void }) {
  const [inputValue, handleInputChange] = useInputChange({
    name: ''
  })

  return (
    <CreateForm buttonText="create" action={createDeckAction} onSuccess={updateDecksState}>
      <div className="flex justify-center items-center flex-col">
        <label className={labelClasses} htmlFor="name">name: </label>
        <input value={inputValue.name} onChange={handleInputChange} id="name" placeholder="eg. first deck" name="name" className={inputClasses} />
      </div>
    </CreateForm>
  )
}
