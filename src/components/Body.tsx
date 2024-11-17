import Leaderboard from "./Leaderboard/Leaderboard";

export default function Body() {
  return (
    <main className="flex-1 px-4">
      <div className="mt-24 space-y-12">
        {/* <div className="flex justify-center text-lg font-semibold text-gray-800 gap-4">
          <button
            className="w-96 rounded-none border-2 px-3 py-3 transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="View Hall of Shame"
          >
            Hall Of Shame: Squanderers
          </button>
          <button
            className="w-96 rounded-none border-2 px-3 py-3 transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="View Hall of Fame"
          >
            Hall Of Fame: American Heroes
          </button>
        </div> */}
        <Leaderboard />
      </div>
    </main>
  );
}

{
  /* <div className="text-center">
          <p className="text-4xl font-semibold">
            $300B Tax Dollars Wasted in 2023
          </p>
        </div> */
}
