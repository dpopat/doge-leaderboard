import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";

interface LeaderboardItemProps {
  id: number;
  votes: number;
  title: string;
  year: string;
  amount: number;
  rank: number;
  isLast?: boolean;
}

export default function LeaderboardItem({ id, votes, title, year, amount, rank, isLast }: LeaderboardItemProps) {
  return (
    <Card className={`flex items-center justify-between p-3 rounded-none hover:bg-accent ${!isLast ? 'border-b-[0.5px] border-b-black' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center text-gray-600">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <ChevronUp className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{votes}</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">#{rank} • {year}</p>
        </div>
      </div>
      <div className="text-xl font-bold">
        ${amount.toLocaleString()}M
      </div>
    </Card>
  );
} 