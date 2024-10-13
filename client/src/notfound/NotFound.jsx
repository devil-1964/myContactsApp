import React, { useEffect } from 'react';
import { PowerGlitch } from 'powerglitch';

const NotFound = () => {
  useEffect(() => {
    PowerGlitch.glitch('.glitch', {
      playMode: 'always',
      createContainers: true,
      hideOverflow: true,
      timing: {
        duration: 2000,
      },
      glitchTimeSpan: {
        start: 0.5,
        end: 0.7,
      },
      shake: {
        velocity: 15,
        amplitudeX: 0.2,
        amplitudeY: 0.2,
      },
      slice: {
        count: 6,
        velocity: 15,
        minHeight: 0.02,
        maxHeight: 0.18,
        hueRotate: true,
      },
      pulse: false,
    });
  }, []);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://img.icons8.com/color-pixels/64/mushroom.png")',
          opacity: 0.7,
          zIndex: 0,
        }}
      ></div>

      <div className="flex justify-center items-center relative h-screen">
        <div
          className="glitch text-zinc-200 w-fit my-auto absolute h-fit inset-0 m-auto text-9xl font-extrabold"
           style={{
            fontFamily: "'Roboto Mono', monospace",
            fontStyle: 'italic',
            textShadow: `
              2px 2px 0px #e80000, 
              -2px -2px 0px #0c0cf2, 
              4px 4px 0px #e80000, 
              -4px -4px 0px #0c0cf2`,
            letterSpacing: '4px',
            zIndex: 1,
          }}
        >
          404
        </div>
      </div>
    </>
  );
};

export default NotFound;
