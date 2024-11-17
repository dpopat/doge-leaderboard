import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card className={`rounded-none ${!isLast ? 'border-b-[0.5px] border-b-black' : ''}`}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center text-gray-600" onClick={handleVoteClick}>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-200">
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{votes}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-200">
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
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold">Source</h4>
            <p className="text-sm text-muted-foreground">
              This data was collected from official government spending reports
            </p>
            <a 
              href="#" 
              className="text-sm text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Official Report →
            </a>
          </div>
        </PopoverContent>
      </Popover>
    </Card>
  );
} 