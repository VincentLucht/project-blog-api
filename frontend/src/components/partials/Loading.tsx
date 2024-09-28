import { useState, useEffect } from 'react';

function Loading() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        switch (prevDots) {
          case '':
            return '.';
          case '.':
            return '..';
          case '..':
            return '...';
          default:
            return '';
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="df">
      <div className="text-2xl font-bold">Loading{dots}</div>
    </div>
  );
}

export default Loading;
