import { useState, useEffect } from 'react';

interface ShowFormErrorProps {
  error: string;
}

function ShowFormError({ error }: ShowFormErrorProps) {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setShowError(true), 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowError(false), 300);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!error) return null;

  return (
    <div
      className={`mt-[-20px] pl-6 text-left text-sm text-red-500 transition-all duration-300 ease-in-out
        clamp-sm ${showError ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div>{error}</div>
    </div>
  );
}

export default ShowFormError;
