import Link from "next/link";
import CustomLink from "./customLink";

const classes = 'text-white w-20 min-h-15 flex justify-center items-center text-center px-5 py-1 rounded-lg border-[#45A29E] border-2 max-w-[100px] bg-[#1F2833]'

export default function NavBar() {
  return (
    <nav className="w-screen flex justify-around gap-5 my-5">
      <Link className={classes} href={'/words'}>Words</Link>
      <CustomLink className={classes + ' w-60 px-10'} href={'/languages'}>Chose language</CustomLink>
      <Link className={classes} href={'/help'}>Help?</Link>
    </nav>
  )
}
