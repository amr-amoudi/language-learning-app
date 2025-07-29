'use client'
import { inputClasses, labelClasses } from "../lib/reuse-classes"


export default function CreateCardFormElements() {

  return (
    <div className="flex flex-col justify-cetner items-center">
      <label className={labelClasses} htmlFor="word">Word*</label>
      <input placeholder={'eg. "Здравствуйте"'} className={inputClasses} />
      <div className="h-[2px] w-[95%] border-b-2 border-b-app_red-dark my-5 "></div>
      <label className={labelClasses} htmlFor="word">Meaning*</label>
      <input placeholder={'eg. "hello"'} className={inputClasses} />
      <label className={labelClasses} htmlFor="word">Decsribtion</label>
      <textarea placeholder={'describe your word or add any other ways to explain it eg. "formal way of saying hello"'} className={inputClasses + 'placeholder:text-sm w-[95%] p-0 resize-none'}></textarea>
    </div>
  )
}


