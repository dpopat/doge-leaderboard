import Leaderboard from "./Leaderboard/Leaderboard";

export default function Body() {
  return (
    <main className="flex-1 px-4">
      <div className="max-w-4xl mx-auto border-y-[0.5px] border-black mb-10">
        <div>
          <>November 16th, 2024</>
        </div>
      </div>
      <Leaderboard />
    </main>
  );
}
