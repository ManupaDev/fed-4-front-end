import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import DataCard from "./components/DataCard";
import DataChart from "./components/DataChart";
import { useUser } from "@clerk/clerk-react";

const DashboardPage = () => {
  const { user } = useUser();

  const solarUnitId = "68f4f2cef076449e2049b9c1";

  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">{user?.firstName}'s House</h1>
      <p className="text-gray-600 mt-2">
        Welcome back to your Solar Energy Production Dashboard
      </p>
      <div className="mt-8">
        <DataCard
          solarUnitId={solarUnitId}
          title="Last 7 Days Energy Production"
        />
      </div>
      <div className="mt-8">
        <DataChart solarUnitId={solarUnitId} />
      </div>
    </main>
  );
};

export default DashboardPage;
