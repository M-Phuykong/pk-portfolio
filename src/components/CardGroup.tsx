import React, { useState, useRef } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { Download, GithubFill, LinkedinBoxFill } from "akar-icons"
import styled, { css } from "styled-components";

import "../styles/card.scss";

import resume from "../download/Phuykong_Meng_Resume.pdf"


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
                        bg-white
                        rounded-[10px]
                        ">
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
                    <div
                        className="
                        flex
                        items-center
                        text-sm 2xl:text-xl
                        p-8
                        "
                        id="sub_intro_text_box">
                        <p className="
                        text-base 2xl:text-2xl
                        ">
                            A sophomore at Temple University, PA pursuing a degree Computer Science. <br />
                            I work as a software developer at the Neural Engineer Data Consortium Research Lab (NEDC).
                        </p>
                    </div>

                    <div
                    className="
                    flex
                    left-0
                    h-fit
                    absolute
                    bottom-0
                    w-full
                    justify-evenly
                    p-6
                    "
                    id="link_container">
                        <a href={resume} download="Phuykong_Meng_Resume.pdf" onClick={(e) => e.stopPropagation()}>
                            <Download strokeWidth={2} size={30} className="
                            h-6 2xl:h-fit
                            w-6 2xl:w-fit"/>
                        </a>

                        <a href="https://github.com/M-Phuykong" target="_blank" onClick={(e) => e.stopPropagation()}>
                        <GithubFill strokeWidth={2} size={30} className="
                        h-6 2xl:h-fit
                        w-6 2xl:w-fit"/>
                        </a>

                        <a href="https://www.linkedin.com/in/phuykong-meng/" target="_blank" onClick={(e) => e.stopPropagation()}>
                        <LinkedinBoxFill strokeWidth={2} size={30} className="
                        h-6 2xl:h-fit
                        w-6 2xl:w-fit"/>
                        </a>
                </div>
                </Card>

                <Card i = {2} expanded = {expanded} setExpanded={setExpanded} title="Experience">
                    <div className="p-8">
                        <div className="leading-tight font-bold">
                            Software Developer @ NEDC <br/>
                            <span className="font-medium">
                                Aug 2021 - Present
                            </span>
                        </div>

                        <ul className="list-disc p-5 pt-2 pb-0">
                            <li>
                                <span>
                                    Work with a variety of different languages such as
                                    Python, Javascript, PHP and C++.
                                </span>
                            </li>
                            <li>
                                <span>
                                    Led a software team of 3 other developers by doing
                                    code reviews on style formatting and weekly progress
                                    update. Collaborated with them to score and evaluate
                                    two machine learning systems that deals with EEG Seizure
                                    Detection and Digital Pathology.
                                </span>
                            </li>
                            <li>
                                <span>
                                    Developed and maintain over 5 websites that display
                                    current projects, a conference website for IEEE, and
                                    a website that monitors our server's load. Learned
                                    PHP in a month to create submission form that streamline
                                    the signing up process for the IEEE conference.
                                </span>
                            </li>
                        </ul>
                    </div>
                </Card>

                <Card i = {3} expanded = {expanded} setExpanded={setExpanded} title="Projects">
                    <div className="p-8">
                        <div className="leading-tight font-bold">

                            <div className="flex">
                                E-Commerce Store <br />

                                <a className='w-fit' href="https://github.com/M-Phuykong/Aesthetique-Trend-Frontend" target="_blank" onClick={(e) => e.stopPropagation()}>
                                    <GithubFill strokeWidth={2} size={20} className="
                                    ml-2"/>
                                </a>
                            </div>

                            <div className="font-semibold pt-2">
                                A full-stack online store using Vue JS Framework utilizing MongoDB as the database. Created a REST
                                API with Express JS that simplified data retrieval and update from and to the database.
                            </div>
                        </div>

                        <div className="leading-tight font-bold pt-5">

                            <div className="flex">
                                Synthboard <br/>

                                <a className='w-fit' href="https://github.com/M-Phuykong/synthboard-react" target="_blank" onClick={(e) => e.stopPropagation()}>
                                    <GithubFill strokeWidth={2} size={20} className="
                                    ml-2"/>
                                </a>
                            </div>

                            <div className="font-semibold pt-2">
                                Developed a website that utilizes Spotify REST API and React Framework to display the user’s top tracks and
                                artists that allow the user to customize their date range with a twist of physics rendering and 90s inspired
                                theme. I started this project as I wanted to be comfortable with REST API, React Framework and interactive
                                user experience.
                            </div>
                        </div>

                        <div className="leading-tight font-bold pt-5 pb-0">

                            <div className="flex">
                                CUDA Signal Resampling <br/>
                                Synthboard <br/>

                            </div>

                            <div className="font-semibold pt-2">
                                Built a signal resampling tool in C++ with the CUDA API to utilize the GPU computation powers. By using
                                parallel reduction and multithreading,
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>


        </LayoutGroup>
    );
};

