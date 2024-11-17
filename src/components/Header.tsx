import ShineBorder from "@/components/ui/shine-border";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-500">
      <div className="p-4">
        <h1 className="font-bold text-2xl">DOGELeaderboard</h1>
      </div>
      <ShineBorder borderRadius={0} borderWidth={0.5} color={["#d19e00", "#a67102"]}>
        <></>
      </ShineBorder>
    </header>
  );
}
