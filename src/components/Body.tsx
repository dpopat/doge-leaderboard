import Leaderboard from "./Leaderboard/Leaderboard";
import supabase from "@/utils/supabase/client";
import TaxDollarsDisplay from "@/components/TaxDollarsDisplay";
import HallToggle from "@/components/HallToggle";

export default async function Body() {
  const { data, error } = await supabase.from("items_with_total_votes").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  const items = data || [];

  return (
    <section className="flex-1 px-4">
      <div className="my-32 space-y-10 max-w-4xl mx-auto">
        <div className="flex justify-center">
          <TaxDollarsDisplay value={236} />
        </div>
        <HallToggle />
        <Leaderboard items={items} />
      </div>
    </section>
  );
}
