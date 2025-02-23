"use client";
import Image from "next/image";
import { useState } from "react";
import Metric from "./Metric";
import { getActivityImagePath } from "../utils/utils";

export default function GoalCard({ type, data = {}, isNew }) {
  console.log(type, data);

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const metrics = ["distance", "calories", "duration", "speed"];
  const metricIcons = {
    distance: <Image src="/metrics/distance.png" width={24} height={24} alt="distance" />,
    calories: <Image src="/metrics/heart_rate.png" width={24} height={24} alt="calories" />,
    duration: <Image src="/metrics/time.png" width={24} height={24} alt="duration" />,
    speed: <Image src="/metrics/speed.png" width={24} height={24} alt="speed" />,
  };

  const [goalAdded, setGoalAdded] = useState(false);

  const handleAddGoal = () => {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push({ type, data });
    localStorage.setItem("goals", JSON.stringify(goals));
    setGoalAdded(true);
  };

  // Filter metrics that are available
  const availableMetrics = metrics.filter(metric => data[metric] !== null && data[metric] !== undefined);
  const gridCols = `grid-cols-${availableMetrics.length}`;

  return (
      <div className="flex flex-col gap-4 items-center justify-center">
        {/* Header */}
        <div className="w-full flex flex-row">
          <Image src={getActivityImagePath(type)} width={28} height={28} alt="icon" />
          <span className="font-bold text-lg text-gray-800 ml-2">{type.toUpperCase()} Goals</span>
        </div>

        {/* Metrics Grid */}
        <div className={`grid ${gridCols} gap-4 w-full mt-4 mb-2`}>
          {availableMetrics.map(metric => (
            <div key={metric} className="flex flex-col items-center gap-2">
              <Metric metricName={metric} value={data[metric]}></Metric>
            </div>
          ))}
        </div>

        {/* Add Goal Button */}
        {isNew && (
          <button 
            className="bg-primary text-white px-4 py-2 rounded-lg" 
            onClick={handleAddGoal} 
            disabled={goalAdded}
          >
            {goalAdded ? "Goal Added" : "Add Goal"}
          </button>
        )}
      </div>
  );
}
