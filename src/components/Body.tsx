import Leaderboard from "./Leaderboard/Leaderboard";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

export default function Body() {
  return (
    <main className="flex-1 px-4">
      <VelocityScroll
        text="DEPARTMENT OF GOVERNMENT EFFICIENCY •"
        default_velocity={2}
        className="font-display text-center text-md font-bold tracking-[-0.02em] text-gray-800 drop-shadow-sm dark:text-white md:text-xl md:leading-[1rem]"
      />
      <div className="mt-24 space-y-12">
        {/* <div className="text-center">
          <p className="text-4xl font-semibold">
            $300B Tax Dollars Wasted in 2023
          </p>
        </div> */}
        <Leaderboard />
      </div>
    </main>
  );
}
