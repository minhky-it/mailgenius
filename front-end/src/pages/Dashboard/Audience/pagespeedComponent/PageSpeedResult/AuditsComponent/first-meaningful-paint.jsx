import React from 'react';

const FirstMeaningfulPaint = ({ data }) => {
  const { title, description, score, scoreDisplayMode } = data;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      {score !== null ? (
        <p className="font-semibold">Score: {score * 100} </p>
      ) : (
        <p className="font-semibold">Score: {scoreDisplayMode}</p>
      )}
    </div>
  );
};

export default FirstMeaningfulPaint;