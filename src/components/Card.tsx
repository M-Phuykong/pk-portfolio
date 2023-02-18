import React from "react";

import "../styles/card.scss";

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
        p-5"
        >
                        {/* rounded-lg
            relative
            items-center
            w-full h-full
            border border-white border-solid border-2
            shadow-xl */}
            <div className="
            card_container
            "
            id="">
                <a href="" className="card_link
                border border-white border-solid border-2
                shadow-2xl
                ">
                    <div className="card_content card_content_lhs">
                        <div className="card_title">
                            {text}
                        </div>
                        <div className="card_footer">
                            <p>Cakes</p>
                            <time>1 Jan 2020</time>
                        </div>
                    </div>
                    <div className="card_content card_content_rhs">
                        <div className="card_title">
                            {text}
                        </div>
                        <div className="card_footer">
                            <p>Cakes</p>
                            <time>1 Jan 2020</time>
                        </div>
                    </div>
                </a>
                {/* {children} */}
            </div>
        </div>
    );
}

export default Card;