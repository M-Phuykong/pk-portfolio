import React from 'react'
import {motion, AnimatePresence} from "framer-motion"


interface AccordionProps {
    i: number,
    expanded: false | number,
    setExpanded: React.Dispatch<React.SetStateAction<number | false>>,
    children: React.ReactNode,
    title: string
}

const Accordion = ({ i, expanded, setExpanded, children, title } : AccordionProps) => {

    const isOpen = i === expanded;

    return(
        <>
            <motion.header
                initial = {false}
                animate = {{
                }}
                exit={{ marginBottom: 0}}
                onClick={() => {setExpanded(isOpen ? false : i)}}
                className="h-16 mb-5 px-5 relative rounded-2xl bg-white
                leading-[4rem] text-2xl font-semibold overlay"
            >
                {title}
            </motion.header>
            <AnimatePresence initial={false}>
                { isOpen && (
                    <motion.section
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { opacity: 1, height: "auto", marginBottom: 15},
                        collapsed: { opacity: 0, height: 0, marginBottom: 0},
                    }}
                    transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className='rounded-2xl bg-white'>
                        {children}
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
};


export const PhoneAccordion = () => {

    const [expanded, setExpanded] = React.useState<false | number>(0);
    const [expanded1, setExpanded1] = React.useState<false | number>(0);

    return (
        <div className='p-5 pt-0'>
            <Accordion title="About Me" i = {0} expanded = {expanded} setExpanded={setExpanded}>
                <motion.div className='p-5 '>
                    A sophomore at Temple University, PA pursuing a degree in Computer Science.
                    I have a keen interest in Machine Language and Front-End Development.
                </motion.div>
            </Accordion>
            <Accordion title="Experience" i = {1} expanded = {expanded1} setExpanded={setExpanded1}>
                <motion.div>
                    this is a child #2
                </motion.div>
            </Accordion>
        </div>
    )

};

