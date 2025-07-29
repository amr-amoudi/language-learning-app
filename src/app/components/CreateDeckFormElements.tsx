import { inputClasses, labelClasses } from '@/app/lib/reuse-classes'

export default function CreateDeckFormElements() {
  return <div className="flex justify-center items-center flex-col">
    <label className={labelClasses} htmlFor="name">name: </label>
    <input id="name" placeholder="eg. first deck" name="name" className={inputClasses} />
  </div>
}
