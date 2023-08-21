import { useState, useEffect } from 'react';

export interface screenDimensions {
  screenWidth: number;
  screenHeight: number;
}

const useScreenDimensions = (): screenDimensions => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []);

  return {
    screenWidth,
    screenHeight,
  };
};

export default useScreenDimensions;
