import React from 'react';

const NonCompositedAnimations = ({ data }) => {
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
      <p className="mb-4">CLS Savings: {data?.metricSavings?.CLS} ms</p>

      <h3 className="text-lg font-semibold mt-4">Details</h3>
      <p>No non-composited animations found that can be optimized?.</p>
    </div>
  );
};

export default NonCompositedAnimations;