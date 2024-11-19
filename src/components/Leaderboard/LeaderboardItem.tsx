import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sendVote } from "./actions";
import { useState } from "react";

interface LeaderboardItemProps {
  item_id: number;
  total_votes: number;
  title: string;
  year: number;
  amount: number;
  rank: number;
  sources: Array<{
    link: string;
    name: string;
  }>;
  isLast?: boolean;
}

const formatAmount = (amount: number): string => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
};

export default function LeaderboardItem({
  item_id,
  total_votes,
  title,
  year,
  amount,
  rank,
  isLast,
  sources,
}: LeaderboardItemProps) {
  const [isUpvoteLoading, setIsUpvoteLoading] = useState(false);
  const [isDownvoteLoading, setIsDownvoteLoading] = useState(false);
  const [optimisticVotes, setOptimisticVotes] = useState(total_votes);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsUpvoteLoading(true);
    try {
      setOptimisticVotes(optimisticVotes + 1);
      await sendVote(item_id, true);
    } catch (error) {
      setOptimisticVotes(optimisticVotes);
    } finally {
      setIsUpvoteLoading(false);
    }
  };

  const handleDownvote = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsDownvoteLoading(true);
    try {
      setOptimisticVotes(optimisticVotes - 1);
      await sendVote(item_id, false);
    } catch (error) {
      setOptimisticVotes(optimisticVotes);
    } finally {
      setIsDownvoteLoading(false);
    }
  };

  return (
    <Card
      className={`rounded-none ${
        !isLast ? "border-b-[0.5px] border-b-black" : ""
      }`}
    >
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer">
            <div className="flex items-center gap-3">
              {/* Vote Buttons */}
              <div className="flex flex-col items-center text-gray-600 w-8">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 md:h-6 md:w-6 hover:bg-gray-200"
                  onClick={handleUpvote}
                  disabled={isUpvoteLoading}
                  aria-label="Upvote"
                >
                  <ChevronUp
                    className={`h-3 w-3 md:h-4 md:w-4 ${
                      isUpvoteLoading ? "opacity-50" : ""
                    }`}
                  />
                </Button>
                <span className="text-xs md:text-sm font-medium min-w-[0.5rem] text-center">
                  {optimisticVotes}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 md:h-6 md:w-6 hover:bg-gray-200"
                  onClick={handleDownvote}
                  disabled={isDownvoteLoading}
                  aria-label="Downvote"
                >
                  <ChevronDown
                    className={`h-3 w-3 md:h-4 md:w-4 ${
                      isDownvoteLoading ? "opacity-50" : ""
                    }`}
                  />
                </Button>
              </div>
              <div className="pr-1">
                <h3 className="text-sm md:text-lg font-semibold leading-tight">
                  {title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  #{rank} • {year}
                </p>
              </div>
            </div>
            <div className="text-md md:text-xl font-semibold">
              ${formatAmount(amount)}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold">Sources</h4>
            <ul className="list-disc pl-4 space-y-1.5">
              {sources?.map((source, index) => (
                <li key={`${source.name}-${index}`}>
                  <a
                    href={source.link}
                    className="text-sm text-blue-500 hover:underline inline-flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.name}
                    <span className="inline-block translate-y-[1px]">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </Card>
  );
}
