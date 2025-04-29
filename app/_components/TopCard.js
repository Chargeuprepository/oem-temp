import { FaCarBattery } from "react-icons/fa";

export default function TopCard({
  value1 = 2000,
  value2 = 1000,
  value3 = 1000,
  head1,
  head2,
  head3,
  linec1,
  linec2,
  iconc1,
  iconc2,
}) {
  const totalCount = value2 + value3;
  const newPercentage = (value2 / totalCount) * 100;
  const oldPercentage = 100 - newPercentage;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between w-full max-w-80">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500">{head1}</p>
          <p className="text-l font-semibold text-gray-700">{value1}</p>
        </div>
        <div className={`${iconc2} p-2 rounded-lg`}>
          <FaCarBattery className={`${iconc1} text-2xl`} />
        </div>
      </div>

      {/* Horizontal Line Graph */}
      <div className="relative mt-6 h-1 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`absolute h-full ${linec1}`}
          style={{ width: `${newPercentage}%` }}
        />
        <div
          className={`absolute h-full right-0 ${linec2}`}
          style={{ width: `${oldPercentage}%` }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs mt-3 text-gray-600">
        <div>
          <p className="text-gray-400">{head2}</p>
          <p className="font-semibold ">{value2}</p>
        </div>
        <div>
          <p className="text-gray-400 text-right">{head3}</p>
          <p className="font-semibold text-right">{value3}</p>
        </div>
      </div>
    </div>
  );
}
