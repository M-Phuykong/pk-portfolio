import React from "react";
import { motion } from "framer-motion"

import "../styles/card.scss";

interface CardProps {
    children: React.ReactNode,
    text: string,
    key: string,
}

const Card: React.FunctionComponent<CardProps> = ({text, children, key} : CardProps) => {

    const exitVariant = {



    }

    const [isOpen, setIsOpen] = React.useState(false);

    return (
            <motion.div
            key = {key}
            data-isOpen = {isOpen}
            transition={{
                duration: 0.2,
                delay: 0.15
            }}
            id = "card"
            layout
            className="
            flex
            h-full
            items-center
            text-5xl
            p-5"
            onClick={() => setIsOpen(!isOpen)}
            >
                { isOpen ?
                    <div className="
                        card_container
                        "
                        id="">
                            {children}
                    </div>
                    :
                    <div className="
                    card_container
                    "
                    id="">
                        <a href="#" className="card_link
                        border border-white border-solid border-2
                        shadow-2xl
                        ">
                            <div className="card_content card_content_lhs">
                                <div className="card_title">
                                    >{text}
                                </div>
                                <div className="card_footer">

                                </div>
                            </div>
                            <div className="card_content card_content_rhs">
                                <div className="card_title">
                                    >{text}
                                </div>
                                <div className="card_footer">
                                </div>
                            </div>
                        </a>
                    </div>
                }
            </motion.div>
    );
}

export default Card;