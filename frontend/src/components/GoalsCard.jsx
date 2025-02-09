import Image from "next/image";

export default function GoalCard({ type, data = {} }) {

  console.log(type, data)

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const metrics = ["distance", "calories", "duration", "speed"];
  const metricIcons = {
    distance: <Image src="/metrics/distance.png" width={24} height={24} />,
    calories: <Image src="/metrics/heart_rate.png" width={24} height={24} />,
    duration: <Image src="/metrics/time.png" width={24} height={24} />,
    speed: <Image src="/metrics/speed.png" width={24} height={24} />,
  };

  return (
    <div className="">
      <div className="items-center justify-center flex flex-col gap-4">
        <div className="">
          {/* Header */}
          <div className="flex items-center justify-between mb-6"></div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">{type.toUpperCase()} Goals</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4">
          {metrics.map(metric => (
            data[metric] !== null && (
              <div key={metric} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center mb-2">
                  {metricIcons[metric]}
                </div>
                <span className="text-sm">{data[metric] ?? "N/A"}</span>
                <span className="text-xs capitalize">{metric}</span>
              </div>
            )
          ))}
        </div>


      </div>
    </div>
  )
}
