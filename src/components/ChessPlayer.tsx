import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, color} from "framer-motion";
// import { Chess } from 'akar-icons';
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

import type { Square } from "chess.js";

const menu = {
    open: {
        width: "500px",
        height: "800px",
        top: "-10px",
        right: "-200px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
    },
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
    }
}


function ChessButton({isActive, toggleMenu, theme} :
    {isActive: boolean, toggleMenu: () => void, theme : any}) {
    return (
        <div className="absolute top-0 right-0 w-[100px] h-[40px] cursor-pointer rounded-full
        z-20 overflow-hidden">
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
        <div className=" flex flex-col justify-center items-center h-full w-full
        transition-transform duration-[750ms] ease-[cubic-bezier(0.76, 0, 0.24, 1)]
        transform-style-3d transform
        group-hover:rotate-x-90 ">
            <p className='transform m-0 pointer-events-none uppercase transition-all
                duration-[750ms] ease-[cubic-bezier(0.76, 0, 0.24, 1)]
                group-hover:-translate-y-full
                group-hover:opacity-0'>
                {label}
            </p>
            <p className='transform absolute m-0 pointer-events-none uppercase transition-all
                duration-[750ms] ease-[cubic-bezier(0.76, 0, 0.24, 1)] translate-y-0
                -rotate-x-90 opacity-0 origin-center
                group-hover:opacity-100'>
                {label}
            </p>
        </div>
    )
}

function Board() {

    const [game, setGame] = useState(new Chess());
    const [gamePosition, setGamePosition] = useState(game.fen());
    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState<Square | null>(null);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});

    function safeGameMutate(modify: any) {
        setGame(g => {
            const update = {
                ...g
            };
            modify(update);
            return update;
        });
    }

    function getMoveOptions(square : any) {
        const moves = game.moves({
            square,
            verbose: true
        });
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }
        const newSquares = {};
        moves.map(move => {
            newSquares[move.to] = {
                background: game.get(move.to) && game.get(move.to).color !== game.get(square).color ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%"
            };
            return move;
        });

        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)"
        };
        setOptionSquares(newSquares);
        return true;
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();

        // exit if the game is over
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        safeGameMutate(game => {
            game.move(possibleMoves[randomIndex]);
        });
    }

    function onSquareClick(square) {
        setRightClickedSquares({});

        // from square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) setMoveFrom(square);
            return;
        }

        // to square
        if (!moveTo) {
            // check if valid move before showing dialog
            const moves = game.moves({
                moveFrom,
                verbose: true
            });
            const foundMove = moves.find(m => m.from === moveFrom && m.to === square);
            // not a valid move
            if (!foundMove) {
                // check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square);
                // if new piece, setMoveFrom, otherwise clear moveFrom
                setMoveFrom(hasMoveOptions ? square : "");
                return;
            }

            // valid move
            setMoveTo(square);

            // if promotion move
            if (foundMove.color === "w" && foundMove.piece === "p" && square[1] === "8" || foundMove.color === "b" && foundMove.piece === "p" && square[1] === "1") {
                setShowPromotionDialog(true);
                return;
            }

            // is normal move
            const gameCopy = {
                ...game
            };
            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: "q"
            });

            // if invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }
            setGame(gameCopy);
            setTimeout(makeRandomMove, 300);
            setMoveFrom("");
            setMoveTo(null);
            setOptionSquares({});
            return;

        }
    }

    function onPromotionPieceSelect(piece) {
        // if no piece passed then user has cancelled dialog, don't make move and reset
        if (piece) {
        const gameCopy = {
            ...game
        };
        gameCopy.move({
            from: moveFrom,
            to: moveTo,
            promotion: piece[1].toLowerCase() ?? "q"
        });
        setGame(gameCopy);
        setTimeout(makeRandomMove, 300);
        }
        setMoveFrom("");
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});
        return true;
    }

    function onSquareRightClick(square) {
        const colour = "rgba(0, 0, 255, 0.4)";
        setRightClickedSquares({
        ...rightClickedSquares,
        [square]: rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour ? undefined : {
            backgroundColor: colour
        }
        });
    }
    return (
        <div className='flex flex-col pt-20 p-10 h-full box-border'>
            <div className='flex flex-col text-white'>
                <Chessboard animationDuration={200}
                position={gamePosition}
                arePremovesAllowed={true}
                // isDraggablePiece={({ piece }) => piece[0] === "w"}
                onSquareClick={onSquareClick}
                onSquareRightClick={onSquareRightClick}
                onPromotionPieceSelect={onPromotionPieceSelect}
                customBoardStyle={{
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
                    }} customSquareStyles={{
                    ...moveSquares,
                    ...optionSquares,
                    ...rightClickedSquares
                    }}
                promotionToSquare={moveTo}
                showPromotionDialog={showPromotionDialog} />

                <button onClick={() => {
                    console.log("reset");
                    game.reset();
                    setGamePosition(game.fen());
                    }}>
                        New game
                </button>
            </div>

        </div>
    )
}


function ChessPlayer({theme}: {theme: any}) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className='absolute top-[21px] right-1/2'>
            <motion.div
                className="w-[480px] h-[650px] relative rounded-[25px] z-10"
                style={{backgroundColor: theme.main_color}}
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>
                    {isActive && <Board />}
                </AnimatePresence>
            </motion.div>
            <ChessButton
                theme={theme}
                isActive={isActive}
                toggleMenu={() => {setIsActive(!isActive)}}/>
        </div>
    );
}

export default ChessPlayer;