import React, { useEffect, useRef } from 'react'
import {motion, AnimatePresence, usePresence} from "framer-motion"
import { gsap } from 'gsap'

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
                    {title}

                    { isExpanded && (
                            <motion.div
                            key="content"
                            variants={contentVariants}
                            initial = "hidden"
                            animate = "show"
                            exit = "hidden"
                            className="text-base leading-relaxed pb-3"
                            >
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
                this is a child #2
            </Accordion>
        </div>
    )
};

