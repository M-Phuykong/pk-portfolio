import React, { useEffect, useRef, useState } from 'react'
import {motion, AnimatePresence, usePresence, color, LayoutGroup} from "framer-motion"

import { GithubFill, LinkedinBoxFill, File, CircleChevronRightFill } from 'akar-icons'

import { useTheme, Theme } from '../../context/ThemeContext'

// Data
import projectsData from '../../data/projects.json'

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
            borderColor: theme.text_color,
        }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className='h-[4rem] mb-5 px-5 relative
                leading-[4rem] text-xl font-bold
                rounded-[10px]
                border border-solid
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

const ProjectSingle = ({data, icon, theme} : {data : any, icon: any, theme: Theme}) => {

    return (
        <div className="leading-tight font-medium text-base my-5">
            <div className="flex" style={{ color: theme.main_color }}>
                {data.name} <br />
                <a className='w-fit' href={data.html_url} target="_blank" onClick={(e) => e.stopPropagation()}>
                    {icon}
                </a>
            </div>

            <div className="pt-1 text-sm leading-snug font-normal">
                {data.description}
            </div>
        </div>
        )
}

export const PhoneAccordion = () => {

    const [expanded, setExpanded] = useState<false | number>(1);
    const [expanded1, setExpanded1] = useState<false | number>(false);
    const [expanded2, setExpanded2] = useState<false | number>(false);
    const [expanded3, setExpanded3] = useState<false | number>(false);
    const { theme, updateTheme } = useTheme();

    return (

        <div className={'p-5 pt-0 ' + (expanded2 ? "pb-3" : "")}>

            <Accordion title="About Me"
            i={1} expanded={expanded} setExpanded={setExpanded}>
                <div className="pb-5 text-sm font-normal leading-snug">
                    A junior at Temple University, PA pursuing a degree in Computer Science. I have a keen interest in Machine Language and Front-End Development.
                </div>
            </Accordion>

            <Accordion title="Experiences"
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
                    {
                        projectsData.map((project) => (

                            <ProjectSingle
                            data={project}
                            icon= {
                            <GithubFill strokeWidth={2} size={20} className="ml-2"/>
                            }
                            theme={theme}/>
                        ))
                    }
                </div>
            </Accordion>

            <Accordion title="Publications"
            i={4} expanded={expanded3} setExpanded={setExpanded3}>
                <div className="pb-5">
                    <div className="pt-1 text-sm leading-snug font-normal">
                        Thai, B., McNicholas, S., Shalamzari, S. S., Meng, P., & Picone, J. (2023). Towards a More Extensible Machine Learning Demonstration Tool. Proceedings of the IEEE Signal Processing in Medicine and Biology Symposium, 1–4.
                    </div>
                </div>
            </Accordion>
        </div>
    )
};

