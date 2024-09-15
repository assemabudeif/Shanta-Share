import React from "react";

export default function LoadingComp() {

    return (
        <div className={"flex justify-center items-center h-screen"}>
            <div className={"animate-spin rounded-full h-32 w-32 border-b-2 border-black"}/>
        </div>
    )
}