import Image from 'next/image';
import { getActivityImagePath } from "../utils/utils";
import Metric from "./Metric";
import LayeredCard from "./LayeredCard";

function ActivityCard({ activity }) {
  return (
    <>
      <LayeredCard>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src={getActivityImagePath(activity.activityType)}
              alt="Activity Image"
              width={40}
              height={40}
            />
            <h1 className="text-xl font-bold text-black">{activity.title}</h1>
          </div>
          <Image src="/ai.png" alt="Activity Image" width={40} height={40} />
        </div>

        <div className="flex flex-row justify-between mt-8 mb-2 gap-12">
          {activity.distance && <Metric metricName="distance" value={activity.distance} />}
          {activity.time && <Metric metricName="time" value={activity.time} />}
          {activity.speed && <Metric metricName="speed" value={activity.speed} />}
          {activity.heartRate && <Metric metricName="heart_rate" value={activity.heartRate} />}
          {activity.elevationGain && <Metric metricName="elevation_gain" value={activity.elevationGain} />}
          {activity.cadence && <Metric metricName="cadence" value={activity.cadence} />}
        </div>
      </LayeredCard>
    </>

  );
}

export default ActivityCard;
