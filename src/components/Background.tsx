import * as React from "react";

import * as PIXI from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import { createNoise2D } from "simplex-noise";
import hslToHex from "hsl-to-hex";
import { debounce } from "debounce";

interface BackgroundProps {
    children: React.ReactNode
}

const Background : React.FC<BackgroundProps> = ({children} : BackgroundProps) => {

    // return a random number within a range
    //
    function random(min: number, max: number){
        return Math.random() * (max - min) + min;
    }

    // map takes a number from one range and maps it to another.
    //
    // For example, if a number (0.5) usually exists in a
    // range between 0 - 1 and we map it to a range of 0 - 100,
    // the number becomes 50.
    //
    function map(n: number, start1 : number, end1 : number, start2: number, end2 : number) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
    }


    const noise2D = createNoise2D()



    interface Bound {
        x: { min: number , max: number},
        y: { min: number, max: number}
    }

    class Orb  {
        bounds: Bound;
        x: number;
        y: number;
        scale : number;
        fill: number;
        radius: number;
        xOff: number;
        yOff: number
        inc: number;
        graphics: PIXI.Graphics;


        constructor(fill = 0x000000){

            this.bounds = this.setBounds();

            // init the ob's {x, y} values to a random position
            this.x = random(this.bounds.x.min, this.bounds.x.max);
            this.y = random(this.bounds.y.min, this.bounds.y.max);

             // how large the orb is vs it's original radius (this will modulate over time)
            this.scale = 1;

            this.fill = fill;

            // the original radius of the orb, set relative to window height
            this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

            // starting points in "time" for the noise/self similar random values
            this.xOff = random(0, 1000);
            this.yOff = random(0, 1000);
            // how quickly the noise/self similar random values step through time
            this.inc = 0.002;

            // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
            this.graphics = new PIXI.Graphics();
            this.graphics.alpha = 0.825

            window.addEventListener(
                'resize',
                debounce(() => {
                    this.bounds = this.setBounds();
                }, 250)
            );
        };

        setBounds(){
            // how far from the { x, y } origin can each orb move
            const maxDist =
            window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;

            // the { x, y } origin for each orb (the bottom right of the screen)
            const originX = window.innerWidth / 1.25;
            const originY =
                window.innerWidth < 1000
                ? window.innerHeight
                : window.innerHeight / 1.375;

            return {
                x: {
                    min: originX - maxDist,
                    max: originX + maxDist
                    },
                y: {
                    min: originY - maxDist,
                    max: originY + maxDist
                }
            }
        }

        update() {

            // self similar "psuedo-random" or noise values at a given point in "time"
            const xNoise = noise2D(this.xOff, this.xOff);
            const yNoise = noise2D(this.yOff, this.yOff);
            const scaleNoise = noise2D(this.xOff, this.yOff);
            // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
            this.x = map(xNoise, -1, 1, this.bounds.x.min, this.bounds.x.max);
            this.y = map(yNoise, -1, 1, this.bounds.y.min, this.bounds.y.max);

            // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
            this.scale = map(scaleNoise, -1, 1, 0.5, 1);

            // step through "time"
            this.xOff += this.inc;
            this.yOff += this.inc;
        }

        render() {
            // update the PIXI.Graphics position and scale values
            this.graphics.x = this.x;
            this.graphics.y = this.y;
            this.graphics.scale.set(this.scale);

            // clear anything currently drawn to graphics
            this.graphics.clear();

            // tell graphics to fill any shapes drawn after this with the orb's fill color
            this.graphics.beginFill(this.fill);
            // draw a circle at { 0, 0 } with it's size set by this.radius
            this.graphics.drawCircle(0, 0, this.radius);
            // let graphics know we won't be filling in any more shapes
            this.graphics.endFill();
        }

    }

    const canvasRef = React.useRef<HTMLCanvasElement>();
    const app = new PIXI.Application({
        background : "white",
        view: canvasRef.current,
        // auto adjust size to fit the current window
        resizeTo: window,
        // transparent background, we will be creating a gradient background later using CSS
        // transparent: true,
    });

    React.useEffect(() => {

        const orbs : Orb[] = [];

        for (let i = 0; i < 10; i++) {
            // each orb will be black, just for now
            const orb = new Orb(0x000000);
            app.stage.addChild(orb.graphics);

            orbs.push(orb);
        }

        // Animate!
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        app.ticker.add(() => {
            orbs.forEach((orb) => {
            orb.update();
            orb.render();
            });
        });
        } else {
        orbs.forEach((orb) => {
            orb.update();
            orb.render();
        });
        }


    }, []);



    return (
        <div>

            <canvas ref={canvasRef}>
            </canvas>
                {/* {children} */}

        </div>
    );
}

export default Background;