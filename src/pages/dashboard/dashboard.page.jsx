import { Card } from "@/components/ui/card";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { format, toDate } from "date-fns";

const DashboardPage = () => {
  const { data, isLoading, isError, error } =
    useGetEnergyGenerationRecordsBySolarUnitQuery({
      id: "68f4f2cef076449e2049b9c1",
      groupBy: "date",
    });

  if (isLoading) return null;
  if (isError || !data) return null;

  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>
      <div className="mt-8">
        <Card className="rounded-md p-4">
          <h2 className="text-xl font-medium text-foreground">
            Last 7 Days Energy Production
          </h2>
          <div className="grid grid-cols-7 gap-4 mt-4">
            {data.slice(0, 7).map((el) => {
              return (
                <div
                  key={el._id.date}
                  className="col-span-1 px-2 py-1 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-xs text-gray-500 font-medium ">
                      {format(toDate(el._id.date), "MMM d")}
                    </h3>
                    <p className="text-lg font-bold text-foreground">
                      {el.totalEnergy} kWh
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default DashboardPage;
