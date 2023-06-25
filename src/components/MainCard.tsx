import React from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'


import { CardGroup } from './CardGroup'
import self_photo from "../images/self_photo.jpg"


export function MainCard() {

    const cardRef = React.useRef<THREE.Mesh>(null);
    const mainCardRef = React.useRef<HTMLDivElement>(null);


    useFrame((state, delta) =>{
        // cardRef.current!.rotation.x += delta
    })

    return (
        <>
            <Html

            transform
            castShadow
            receiveShadow

            className="w-full h-full"
            >
                <div

                id = "main_card"
                ref = {mainCardRef}
                className="
                relative
                w-full
                h-full
                grid grid-rows-5

                rounded-[10px] bg-[#ffffff8c] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[20px]
                ">

                    <img src={self_photo}
                    draggable={false}
                    alt="Phuykong_Meng_photo"
                    id="self_photo"
                    className="
                    noselect
                    absolute
                    -top-[6rem]
                    left-[2rem]
                    h-2/5
                    w-auto
                    border border-solid border-white border-8
                    shadow-xl
                    rounded-full" />

                    <div className="
                    noselect
                    mt-5 2xl:mt-10
                    ml-[15rem] 2xl:ml-[20rem]
                    ">
                        <h1 className='will-change-transform text-3xl lg:text-5xl 2xl:text-6xl'> Hello, I'm Phuykong Meng.</h1>
                    </div>

                    <CardGroup mainParent = {mainCardRef}></CardGroup>

                </div>
            </Html>
        </>
    )
}