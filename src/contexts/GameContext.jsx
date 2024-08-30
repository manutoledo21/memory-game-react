import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setTime(0);
  };

  return (
    <GameContext.Provider value={{ time, setTime, isActive, handleStart, handleStop, handleReset }}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};