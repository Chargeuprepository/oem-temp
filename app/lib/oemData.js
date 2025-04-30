import {
  beforeCurrentMonth,
  inCurrentMonth,
} from "@/app/_components/purchaseDateCalc";

export default async function oemData(userName) {
  const res = await fetch("https://temp-oem-data.vercel.app/data.json");
  const drivers = await res.json();
  let ans = drivers.filter(
    (driver) =>
      driver.OEM && driver.OEM.toLowerCase() === userName.toLowerCase()
  );

  // Summary Data
  const summaryData = function () {
    // Card 1
    const card1 = {
      totalBatteries: ans.length,
      newAdd: inCurrentMonth(ans),
      old: beforeCurrentMonth(ans),
    };
    // Card 2
    const card2 = {
      running: ans.filter((driver) => driver.Status === "running").length,
      socGreaterThan20: ans.filter((driver) => +driver.SOC > 20).length,
    };
    // Card 3
    const card3 = {
      idle: ans.filter((driver) => driver.Status === "stopped").length,
      socLesserThan20: ans.filter((driver) => +driver.SOC <= 20).length,
    };
    // Card 4
    const card4 = {
      immobilized: ans.filter((driver) => driver.Status === "immobilized")
        .length,
    };

    return [card1, card2, card3, card4];
  };

  // SOH vs KMs
  const sohVsKm = function () {
    const drivers = ans.filter((driver) => {
      return +driver.SOH > 0 && +driver.Km > 0;
    });
    const frame = drivers.map((driver) => {
      return {
        km: +driver.Km,
        soh: +driver.SOH,
        type:
          +driver.SOH < 70
            ? "#D50000"
            : +driver.SOH >= 70 && +driver.SOH < 80
            ? "#FFD600"
            : "#00C853",
      };
    });

    return frame;
  };
  // RunKms
  const runKms = function () {
    const drivers = ans.filter((driver) => {
      return +driver.kmPerDay > 0;
    });
    console.log(drivers.length);
    const frame = [
      { name: ">80 km/day", value: 0 },
      { name: "40-80 km/day", value: 0 },
      { name: "20-40 km/day", value: 0 },
      { name: "0-20 km/day", value: 0 },
    ];
    drivers.map((driver) => {
      frame.forEach((elem) => {
        const kms = elem.name.split(" ")[0];
        const range = kms.includes(">") ? ["80", "1000"] : kms.split("-");

        if (+driver.kmPerDay > +range[0] && +driver.kmPerDay <= +range[1]) {
          elem.value++;
        }
      });
    });
    return frame;
  };
  // SOC Distribution
  const socDistibution = function () {
    const drivers = ans.filter((driver) => {
      return +driver.SOC > 0;
    });
    const frame = [
      { name: "SOC 10-20%", value: 0 },
      { name: "SOC 5-10%", value: 0 },
      { name: "SOC 0-5%", value: 0 },
    ];

    const filteredSOC = drivers.filter((driver) => +driver.SOC <= 20);

    filteredSOC.map((driver) => {
      frame.forEach((elem) => {
        const range = elem.name.split(" ")[1].split("%")[0].split("-");

        if (+driver.SOC >= +range[0] && +driver.SOC < +range[1]) {
          elem.value++;
        }
      });
    });

    return frame;
  };
  // Energy Delivered
  const energyDelivered = function () {
    const drivers = ans.filter((driver) => {
      return +driver.Km > 0 && +driver["Energy(kwh)"] > 0;
    });
    const frame = drivers.map((driver) => {
      const energyCalc = +driver.Km / +driver["Energy(kwh)"];
      return {
        km: +driver.Km,
        energy: +driver["Energy(kwh)"],
        efficiency:
          energyCalc >= 16
            ? "#00C853"
            : energyCalc >= 12 && energyCalc < 16
            ? "#2962FF"
            : "#FFD600",
      };
    });

    return frame;
  };

  return {
    summaryData: summaryData(),
    sohVsKm: sohVsKm(),
    runKms: runKms(),
    socDistibution: socDistibution(),
    energyDelivered: energyDelivered(),
  };
}
