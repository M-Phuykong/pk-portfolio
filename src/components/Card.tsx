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
        rounded-lg
        text-white 
        text-5xl
        border border-white border-solid border-2">
            <h1>{text}</h1>
        </div>
    );
}
 
export default Card;