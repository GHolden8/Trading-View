import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StockExaminer() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'REACTPlayground/stockbase/src/stockGraph.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the StockExaminer Page!</h1>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default StockExaminer;
