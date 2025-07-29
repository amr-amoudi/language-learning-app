import Link from "next/link";

export default async function mainPage() {
  return (
    <div className="text-app_yellow grid-cols-3 grid-rows-3 grid w-screen h-screen overflow-hidden px-4 py-5 m-0 md:max-w-[1500] md:mx-auto">
      <div className="col-span-1">
        <Link className="font-medium bg-app_orange text-app_red-dark px-2 py-2 border-2 rounded-lg hover:bg-app_red-light border-app_yellow hover:text-app_yellow" href={'/words'}>Words</Link>
      </div>
      <div className="col-end-4 col-start-3 flex justify-end items-start">
        <button className="flex flex-col gap-1 cursor-pointer">
          <div className="w-7 h-1.5 bg-amber-500"></div>
          <div className="w-7 h-1.5 bg-amber-500"></div>
          <div className="w-7 h-1.5 bg-amber-500"></div>
        </button>
      </div>
      <div className="col-end-3 col-start-2 row-end-3 row-start-2 flex justify-center items-center">
        <button className="cursor-pointer text-xl font-medium bg-app_orange text-app_red-dark px-5 py-3 border-2 rounded-lg hover:bg-app_red-light border-app_yellow hover:text-app_yellow">Start!</button>
      </div>
    </div>
  )
}

