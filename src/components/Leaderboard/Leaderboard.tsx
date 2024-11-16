'use client'

import { useState } from 'react';
import LeaderboardItem from './LeaderboardItem';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const MOCK_DATA = [
  {
    id: 203,
    votes: 1234,
    title: "Dr. Fauci's Transgender Monkey Study",
    year: "2023",
    amount: 20.7,
  },
  {
    id: 204,
    votes: 2500,
    title: "Construction of a Luxury Spa with COVID Relief Funds",
    year: "2023",
    amount: 15.3,
  },
  {
    id: 205,
    votes: 890,
    title: "Maintaining Empty Federal Buildings",
    year: "2024",
    amount: 45.2,
  },
  {
    id: 206,
    votes: 1750,
    title: "Overpriced Infrastructure Project",
    year: "2024",
    amount: 32.8,
  },
  {
    id: 207,
    votes: 3100,
    title: "Study on Running Shrimp on Treadmills",
    year: "2023",
    amount: 12.6,
  },
  {
    id: 208,
    votes: 2100,
    title: "Research on Pizza Cheese Consistency",
    year: "2023",
    amount: 28.4,
  },
  {
    id: 209,
    votes: 1680,
    title: "Unused Software License Renewals",
    year: "2024",
    amount: 56.2,
  },
  {
    id: 210,
    votes: 2800,
    title: "Studying the Impact of Cocaine on Quail Behavior",
    year: "2024",
    amount: 19.3,
  },
  {
    id: 211,
    votes: 1950,
    title: "Luxury Office Furniture for Remote Workers",
    year: "2024",
    amount: 42.1,
  },
  {
    id: 212,
    votes: 2300,
    title: "Research on How Long Fish Can Exercise",
    year: "2023",
    amount: 23.7,
  },
  {
    id: 213,
    votes: 1450,
    title: "Study on Why Coffee Spills When Walking",
    year: "2024",
    amount: 17.8,
  },
  {
    id: 214,
    votes: 2650,
    title: "Analyzing the Effect of Music on Plants",
    year: "2023",
    amount: 31.5,
  },
  {
    id: 215,
    votes: 1890,
    title: "Research on Gambling Habits of Monkeys",
    year: "2024",
    amount: 38.9,
  },
  {
    id: 216,
    votes: 2200,
    title: "Study on the Social Life of Dust Bunnies",
    year: "2023",
    amount: 25.4,
  },
  {
    id: 217,
    votes: 1560,
    title: "Analysis of Synchronized Whale Swimming",
    year: "2024",
    amount: 49.6,
  },
  {
    id: 218,
    votes: 2750,
    title: "Research on Why Woodpeckers Don't Get Headaches",
    year: "2023",
    amount: 34.2,
  },
  {
    id: 219,
    votes: 1670,
    title: "Study on the Dating Habits of Sea Slugs",
    year: "2024",
    amount: 27.8,
  },
  {
    id: 220,
    votes: 2400,
    title: "Analysis of Penguin Walking Patterns",
    year: "2023",
    amount: 22.9,
  },
  {
    id: 221,
    votes: 1840,
    title: "Research on How Dogs React to Human Music",
    year: "2024",
    amount: 36.4,
  },
  {
    id: 222,
    votes: 2150,
    title: "Study on the Sleep Patterns of Fruit Flies",
    year: "2023",
    amount: 29.5,
  }
];

type SortOption = 'votes' | 'amount' | 'recent';

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<SortOption>('votes');

  const sortedData = [...MOCK_DATA].sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.votes - a.votes;
      case 'amount':
        return b.amount - a.amount;
      case 'recent':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-4 items-center">
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger className="w-[180px] border-[0.5px] border-gray-600 bg-white rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-[0.5px] border-gray-600 rounded-none">
            <SelectItem value="votes">Most Votes</SelectItem>
            <SelectItem value="amount">Highest Amount</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border-[0.5px] border-gray-600 rounded-none">
        {sortedData.map((item, index) => (
          <LeaderboardItem 
            key={item.id} 
            {...item} 
            rank={index + 1}
            isLast={index === sortedData.length - 1}
          />
        ))}
      </div>
    </div>
  );
} 