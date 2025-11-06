import React, { useState } from "react";

const FactText = ({ fact, trueFact, loading, ...rest }) => {
  const [reveal, setReveal] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => {
          setReveal(true);
        }}
        onMouseLeave={() => {
          setReveal(false);
        }}
        {...rest}
        className={`relative smooth-slow caveat text-4xl ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <p
          className={`smooth h-full z-20 ${
            reveal ? "opacity-0" : "opacity-100"
          }`}
        >
          {fact}
        </p>
        <p
          className={`absolute left-0 smooth h-full z-10 top-0 caveat ${
            !reveal ? "opacity-0" : "opacity-75"
          }`}
        >
          {trueFact}
        </p>
      </div>
    </>
  );
};

export default FactText;
