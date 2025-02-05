import Image from 'next/image';
import { getMetricImagePath, getMetricUnit } from "../utils/utils";

function Metric({ metricName, value }) {
  return (
    <div className="flex items-center gap-2 flex-col">
      <Image src={getMetricImagePath(metricName)} alt="Metric Image" width={32} height={32} />
      <p className='font-bold text-black'>{value} {getMetricUnit(metricName)}</p>
    </div>
  );
}

export default Metric;