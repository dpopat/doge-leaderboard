import ShineBorder from "@/components/ui/shine-border";

export default function Header() {
  return (
    <header className="w-full bg-white border-b-2 border-gray-500">
      <div className="p-4">
        <h1 className="text-2xl font-bold">DOGELeaderboard</h1>
      </div>
      <ShineBorder borderRadius={0} borderWidth={0.75} color={["#d19e00", "#a67102"]}>
        <></>
      </ShineBorder>
    </header>
  );
}
