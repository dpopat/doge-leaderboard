import Leaderboard from "./Leaderboard/Leaderboard";
import NumberTicker from "@/components/ui/number-ticker";
import supabase from "@/utils/supabase/client";

export default async function Body() {
  const { data, error } = await supabase.from("items_with_total_votes").select();

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  const items = data || [];

  return (
    <section className="flex-1 px-4">
      <div className="mt-32 space-y-10 max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-5xl md:text-7xl font-semibold">
            $<NumberTicker value={300} className="tracking-tight"/>M
          </p>
          <p className="text-sm md:text-lg font-medium text-muted-foreground">Tax Dollars Wasted in 2023</p>
        </div>
        <div className="flex justify-center text-sm md:text-lg font-semibold text-gray-800 max-w-5xl mx-auto w-full">
          <button
            className="w-1/2 rounded-none border-2 border-r-0 px-3 py-3 bg-gray-800 text-white"
            aria-label="View Hall of Shame"
            aria-pressed="true"
          >
            Hall Of Shame: Squanderers
          </button>
          <button
            className="w-1/2 rounded-none border-2 border-l-0 px-3 py-3 bg-gray-100 text-gray-400  cursor-not-allowed"
            aria-label="View Hall of Fame"
            aria-pressed="false"
            disabled
          >
            Hall Of Fame: American Heroes
          </button>
        </div>
        <Leaderboard items={items} />
      </div>
    </section>
  );
}
