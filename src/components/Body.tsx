import Leaderboard from "./Leaderboard/Leaderboard";
import NumberTicker from "@/components/ui/number-ticker";

export default function Body() {
  return (
    <section className="flex-1 px-4">
      <div className="mt-32 space-y-10 max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-7xl font-semibold">
            $<NumberTicker value={300} className="tracking-tight"/>M
          </p>
          <p className="text-lg font-medium">Tax Dollars Wasted in 2023</p>
        </div>
        <div className="flex justify-center text-lg font-semibold text-gray-800 max-w-5xl mx-auto w-full">
          <button
            className="w-1/2 rounded-none border-2 border-r-0 px-3 py-3 bg-gray-800 text-white"
            aria-label="View Hall of Shame"
            aria-pressed="true"
          >
            Hall Of Shame: Squanderers
          </button>
          <button
            className="w-1/2 rounded-none border-2 px-3 py-3 bg-gray-100 text-gray-400 border-l-0 cursor-not-allowed"
            aria-label="View Hall of Fame"
            aria-pressed="false"
            disabled
          >
            Hall Of Fame: American Heroes
          </button>
        </div>
        <Leaderboard />
      </div>
    </section>
  );
}
