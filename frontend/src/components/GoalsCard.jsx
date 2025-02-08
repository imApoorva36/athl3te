"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Flame, MapPin, MonitorIcon as Running } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"


export default function GoalCard({ type, metricData = {}, color }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState(null)



  const handleMetricClick = (metric) => {
    if (selectedMetric === metric) {
      setSelectedMetric(null)
      setIsExpanded(false)
    } else {
      setSelectedMetric(metric)
      setIsExpanded(true)
    }
  }

  return (
    <div className="">
      <motion.div
        className="overflow-hidden"
        animate={{ height: isExpanded ? "auto" : "200px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Running className="w-5 h-5" />
              <span className="font-medium text-gray-800">{type} Goals</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <button
              onClick={() => handleMetricClick("distance")}
              className={`flex flex-col items-center gap-1 p-4 rounded-2xl transition-colors ${
                selectedMetric === "distance" ? `${color} text-white` : "hover:bg-gray-50"
              }`}
            >
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="font-semibold">50 km</span>
              <span className={`text-sm ${selectedMetric === "distance" ? "text-white" : "text-gray-500"}`}>
                Distance
              </span>
            </button>
            <button
              onClick={() => handleMetricClick("calories")}
              className={`flex flex-col items-center gap-1 p-4 rounded-2xl transition-colors ${
                selectedMetric === "calories" ? `${color} text-white` : "hover:bg-gray-50"
              }`}
            >
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <span className="font-semibold">100 kcal</span>
              <span className={`text-sm ${selectedMetric === "calories" ? "text-white" : "text-gray-500"}`}>
                Calories
              </span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Running className="w-4 h-4 text-blue-500" />4 days to go!
              </span>
              <span className="text-gray-500">3 / 7 days done</span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full w-[43%] ${color} rounded-full`} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && selectedMetric && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="px-6 pb-6"
            >
              <table className="w-full mb-6">
                <thead>
                  <tr className="text-sm text-gray-500">
                    <th className="font-normal pb-2">
                      <Running className="w-4 h-4 inline" />
                    </th>
                    <th className="font-normal pb-2">Achieved</th>
                    <th className="font-normal pb-2">Target</th>
                    <th className="font-normal pb-2">%</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {metricData[selectedMetric]?.map((day, index) => (
                    <tr key={index}>
                      <td className="py-2">Day {index + 1}</td>
                      <td className="py-2 text-center">{day.achieved}</td>
                      <td className="py-2 text-center">{day.target}</td>
                      <td className="py-2 text-center">{day.percentage} %</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

