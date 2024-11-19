"use client";

import { useState } from "react";
import LeaderboardItem from "./LeaderboardItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShineBorder from "@/components/ui/shine-border";

type SortOption = "votes" | "amount" | "recent";

interface LeaderboardProps {
  items: {
    item_id: number;
    total_votes: number;
    title: string;
    year: number;
    amount: number;
    sources: Array<{
      link: string;
      name: string;
    }>;
  }[];
}

export default function Leaderboard({ items }: LeaderboardProps) {
  const [sortBy, setSortBy] = useState<SortOption>("amount");

  const sortedData = [...items].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.total_votes - a.total_votes;
      case "amount":
        return b.amount - a.amount;
      case "recent":
        return b.item_id- a.item_id;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-4 items-center font-semibold">
        <Select
          value={sortBy}
          onValueChange={(value: SortOption) => setSortBy(value)}
        >
          <SelectTrigger className="w-[180px] border-[0.5px] border-gray-300 bg-white rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-[0.5px] border-gray-600 rounded-none">
            <SelectItem value="votes">Most Votes</SelectItem>
            <SelectItem value="amount">Highest Amount</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ShineBorder borderRadius={0} borderWidth={1.5} color={["#d19e00", "#a67102"]}>
        <div className="rounded-none min-w-full border md:border-2 border-black">
          {sortedData.map((item, index) => (
            <LeaderboardItem
              key={item.item_id}
              {...item}
              rank={index + 1}
              isLast={index === sortedData.length - 1}
            />
          ))}
        </div>
      </ShineBorder>
    </div>
  );
}
