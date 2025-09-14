import {buttonClasses, inputClasses, labelClasses} from '@/app/lib/reuse-classes'
import useInputChange from '../hooks/useInputChange'
import SubmitButton from "@/app/components/SubmitButton";
import useDisplayError from "@/app/hooks/useDisplayError";

export default function CreateDeckFormElements({ children, name }: { children?: React.ReactNode, name?: string }) {
    const [errorElements, setErrorMessage] = useDisplayError([''], 3000)
    const [inputValue, handleInputChange] = useInputChange({name: name || ''
    }, (e) => {
        if(e.target.value.length > 30){
            setErrorMessage(['deck name must be under 30 letters'])
            return false
        }

        return true
    })

  return (
        <>
            { ...errorElements }
            <div className="flex justify-center items-center flex-col">
                <label className={labelClasses} htmlFor="name">name: </label>
                <input value={inputValue.name} onChange={handleInputChange} id="name" placeholder="eg. first deck (Max 30)" name="name" className={inputClasses} />
            </div>
            { children ||
                <SubmitButton className={`${buttonClasses} absolute bottom-5 left-1/2 transform -translate-x-1/2`} fallBackText={'Creating...'}>Create!</SubmitButton>
            }
        </>
  )
}
