import React from 'react'
import {motion, AnimatePresence} from "framer-motion"




const Accordion = ({ i, expanded, setExpanded }) => {

    const isOpen = i === expanded;

    return(
        <>
            <motion.header
                initial = {false}
                animate = {{ backgroundColor: isOpen ? "#FF0088" : "#0055FF"}}
                onClick={() => {setExpanded(isOpen ? false : i)}}
                className='h-10 mb-5 relative'
            />
            <AnimatePresence initial={false}>
                { isOpen && (
                    <motion.section
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { opacity: 1, height: "auto"},
                        collapsed: { opacity: 0, height: 0}
                    }}
                    transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
                        This is a place holder
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
};


export const PhoneAccordion = () => {

    const [expanded, setExpanded] = React.useState<false | number>(0);

    return accordionIds.map((i) => (
        <Accordion i={i} key={i} expanded={expanded} setExpanded={setExpanded} />
    ));
};

const accordionIds = [0, 1];
