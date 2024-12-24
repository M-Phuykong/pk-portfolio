import React, { useState } from 'react';
import { motion, AnimatePresence, color} from "framer-motion";
import { Chess } from 'akar-icons';

function ChessButton({isActive, toggleMenu, theme} :
    {isActive: boolean, toggleMenu: () => void, theme : any}) {
    return (
        <div className="absolute top-0 right-0 w-[100px] h-[40px] cursor-pointer rounded-full overflow-hidden">
            <motion.div
                className="relative w-full h-full"
                animate={{top: isActive ? "-100%" : "0%"}}
                transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1]}}
            >
                <div
                    className="group w-full h-full "
                    style={{
                        backgroundColor: theme.main_color,
                        color: theme.text_color
                    }}
                    onClick={() => {toggleMenu()}}>
                    <PerspectiveText label="Chess"/>
                </div>

                <div
                    className="group w-full h-full"
                    style={{
                        backgroundColor: theme.text_color,
                        color: theme.main_color
                    }}
                    onClick={() => {toggleMenu()}}>
                    <PerspectiveText label="Close" />
                </div>
            </motion.div>
        </div>
    )
}

function PerspectiveText({label} : {label: string}) {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full
        transition-transform duration-[750ms] ease-[cubic-bezier(0.76, 0, 0.24, 1)]
        group-hover:rotate-x-90"
        style={{transformStyle: "preserve-3d"}}>
            <p className='m-0 pointer-events-none uppercase transition-all
                duration-[750ms] ease-[cubic-bezier(0.76, 0, 0.24, 1)]
                group-hover:-translate-y-full
                group-hover:opacity-0'>
                {label}
            </p>
            <p className='absolute m-0 pointer-events-none uppercase transition-all
                duration-[750ms] ease-[cubic-bezier(0.76, 0, 0.24, 1)] translate-y-0
                -rotate-x-90 opacity-0
                group-hover:opacity-100'
            style={{transformOrigin: "bottom center"}}>
                {label}
            </p>
        </div>
    )
}

function ChessPlayer({theme}: {theme: any}) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            <ChessButton
            theme={theme}
            isActive={isActive}
            toggleMenu={() => {setIsActive(!isActive)}}/>
        </div>
    );
}

export default ChessPlayer;