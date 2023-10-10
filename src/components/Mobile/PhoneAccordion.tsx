import React, { useEffect, useRef, useState } from 'react'
import {motion, AnimatePresence, usePresence, color, LayoutGroup} from "framer-motion"

import { GithubFill, LinkedinBoxFill, File, CircleChevronRightFill } from 'akar-icons'

import "../../styles/mobileLayout.scss"

interface AccordionProps {
    i: number,
    expanded: false | number,
    setExpanded: React.Dispatch<React.SetStateAction<number | false>>,
    children: React.ReactNode,
    title: string,
}

const Accordion = ({ i, expanded, setExpanded, children, title } : AccordionProps) => {
    const isOpen = i === expanded;

    const accordionVariants = {
        collapsed: {
            height: "0",
            opacity: 0,
        },
        open: {
            height : "auto",
            opacity: 1,
        },

    };

    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    //
    return (
    <>
    <motion.header
        key="content"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={accordionVariants}

        style={{
            marginBottom: 25,
        }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className='h-[4rem] mb-5 px-5 relative
                leading-[4rem] text-xl font-bold

                rounded-[10px] bg-[#ffffff8c] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[20px]
                dark:bg-[#111928bd]
                '>
        <div className="
                    flex justify-between items-center noselect
                    dark:text-white
                    " >
            {title}
            <motion.span
            key = "button"
            animate = { {
                rotate: expanded ? 90 : 0,
            }}
            transition={ { duration : 0.35}}
            >
                <CircleChevronRightFill strokeWidth={2} size={32} id="label_button" className=""/>
            </motion.span>
        </div>

        <AnimatePresence initial={false}>
            {isOpen && (
            <motion.section
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ type: "tween", duration: 0.5 }}
                className="overflow-hidden"
            >
                <motion.hr
                className="m-0 mb-3 w-full h-[2px]"></motion.hr>
                {children}
            </motion.section>
            )}
        </AnimatePresence>
    </motion.header>
    </>
    );
};

export const PhoneAccordion = () => {

    const [expanded, setExpanded] = useState<false | number>(1);
    const [expanded1, setExpanded1] = useState<false | number>(false);
    const [expanded2, setExpanded2] = useState<false | number>(false);

    return (

        <div className={'p-5 pt-0 ' + (expanded2 ? "pb-3" : "")}>

            <Accordion title="About Me"
            i={1} expanded={expanded} setExpanded={setExpanded}>
                <div className="pb-5 text-sm font-normal leading-snug">
                    A sophomore at Temple University, PA pursuing a degree in Computer Science.
                    I have a keen interest in Machine Language and Front-End Development.
                </div>
            </Accordion>

            <Accordion title="Experience"
            i={2} expanded={expanded1} setExpanded={setExpanded1}>
                <div className="pb-5">
                    <div className="leading-tight font-medium text-base text-gray-950">
                        Software Developer @ NEDC <br/>
                        <span className="text-gray-600 text-sm">
                            Aug 2021 - Present
                        </span>
                    </div>

                    <ul className="list-disc p-5 pt-2 pb-0 text-sm leading-snug">
                        <li>
                            <span className="font-normal">
                                Work with a variety of different languages such as
                                Python, Javascript, PHP and C++.
                            </span>
                        </li>
                        <li>
                            <span className="font-normal">
                                Led a software team of 3 other developers by doing
                                code reviews on style formatting and weekly progress
                                update. Collaborated with them to score and evaluate
                                two machine learning systems that deals with EEG Seizure
                                Detection and Digital Pathology.
                            </span>
                        </li>
                        <li>
                            <span className="font-normal">
                                Developed and maintain over 5 websites that display
                                current projects, a conference website for IEEE, and
                                a website that monitors our server's load. Learned
                                PHP in a month to create submission form that streamline
                                the signing up process for the IEEE conference.
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="pb-5">
                    <div className="leading-tight font-medium text-base text-gray-950">
                        SD Intern @ Strados Labs <br/>
                        <span className="text-gray-600 text-sm">
                            June 2023 - August 2023
                        </span>
                    </div>

                    <ul className="list-disc p-5 pt-2 pb-0 text-sm leading-snug">
                        <li>
                            <span className="font-normal">
                                Built an interactive graph for quality checking purposes. The graph plots the x and y coordinates that were
                                generated by a UMAP from the data's features. The graph allows the user to select a point and display the patient
                                information and relabel the data point.
                            </span>
                        </li>
                        <li>
                            <span className="font-normal">

                            </span>
                        </li>
                        <li>
                            <span className="font-normal">

                            </span>
                        </li>
                    </ul>
                </div>
            </Accordion>

            <Accordion title="Projects"
            i={3} expanded={expanded2} setExpanded={setExpanded2}>
                <div className="pb-5">
                    <div className="leading-tight font-medium text-base">

                        <div className="flex text-gray-950">
                            E-Commerce Store <br />

                            <a className='w-fit' href="https://github.com/M-Phuykong/Aesthetique-Trend-Frontend" target="_blank" onClick={(e) => e.stopPropagation()}>
                                <GithubFill strokeWidth={2} size={20} className="
                                ml-2"/>
                            </a>
                        </div>

                        <div className="pt-1 text-sm leading-snug font-normal">
                            A full-stack online store using Vue JS Framework utilizing MongoDB as the database. Created a REST
                            API with Express JS that simplified data retrieval and update from and to the database.
                        </div>
                    </div>

                    <div className="leading-tight font-medium text-base pt-5">

                        <div className="flex">
                            Synthboard <br/>

                            <a className='w-fit' href="https://github.com/M-Phuykong/synthboard-react" target="_blank" onClick={(e) => e.stopPropagation()}>
                                <GithubFill strokeWidth={2} size={20} className="
                                ml-2"/>
                            </a>
                        </div>

                        <div className="pt-1 text-sm leading-snug font-normal">
                            Developed a website that utilizes Spotify REST API and React Framework to display the user’s top tracks and
                            artists that allow the user to customize their date range with a twist of physics rendering and 90s inspired
                            theme. I started this project as I wanted to be comfortable with REST API, React Framework and interactive
                            user experience.
                        </div>
                    </div>

                    <div className="leading-tight font-medium text-base pt-5">

                        <div className="flex">
                            CUDA Signal Resampling <br/>
                        </div>

                        <div className="pt-1 text-sm leading-snug font-normal">
                            Built a signal resampling tool in C++ with the CUDA API to utilize the GPU computation powers.
                        </div>
                    </div>

                    <div className="leading-tight font-medium text-base pt-5 pb-3">

                        <div className="flex">
                            OwlHack 2023 Winner <br/>

                            <a className='w-fit' href="https://github.com/M-Phuykong/OwlHack2023" target="_blank" onClick={(e) => e.stopPropagation()}>
                                <GithubFill strokeWidth={2} size={20} className="
                                ml-2"/>
                            </a>
                        </div>

                        <div className="pt-1 text-sm leading-snug font-normal">
                            Developed a website that promotes healthy eating habits
                            by providing them with various shopping list, meal suggestions and recipes
                            based on their current ingredients. Winner for the Best Health and Wellness
                            category.
                        </div>
                    </div>
                </div>
            </Accordion>
        </div>
    )
};

