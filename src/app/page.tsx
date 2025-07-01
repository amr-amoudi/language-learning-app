//import Banner from "./extra/banner.jsx";
import React from "react";
import NavBar from "./components/Nav";

export default function Page() {
  // const navigate = useNavigate();
  // const wordsArrLength = localStorage.getItem("wordsData");
  // const lang = JSON.parse(localStorage.getItem("lang")!)?.lang;
  const disable = false
  const displayError = false

  // if (wordsArrLength) {
  //   if (JSON.parse(wordsArrLength).length <= 3) {
  //     disable = true
  //     displayError = true
  //   }
  //
  //   if (JSON.parse(wordsArrLength).length === 0) {
  //     disable = true
  //     displayError = false
  //   }
  // }

  // if (!localStorage.getItem("wordsData")) {
  //   localStorage.setItem("wordsData", JSON.stringify([]))
  // }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <NavBar />
      <div className="flex items-center justify-center h-full w-full"> {/* Flex container for centering */}
        {displayError && <div className={"banner--words--alighn"}>
        </div>}
        <button
          className="text-white px-4 py-2 rounded cursor-pointer mb-20 border-[#45A29E] border-2 max-w-[100px] bg-[#1F2833]"
          disabled={disable}
        >
          START
        </button>
      </div>
    </div>
  )
}
