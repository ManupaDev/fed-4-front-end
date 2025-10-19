import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import DataCard from "./components/DataCard";

const DashboardPage = () => {
  const { data, isLoading, isError, error } =
    useGetEnergyGenerationRecordsBySolarUnitQuery({
      id: "68f4f2cef076449e2049b9c1",
      groupBy: "date",
    });

  if (isError || !data) return null;

  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>
      <div className="mt-8">
        <DataCard 
          data={data} 
          isLoading={isLoading} 
          isError={isError}
          error={error}
          title="Last 7 Days Energy Production" 
        />
      </div>
    </main>
  );
};

export default DashboardPage;
