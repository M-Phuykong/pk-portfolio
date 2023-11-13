import React, { useEffect, useRef, useState } from 'react'
import {motion, AnimatePresence, usePresence, color, LayoutGroup} from "framer-motion"

import { GithubFill, LinkedinBoxFill, File, CircleChevronRightFill } from 'akar-icons'

import { useTheme } from '../../context/ThemeContext'

import "../../styles/mobileLayout.scss"

interface AccordionProps {
    i: number,
    expanded: false | number,
    setExpanded: React.Dispatch<React.SetStateAction<number | false>>,
    children: React.ReactNode,
    title: string,
}

export const Accordion = ({ i, expanded, setExpanded, children, title } : AccordionProps) => {
    const isOpen = i === expanded;

    const { theme, updateTheme } = useTheme();

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
            backgroundColor: theme.background,
        }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className='h-[4rem] mb-5 px-5 relative
                leading-[4rem] text-xl font-bold

                rounded-[10px] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[20px]
                '>
        <div className="flex justify-between items-center noselect"
        style={{
            color: theme.main_color,
        }}>
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
                style={{
                    color: theme.sub_color,
                }}
            >
                <motion.hr
                className="m-0 mb-3 w-full h-[2px]" style={{background: theme.text_color}}></motion.hr>
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
    const { theme, updateTheme } = useTheme();

    return (

        <div className={'p-5 pt-0 ' + (expanded2 ? "pb-3" : "")}>

            <Accordion title="About Me"
            i={1} expanded={expanded} setExpanded={setExpanded}>
                <div className="pb-5 text-sm font-normal leading-snug">
                    A junior at Temple University, PA pursuing a degree in Computer Science. I have a keen interest in Machine Language and Front-End Development.
                </div>
            </Accordion>

            <Accordion title="Experience"
            i={2} expanded={expanded1} setExpanded={setExpanded1}>
                <div className="pb-5">
                    <div className="leading-tight font-medium text-base text-gray-950">
                        <span style={{
                            color: theme.text_color,
                        }}>
                            Software Developer @ NEDC <br/>
                        </span>
                        <span className="text-sm" style={{color: theme.main_color}}>
                            Aug 2021 - Present
                        </span>
                    </div>

                    <ul className="list-disc p-5 pt-2 pb-0 text-sm leading-snug">
                        <li>
                            <span className="font-normal">
                                Developed a common data structure using Python that unifies several input data into one, which cuts down development time by half and improved code maintainability and reusability
                            </span>
                        </li>
                        <li>
                            <span className="font-normal">
                                Supervised 3 team members with weekly standup and code reviews using emails and Zoom, speeding up progress and maintaining the group’s standard.
                            </span>
                        </li>
                        <li>
                            <span className="font-normal">
                                Evaluated, and refactored two machine learning systems for production to ensure results reproducibility on other machines.
                            </span>
                        </li>
                        <li>
                            <span className="font-normal">
                                Redesigned, and built the main webpage using Figma, HTML, CSS, and Javascript,  which improved users flow and content organization.
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="pb-5">
                    <div className="leading-tight font-medium text-base text-gray-950">
                        <span style={{
                            color: theme.text_color,
                        }}>
                            SD Intern @ Strados Labs <br/>
                        </span>
                        <span className="text-sm" style={{color: theme.main_color}}>
                            June 2023 - August 2023
                        </span>
                    </div>

                    <ul className="list-disc p-5 pt-2 pb-0 text-sm leading-snug">
                        <li>
                            <span className="font-normal">
                                Created a web application using HTML, SCSS, Javascript, D3.js that visualizes UMAP data mapping which cuts down QA time by 50%
                            </span>
                        </li>
                        <li>
                            <span className="font-normal">
                                Integrated API calls to the backend server which connects to an Amazon S3 bucket that fetches and uploads files, adding a layer of security in protecting patients’ data
                            </span>
                        </li>
                    </ul>
                </div>
            </Accordion>

            <Accordion title="Projects"
            i={3} expanded={expanded2} setExpanded={setExpanded2}>
                <div className="pb-5">
                    <div className="leading-tight font-medium text-base">

                        <div className="flex" style={{ color: theme.main_color }}>
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

                        <div className="flex"
                        style={{color: theme.main_color}}>
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

                        <div className="flex"
                        style={{color: theme.main_color}}>
                            CUDA Signal Resampling <br/>
                        </div>

                        <div className="pt-1 text-sm leading-snug font-normal">
                            Built a signal resampling tool in C++ with the CUDA API to utilize the GPU computation powers.
                        </div>
                    </div>

                    <div className="leading-tight font-medium text-base pt-5 pb-3">

                        <div className="flex" style={{color: theme.main_color}}>
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

