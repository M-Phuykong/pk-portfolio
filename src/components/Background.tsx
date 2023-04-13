import * as React from "react";

import * as PIXI from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import { createNoise2D } from "simplex-noise";
import hslToHex from "hsl-to-hex";
import { debounce } from "debounce";

import { useTheme } from "../context/ThemeContext";

interface BackgroundProps {
    children: React.ReactNode
}

const Background : React.FC<BackgroundProps> = ({children} : BackgroundProps) => {

    const noise2D = createNoise2D();
    const canvasRef = React.useRef<HTMLCanvasElement>();

    const {darkMode, setDarkMode} = useTheme();

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


    class Orb  {
        bounds: { x: { min: number , max: number},y: { min: number, max: number} };
        x: number;
        y: number;
        scale : number;
        fill: string;
        radius: number;
        xOff: number;
        yOff: number
        inc: number;
        graphics: PIXI.Graphics;

        constructor(fill = "0x000000"){

            this.bounds = this.setBounds();

            // init the ob's {x, y} values to a random position
            this.x = random(this.bounds.x.min, this.bounds.x.max);
            this.y = random(this.bounds.y.min, this.bounds.y.max);

             // how large the orb is vs it's original radius (this will modulate over time)
            this.scale = 1;

            this.fill = fill.toString();

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


    class ColorPalette {
        baseColor = "";
        complimentaryColor1 = "";
        complimentaryColor2 = "";

        hue = 0;
        complimentaryHue1 = 0;
        complimentaryHue2 = 0;

        saturation = 0;
        lightness = 0;

        colorChoices : Array<string>= [];

        constructor(){
            this.setColors();
            this.setCustomProperties();
        }

        setColors() {
            // pick a random hue somewhere between 220 and 360
            this.hue = ~~random(220, 360)
            this.complimentaryHue1 = this.hue + 30;
            this.complimentaryHue2 = this.hue + 60;

            // define a fixed saturation and lightness
            this.saturation = 95;
            this.lightness = 50;

            // define a base color
            this.baseColor = hslToHex(this.hue, this.saturation, this.lightness);
            this.complimentaryColor1 = hslToHex(this.complimentaryHue1,
                                                this.saturation,
                                                this.lightness);
            this.complimentaryColor2 = hslToHex(this.complimentaryHue2,
                                                this.saturation,
                                                this.lightness);

            this.colorChoices = [this.baseColor, this.complimentaryColor1, this.complimentaryColor2]
        }

        randomColor() {
            // pick a random color
            return this.colorChoices[~~random(0, this.colorChoices.length)].replace(
                '#',
                '0x'
            );
        }

        setCustomProperties() {
            // set CSS custom properties so that the colors defined here can be used throughout the UI
            document.documentElement.style.setProperty('--hue', this.hue.toString());
            document.documentElement.style.setProperty(
                '--hue-complimentary1',
                this.complimentaryHue1.toString()
            );
            document.documentElement.style.setProperty(
                '--hue-complimentary2',
                this.complimentaryHue2.toString()
            )

            // let backgroundColor = "white";
            // if (darkMode){
            //     backgroundColor = hslToHex(0,0,10);
            // }

            // document.documentElement.style.setProperty('--base-color', backgroundColor);
        }
    }


    React.useEffect(() => {

        const colorPalette = new ColorPalette();

        const app = new PIXI.Application({
            view: canvasRef.current,
            // backgroundColor: 0XFFFFFF,
            backgroundAlpha: 0,
            // auto adjust size to fit the current window
            resizeTo: window,
            antialias: true,
        });
        app.stage.filters = [new KawaseBlurFilter(30, 10, true)]

        const orbs : Orb[] = [];

        for (let i = 0; i < 10; i++) {
            const orb = new Orb(colorPalette.randomColor());

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
        <div className="bg-transparent items-center">
            <canvas ref={canvasRef} className="fixed w-full h-fit">
            </canvas>
            {children}
        </div>
    );
}

export default Background;