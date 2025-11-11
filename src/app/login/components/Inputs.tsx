import {inputClasses} from "@/app/lib/reuse-classes";


export default function Inputs(){
   return (
       <>
           <div>
               <label htmlFor={"username self-start text-app_orange"}>username</label>
               <input type={"text"} id={"username"} name={"username"} className={"bg-app_yellow " + inputClasses} placeholder={"username..."}/>
           </div>
           <div>
               <label htmlFor={"password self-start"}>password</label>
               <input type={"password"} id={"password"} name={"password"} className={"bg-app_yellow " + inputClasses} placeholder={"password..."}/>
           </div>
       </>
   )
}

