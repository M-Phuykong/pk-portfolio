import React, { useState, useRef } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import styled, { css } from "styled-components";

import "../styles/card.scss";
import { Height } from "akar-icons";

interface CardProps {
    i: number,
    expanded: false | number,
    setExpanded: React.Dispatch<React.SetStateAction<number | false>>,
    children: React.ReactNode,
    title: string,
}

const cardVariant = {

    open: {
        height: "100%",
        width: "100%",

    },

    close: {
        height: "20rem",
        width: "100rem",

    }
}

const CardLink = styled(motion.div)`
    height: 100%;
    width: 100%;
    padding: 4rem;

    ${(props) =>
        props.isCardOpened &&
        css`
        width: 100%;
        height: 100%;
        padding: 0;
        overflow-y: auto;
        overflow-x: hidden;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    `}
`;
const Card = ({ i, expanded, setExpanded, children, title} : CardProps) => {

    const isOpen = expanded === i;

    const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
    const card = useRef<HTMLDivElement>(null);

    return (
        <>

            <CardLink

            ref = {card}

            layout
            isCardOpened={isOpen}
            layoutId={`card-${i}`}

            onClick={() => {
                setExpanded(isOpen ? false : i);
                if (!isOpen) {
                    setCardDimensions({
                        width: card.current!.clientWidth,
                        height: card.current!.clientHeight
                    });
                }

            }}
            >
                <AnimatePresence>

                    { isOpen ?

                        <div className="
                        h-full w-full
                        rounded-[10px]
                        border border-black border-solid border-3">
                            {children}
                        </div>

                        :

                        <div className="
                        h-full w-full
                        rounded-[10px]
                        p-2
                        text-4xl
                        border border-black border-solid border-3">

                            <a href="#" className="">
                                > {title}
                            </a>
                        </div>
                    }
                </AnimatePresence>
            </CardLink>
            {isOpen && (
                <>
                    <div
                    style={{
                        width: cardDimensions.width,
                        height: cardDimensions.height
                    }}></div>
                </>
            )}
        </>
    );

};

export const CardGroup = () => {

    const [expanded, setExpanded] = useState<false | number>(0);

    return (
        <LayoutGroup>

            <motion.div

            id = "card_group"

            className="
            h-auto w-full
            grid grid-cols-3
            row-span-4
            ">

                <Card i = {1} expanded = {expanded} setExpanded={setExpanded} title="About Me">
                    <div>
                        this is a about me section
                    </div>
                </Card>

                <Card i = {2} expanded = {expanded} setExpanded={setExpanded} title="Experience">
                    <div>
                        this is the experience section
                    </div>
                </Card>

                <Card i = {3} expanded = {expanded} setExpanded={setExpanded} title="Projects">
                    <div>
                        this is the projects section
                    </div>
                </Card>
            </motion.div>


        </LayoutGroup>
    );
};

