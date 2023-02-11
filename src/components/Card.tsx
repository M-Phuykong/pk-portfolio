import React from "react";

interface CardProps {
    children: React.ReactNode
    text: string
}

const Card: React.FunctionComponent<CardProps> = ({text, children} : CardProps) => {


    return (
        <div className="
        flex
        w-full
        h-full
        items-center
        text-5xl
        p-5">
            <div className="
            rounded-lg
            items-center
            w-full h-full
            border border-white border-solid border-2
            shadow-xl
            ">
                {children}
                {/* <h1>{text}</h1> */}
            </div>
        </div>
    );
}

export default Card;