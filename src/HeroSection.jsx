import imgWindTurbine from "./assets/wind-turbine.png";

export default function HeroSection() {
  return (
    <section className="bg-white">
      {/* Navigation Bar */}
      <nav className="flex flex-wrap items-center justify-between py-6">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 sm:h-12 sm:w-12">
            <Wind className="h-5 w-5 text-black sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Solar Energy
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 sm:h-12 sm:w-12">
            <Sailboat className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Home Dashboard
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 sm:h-12 sm:w-12">
            <Triangle className="h-5 w-5 fill-current text-black sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Real-Time Monitoring
          </span>
        </div>

        <div className="hidden flex-col items-center gap-2 sm:flex sm:flex-row sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 sm:h-12 sm:w-12">
            <Shield className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
          <span className="text-center text-xs font-medium text-gray-900 sm:text-left sm:text-sm">
            Anomaly Detection
          </span>
        </div>
      </nav>
    </section>
  );
}
