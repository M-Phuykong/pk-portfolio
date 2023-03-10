import React, { useEffect, useRef } from 'react'
import {motion, AnimatePresence, usePresence, color} from "framer-motion"
import { gsap } from 'gsap'

import { CircleChevronRightFill } from 'akar-icons'


interface AccordionProps {
    children: React.ReactNode,
    title: string
}

const Accordion = ({ children, title } : AccordionProps) => {

    const [isExpanded, setExpanded] = React.useState<boolean>(false);

    const accordionVariants = {
        collapsed: {
            height: "4rem",
            transition: {
                duration: 1.2,
                ease: [0.04, 0.62, 0.23, 0.98]
            }
        },
        expanded: {
            height : "auto",
            transition: {
                duration: 1.2,
                ease: [0.04, 0.62, 0.23, 0.98]
            }

        },
    };

    const contentVariants = {
        show: {
            opacity: 1,
            transition: {
            duration: 0.8,
            ease: [0.83, 0, 0.17, 1]
            }
        },
        hidden: {
            opacity: 0,
            transition: {
            duration: 1.2,
            ease: [0.83, 0, 0.17, 1]
            }
        }
    }

    return(
        <>
            <AnimatePresence  >
                <motion.section
                    key="header"
                    variants={accordionVariants}

                    initial = "collapsed"
                    animate = { isExpanded ? "expanded" : "collapsed"}
                    exit= "collapsed"

                    onClick={() => {setExpanded(!isExpanded)}}
                    className="mb-5 px-5 relative rounded-2xl bg-white
                    leading-[4rem] text-2xl font-semibold overlay"
                >
                    <div className="flex justify-between items-center">
                        {title}
                        <motion.span
                        key = "button"
                        animate = { {
                            rotate: isExpanded ? 90 : 0
                        }}
                        transition={ { duration : 0.3}}
                        >
                            <CircleChevronRightFill strokeWidth={2} size={32}
                            id="label_button"
                            />
                        </motion.span>
                    </div>

                    { isExpanded && (
                            <motion.div
                            key="content"
                            variants={contentVariants}
                            initial = "hidden"
                            animate = "show"
                            exit = "hidden"
                            className="text-base leading-relaxed pb-3"
                            >
                                <motion.hr
                                variants={contentVariants}
                                initial = "hidden"
                                animate = "show"
                                exit = "hidden"
                                className="m-0 mb-3 w-full h-[2px]"></motion.hr>
                                {children}
                            </motion.div>
                    )}
                </motion.section>
            </AnimatePresence>
        </>
    );
};


export const PhoneAccordion = () => {

    return (
        <div className='p-5 pt-0'>
            <Accordion title="About Me">
                A sophomore at Temple University, PA pursuing a degree in Computer Science.
                I have a keen interest in Machine Language and Front-End Development.
            </Accordion>
            <Accordion title="Experience">
                <div>
                    <div className="leading-tight font-bold">
                        Software Developer @ NEDC <br/>
                        <span className="font-medium">
                            Aug 2021 - Present
                        </span>
                    </div>

                    <ul className="list-disc p-5 pt-2">
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
            </Accordion>
            <Accordion title="Projects">
                <div className="pb-3">
                    <div className="leading-tight font-bold">
                        E-Commerce Store <br/>

                        <div className="font-semibold pt-2">
                            A full-stack online store using Vue JS Framework utilizing MongoDB as the database. Created a REST
                            API with Express JS that simplified data retrieval and update from and to the database.
                        </div>
                    </div>

                    <div className="leading-tight font-bold pt-5">
                        Synthboard <br/>

                        <div className="font-semibold pt-2">
                            Developed a website that utilizes Spotify REST API and React Framework to display the user’s top tracks and
                            artists that allow the user to customize their date range with a twist of physics rendering and 90s inspired
                            theme. I started this project as I wanted to be comfortable with REST API, React Framework and interactive
                            user experience.
                        </div>
                    </div>

                    <div className="leading-tight font-bold pt-5">
                        CUDA Signal Resampling <br/>

                        <div className="font-semibold pt-2">
                            Built a signal resampling tool in C++ with the CUDA API to utilize the GPU computation powers. By using
                            parallel reduction and multithreading,
                        </div>
                    </div>
                </div>
            </Accordion>
        </div>
    )
};

