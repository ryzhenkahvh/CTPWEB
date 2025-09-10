import logo from './logo.png';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
    const [showGame, setShowGame] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const startGame = () => {
        setShowGame(true);
    };

    const restartGame = () => {
        setShowGame(false);
        setTimeout(() => setShowGame(true), 100);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const allowedKeys = ['w', 'a', 's', 'd', 'W', 'A', 'S', 'D'];
            const harmfulCombos = [
                { ctrl: true, key: 'u' }, // View source
                { ctrl: true, key: 's' }, // Save
                { ctrl: true, key: 'p' }, // Print
                { ctrl: true, key: 'a' }, // Select all
                { ctrl: true, key: 'c' }, // Copy
                { ctrl: true, key: 'v' }, // Paste
                { ctrl: true, key: 'x' }, // Cut
                { ctrl: true, key: 'z' }, // Undo
                { ctrl: true, key: 'y' }, // Redo
                { ctrl: true, key: 'f' }, // Find
                { ctrl: true, key: 'h' }, // History
                { ctrl: true, key: 'j' }, // Downloads
                { ctrl: true, key: 'k' }, // Bookmarks
                { ctrl: true, key: 'l' }, // Address bar
                { ctrl: true, key: 'n' }, // New window
                { ctrl: true, key: 'o' }, // Open
                { ctrl: true, key: 'r' }, // Refresh
                { ctrl: true, key: 't' }, // New tab
                { ctrl: true, key: 'w' }, // Close tab
                { ctrl: true, key: 'q' }, // Quit
                { ctrl: true, shift: true, key: 'i' }, // Dev tools
                { ctrl: true, shift: true, key: 'j' }, // Console
                { ctrl: true, shift: true, key: 'c' }, // Inspect
                { ctrl: true, shift: true, key: 'k' }, // Clear console
                { alt: true, key: 'f4' }, // Close window
                { key: 'f12' }, // Dev tools
                { key: 'f11' }, // Fullscreen
                { key: 'escape' }, // Escape
            ];

            const isHarmful = harmfulCombos.some(combo => {
                if (combo.ctrl && !e.ctrlKey) return false;
                if (combo.alt && !e.altKey) return false;
                if (combo.shift && !e.shiftKey) return false;
                if (combo.key && e.key.toLowerCase() !== combo.key) return false;
                return true;
            });

            if (isHarmful && !allowedKeys.includes(e.key)) {
                e.preventDefault();
                setShowModal(true);
                setTimeout(() => setShowModal(false), 3000);
            }
        };

        const handleContextMenu = (e) => {
            e.preventDefault();
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
        };

        const handleCopy = (e) => {
            e.preventDefault();
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
        };

        const handleSelect = (e) => {
            e.preventDefault();
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('copy', handleCopy);
        window.addEventListener('selectstart', handleSelect);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('copy', handleCopy);
            window.removeEventListener('selectstart', handleSelect);
        };
    }, []);

    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        img src = { logo }
        className = "App-logo"
        alt = "logo" / >
        <
        h1 onClick = { restartGame }
        style = {
            { cursor: 'pointer' } } > ryzhenkahvh < /h1> {
            !showGame && ( <
                button className = "neon-button"
                onClick = { startGame } >
                Играть <
                /button>
            )
        } { showGame && < SnakeGame / > } <
        /header> {
            showModal && ( <
                div className = "modal" >
                <
                div className = "modal-content" >
                <
                h2 > Запрещено! < /h2> <
                p > Это действие запрещено на этом сайте. < /p> <
                /div> <
                /div>
            )
        } <
        /div>
    );
}

function SnakeGame() {
    const [snake, setSnake] = useState([
        [10, 10]
    ]);
    const [food, setFood] = useState([5, 5]);
    const [direction, setDirection] = useState([0, -1]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key.toLowerCase()) {
                case 'w':
                    setDirection([0, -1]);
                    break;
                case 's':
                    setDirection([0, 1]);
                    break;
                case 'a':
                    setDirection([-1, 0]);
                    break;
                case 'd':
                    setDirection([1, 0]);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const newSnake = [...prevSnake];
                const head = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]];
                newSnake.unshift(head);
                if (head[0] === food[0] && head[1] === food[1]) {
                    setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
                } else {
                    newSnake.pop();
                }
                if (head[0] < 0 || head[0] >= 20 || head[1] < 0 || head[1] >= 20 || newSnake.slice(1).some(segment => segment[0] === head[0] && segment[1] === head[1])) {
                    setGameOver(true);
                }
                return newSnake;
            });
        }, 200);
        return () => clearInterval(interval);
    }, [direction, food, gameOver]);

    const grid = [];
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            let className = 'cell';
            if (snake.some(segment => segment[0] === j && segment[1] === i)) {
                className += ' snake';
            }
            if (food[0] === j && food[1] === i) {
                className += ' food';
            }
            grid.push( < div key = { `${i}-${j}` }
                className = { className } > < /div>);
            }
        }

        return ( <
            div className = "game-container" >
            <
            div className = "grid" > { grid } <
            /div> {
                gameOver && < div className = "game-over" > Game Over < /div>} <
                    /div>
            );
        }

        export default App;