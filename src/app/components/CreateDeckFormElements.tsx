import {buttonClasses, inputClasses, labelClasses} from '@/app/lib/reuse-classes'
import useInputChange from '../hooks/useInputChange'
import SubmitButton from "@/app/components/SubmitButton";

export default function CreateDeckFormElements({ children, name }: { children?: React.ReactNode, name?: string }) {
  const [inputValue, handleInputChange] = useInputChange({
    name: name || ''
  })

  return (
        <>
            <div className="flex justify-center items-center flex-col">
                <label className={labelClasses} htmlFor="name">name: </label>
                <input value={inputValue.name} onChange={handleInputChange} id="name" placeholder="eg. first deck" name="name" className={inputClasses} />
            </div>
            { children ||
                <SubmitButton className={`${buttonClasses} absolute bottom-5 left-1/2 transform -translate-x-1/2`} fallBackText={'Creating...'}>Create!</SubmitButton>
            }
        </>
  )
}
