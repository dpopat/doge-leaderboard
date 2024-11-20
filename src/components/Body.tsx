import Leaderboard from "./Leaderboard/Leaderboard";
import supabase from "@/utils/supabase/client";
import TaxDollarsDisplay from "@/components/TaxDollarsDisplay";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const revalidate = 600; // Revalidate every 10 minutes (600 seconds)

export default async function Body() {
  const { data, error } = await supabase.from("items_with_total_votes").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  const items = data || [];

  return (
    <section className="flex-1 px-4">
      <div className="mt-32 space-y-10 max-w-4xl mx-auto">
        <div className="flex justify-center">
          <TaxDollarsDisplay value={300} />
        </div>
        <div className="flex justify-center text-sm md:text-lg font-semibold text-gray-800 max-w-5xl mx-auto w-full">
          <button
            className="w-1/2 rounded-none border-2 border-r-0 px-3 py-3 bg-gray-800 text-white"
            aria-label="View Hall of Shame"
            aria-pressed="true"
          >
            Hall Of Shame: Squanderers
          </button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-1/2 rounded-none border-2 border-l-0 px-3 py-3 bg-gray-100 text-gray-400"
                  aria-label="View Hall of Fame"
                  aria-pressed="false"
                  disabled
                >
                  Hall Of Fame: American Heroes
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Coming Soon!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Leaderboard items={items} />
      </div>
    </section>
  );
}
