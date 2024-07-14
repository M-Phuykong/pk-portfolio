import React, { useEffect, useRef, useState } from 'react'
import {motion, AnimatePresence} from "framer-motion"

import { GithubFill, LinkedinBoxFill, CircleChevronRightFill } from 'akar-icons'

import { useTheme, Theme } from '../../context/ThemeContext'

// data
import projectsData from '../../data/projects.json'
import experiencesData from '../../data/experiences.json'

// style
import "../../styles/mobileLayout.scss"

interface AccordionProps {
    i: number,
    expanded: false | number,
    setExpanded: React.Dispatch<React.SetStateAction<number | false>>,
    children: React.ReactNode,
    title: string,
}

interface ProjectDataInterface {
    id: number,
    name: string,
    html_url: string,
    description: string,
    language: string
}

interface ExperienceDataInterface {
    company: string,
    position: string,
    period: string,
    details: string[]
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

const ProjectSingle = ({data, icon, theme} : {data : ProjectDataInterface, icon: any, theme: Theme}) => {

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

const ExperienceSingle = ({data, theme} : {data : ExperienceDataInterface, theme: Theme}) => {

        return (
                <div className="pb-5">
                    <div className="leading-tight font-medium text-base text-gray-950">
                        <span style={{
                            color: theme.text_color,
                        }}>
                            {data.position} @ {data.company} <br/>
                        </span>
                        <span className="text-sm" style={{color: theme.main_color}}>
                            {data.period}
                        </span>
                    </div>

                    <ul className="list-disc p-5 pt-2 pb-0 text-sm leading-snug">

                        {data.details.map((detail: string) => (
                            <li>
                                <span className="font-normal">
                                    {detail}
                                </span>
                            </li>
                        ))}

                    </ul>
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
                    A senior at Temple University, PA pursuing a degree in Computer Science. I have a keen interest in Machine Language and Front-End Development.
                </div>
            </Accordion>

            <Accordion title="Experiences"
            i={2} expanded={expanded1} setExpanded={setExpanded1}>

                {
                    experiencesData.map((experience) => (
                        <ExperienceSingle
                        data={experience}
                        theme={theme}/>
                    ))
                }
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

