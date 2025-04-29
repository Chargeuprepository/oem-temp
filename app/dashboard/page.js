import { cookies } from "next/headers";
import TopCard from "../_components/TopCard";
import SOHVsKmChart from "../_components/SOHVsKmChart";
import DonutChartWithKMSegments from "../_components/DonutChartWithKMSegments";
import EnergyEfficiencyBubbleChart from "../_components/EnergyEfficiencyBubbleChart";
import DonutChartSOC from "../_components/DonutChartSOC";
import { redirect } from "next/navigation";
import Link from "next/link";
import Spinner from "./loading";
import oemData from "../lib/oemData";

export const metadata = {
  title: `OEM Dashboard`,
  description: "Learn more about our mission and team",
};

export default async function Page() {
  // This gives you all cookies for the request
  const cookieStore = cookies();
  const userData = cookieStore.get("userData")?.value;
  const userName = userData && userData.split("@")[0];
  if (!userData) redirect("/");

  // Get the OEM data
  const data = await oemData(userName);
  // console.log(data);

  const summary = data.summaryData;
  const soh = data.sohVsKm;
  const runKm = data.runKms;
  const soc = data.socDistibution;
  const energy = data.energyDelivered;

  return (
    <div>
      <header className="flex justify-between items-center py-4 px-20 bg-[#003445] text-white w-full top-0 left-0 z-10">
        <img src="/logo-white.png" className="h-15 w-40" />

        <div className="flex items-center gap-4">
          <div className="text-sm capitalize">{userName}</div>
          {/* <button className="px-4 py-2 text-sm bg-[#00953c] text-white rounded-lg hover:bg-[#007f2b]">
            Logout
          </button> */}
        </div>
      </header>

      <div className="flex justify-between my-8 mx-14">
        <TopCard
          head1={"Total Batteries"}
          head2={"Newly Added"}
          head3={"Old Batteries"}
          value1={summary[0].totalBatteries}
          value2={summary[0].newAdd}
          value3={summary[0].old}
          linec1={"bg-yellow-500"}
          linec2={"bg-yellow-200"}
          iconc1={"text-yellow-500"}
          iconc2={"bg-yellow-100"}
        ></TopCard>
        <TopCard
          head1={"Running Batteries"}
          head2={"SOC > 20%"}
          head3={"idle"}
          value1={summary[1].running}
          value2={summary[1].socGreaterThan20}
          value3={""}
          linec1={"bg-green-500"}
          linec2={"bg-green-100"}
          iconc1={"text-green-500"}
          iconc2={"bg-green-100"}
        ></TopCard>
        <TopCard
          head1={"Idle"}
          head2={"SOC < 20%"}
          head3={"Under Maintenance"}
          value1={summary[2].idle}
          value2={summary[2].socLesserThan20}
          value3={""}
          linec1={"bg-orange-500"}
          linec2={"bg-orange-100"}
          iconc1={"text-orange-500"}
          iconc2={"bg-orange-100"}
        ></TopCard>
        <TopCard
          head1={"Immobilized"}
          head2={"SOC < 20%"}
          head3={"Under Maintenance"}
          value1={summary[3].immobilized}
          value2={""}
          value3={""}
          linec1={"bg-blue-500"}
          linec2={"bg-blue-100"}
          iconc1={"text-blue-500"}
          iconc2={"bg-blue-100"}
        ></TopCard>
      </div>

      <div className="grid grid-cols-2 gap-10 mx-14 my-10">
        <SOHVsKmChart soh={soh}></SOHVsKmChart>
        <DonutChartWithKMSegments runKm={runKm}></DonutChartWithKMSegments>
      </div>
      <div className="grid grid-cols-2 gap-10 mx-14 my-10">
        <DonutChartSOC soc={soc}></DonutChartSOC>
        <EnergyEfficiencyBubbleChart
          energy={energy}
        ></EnergyEfficiencyBubbleChart>
      </div>
    </div>
  );
}
