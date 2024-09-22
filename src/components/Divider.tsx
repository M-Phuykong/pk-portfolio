import React, { useEffect, useRef, useState } from 'react'


function Divider({ theme } : {theme : any}) {

    const path = useRef<SVGPathElement>(null);
    let progress = 0;
    let x = 0.5;
    let time = Math.PI / 2;
    let reqId:  null | number = null;


    useEffect(() => {
        setPath(progress);
    }, [])

    const setPath = (progress: number) => {
        const width = window.innerWidth * 0.7;
        path.current?.setAttributeNS(null, "d", `M 0 50 Q${width * x} ${50 + progress}, ${width} 50`)
    }
    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

    const manageMouseEnter = () => {
        if(reqId){
            cancelAnimationFrame(reqId)
            resetAnimation()
        }
    }

    const manageMouseMove = (e: React.MouseEvent) => {
        const { movementY, clientX } = e;
        const pathBound =  path.current?.getBoundingClientRect();

        if (!pathBound) return;

        x = (clientX - pathBound.left) / pathBound.width;
        progress+= movementY
        setPath(progress);
    }

    const manageMouseLeave = () => {
        animateOut();
    }
    const animateOut = () => {
        const newProgress = progress * Math.sin(time);

        progress = lerp(progress, 0, 0.025);
        time+=0.2;
        setPath(newProgress);

        if(Math.abs(progress) > 0.75){
            reqId = requestAnimationFrame(animateOut);
        }
        else{
            resetAnimation();
        }
    }

    const resetAnimation = () => {
        time = Math.PI / 2;
        progress = 0;
    }

    console.log(theme)

    return (

        <div className="
        h-px relative w-full mb-[20px]
        ">
            <span
            className="
            h-[40px] w-full flex relative -top-[20px]
            hover:h-[150px] hover:-top-[75px] z-10
            "
            onMouseEnter={() => {manageMouseEnter()}}
            onMouseMove={(e) => {manageMouseMove(e)}}
            onMouseLeave={() => {manageMouseLeave()}}
            ></span>
            <svg className='absolute w-full -top-[50px]' >
                <path
                fill='none'
                stroke={theme.text_color}
                className='stroke-[3px]' ref={path}></path>
            </svg>
        </div>

    );
}

export default Divider;