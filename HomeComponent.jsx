import React, { useState, useEffect } from "react";
import "../Sass/HomeComponent.scss";
import PostStatus from "./common/PostUpdate";
import "../Sass/homebtn.scss";

export default function HomeComponent({ currentUser }) {
  const [showSquare, setShowSquare] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ top: 50, left: 50 });
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (showGame) {
      const interval = setInterval(() => {
        setObstacles((prev) => [
          ...prev,
          { left: 100, top: Math.random() * 90 },
        ]);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showGame]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameOver) {
        setPlayerPosition((prev) => {
          let newPosition = { ...prev };
          if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") newPosition.top = Math.max(0, prev.top - 5);
          if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") newPosition.top = Math.min(90, prev.top + 5);
          if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") newPosition.left = Math.max(0, prev.left - 5);
          if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") newPosition.left = Math.min(90, prev.left + 5);
          return newPosition;
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver]);

  useEffect(() => {
    const checkCollision = () => {
      for (let obstacle of obstacles) {
        if (
          playerPosition.left < obstacle.left + 5 &&
          playerPosition.left + 5 > obstacle.left &&
          playerPosition.top < obstacle.top + 5 &&
          playerPosition.top + 5 > obstacle.top
        ) {
          setGameOver(true);
          setShowGame(false);
          alert("Game Over!");
          break;
        }
      }
    };

    const moveObstacles = () => {
      setObstacles((prev) =>
        prev.map((obstacle) => ({ ...obstacle, left: obstacle.left - 1 }))
      );
    };

    if (showGame) {
      const interval = setInterval(() => {
        moveObstacles();
        checkCollision();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [showGame, playerPosition, obstacles]);

  const toggleSquareVisibility = () => {
    setShowSquare(!showSquare);
  };

  const handleShowRules = () => {
    setShowRules(!showRules);
  };

  const startGame = () => {
    setShowGame(true);
    setGameOver(false);
    setPlayerPosition({ top: 50, left: 50 });
    setObstacles([]);
  };

  return (
    <div className="home-component">
      <PostStatus currentUser={currentUser} />
      <div className="right-side1">
        <div className="suggestions">
          <h5>A few things that might interest you before...</h5>
          <div className="advertisement">
            <button className="btn" onClick={toggleSquareVisibility}>
              A game to pass the time
            </button>
            {showSquare && (
              <div className="square-container">
                <div className="square">
                  <button className="start-game-btn" onClick={startGame}>
                    Start the game .... so you don't get bored anymore
                  </button>
                </div>
              </div>
            )}
            {showGame && (
              <div className="square-container">
                <div className="square">
                  <div className="locker-tag">Locker: characters (money) [money]</div>
                  <div className="lobby-tag1">Lobby:</div>
                  <button className="close-btn" onClick={() => setShowGame(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          {showGame && (
            <div className="game-container">
              <div className="game-area">
                <div
                  className="player"
                  style={{
                    top: `${playerPosition.top}%`,
                    left: `${playerPosition.left}%`,
                  }}
                />
                {obstacles.map((obstacle, index) => (
                  <div
                    key={index}
                    className="obstacle"
                    style={{
                      top: `${obstacle.top}%`,
                      left: `${obstacle.left}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="right-side2">
        <button className="view-rules-btn" onClick={handleShowRules}>
          View the rules of the application
        </button>
        {showRules && (
          <div className="rules-container">
            <h3>Application Rules</h3>
            <ol>
              <li>Respect all users and avoid offensive language.</li>
              <li>No spamming or irrelevant self-promotion.</li>
              <li>Do not share personal information without consent.</li>
              <li>Report any suspicious or harmful activities.</li>
              <li>Follow all applicable laws and community guidelines.</li>
              <li>Respect privacy and avoid posting private content.</li>
              <li>Engage in constructive and positive discussions.</li>
              <li>Do not create multiple accounts to mislead others.</li>
              <li>Ensure the authenticity of shared information.</li>
              <li>Report bugs and issues to help improve the platform.</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
