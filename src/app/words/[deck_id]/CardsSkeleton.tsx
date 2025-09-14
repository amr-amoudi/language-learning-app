import React from "react";
import BoxSkeleton from "@/app/components/Skeletons/BoxSkeleton";


export default function CardsSkeleton(){


    return (
        <div className={"w-full flex justify-center items-center flex-col"}>
            {/* Create Card button */}
            <BoxSkeleton w={"80%"} h={'60px'} border={"2px solid #fff3b0"} styles={{ marginTop: "20px", marginBottom: "20px" }} />

            {/* Cards */}
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
            <BoxSkeleton w={"70%"} h={'80px'} border={"1px solid #540b0e"} styles={{margin: "10px auto"}} />
        </div>
    )
}


