import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addVote, removeVote } from "@/components/Leaderboard/actions";
import { useState, useEffect } from "react";
import { CoolMode } from "../ui/cool-mode";

type VoteState = "up" | "down" | null;

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
  const [optimisticVotesCount, setOptimisticVotesCount] = useState(total_votes);
  const [userVoteState, setUserVoteState] = useState<VoteState>(null);

  useEffect(() => {
    const savedVote = localStorage.getItem(`vote-${item_id}`);
    if (savedVote) {
      setUserVoteState(savedVote as VoteState);
    }
  }, [item_id]);

  const handleVoteError = () => {
    setOptimisticVotesCount(optimisticVotesCount);
    setUserVoteState(userVoteState);
    if (userVoteState) {
      localStorage.setItem(`vote-${item_id}`, userVoteState);
    } else {
      localStorage.removeItem(`vote-${item_id}`);
    }
  };

  const handleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpvoteLoading(true);
    
    try {
      if (userVoteState === "up") {
        // Remove upvote
        setOptimisticVotesCount(optimisticVotesCount - 1);
        setUserVoteState(null);
        localStorage.removeItem(`vote-${item_id}`);
        await removeVote(item_id, true);
      } else {
        // Add upvote
        const voteChange = userVoteState === "down" ? 2 : 1;
        setOptimisticVotesCount(optimisticVotesCount + voteChange);
        setUserVoteState("up");
        localStorage.setItem(`vote-${item_id}`, "up");
        await addVote(item_id, true);
      }
    } catch (error) {
      // Revert to previous state
      console.log("Handle upvote error", error);
      handleVoteError();
    } finally {
      setIsUpvoteLoading(false);
    }
  };

  const handleDownvote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownvoteLoading(true);
    
    try {
      if (userVoteState === "down") {
        // Remove downvote
        setOptimisticVotesCount(optimisticVotesCount + 1);
        setUserVoteState(null);
        localStorage.removeItem(`vote-${item_id}`);
        await removeVote(item_id, false);
      } else {
        // Add downvote
        const voteChange = userVoteState === "up" ? 2 : 1;
        setOptimisticVotesCount(optimisticVotesCount - voteChange);
        setUserVoteState("down");
        localStorage.setItem(`vote-${item_id}`, "down");
        await addVote(item_id, false);
      }
    } catch (error) {
      // Revert to previous state
      console.log("Handle downvote error", error);
      handleVoteError();
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
          <div className="flex items-center justify-between p-2 md:p-3 hover:bg-accent cursor-pointer">
            <div className="w-14 md:w-24 flex-shrink-0 font-semibold text-sm md:text-xl flex items-center justify-center">
              ${formatAmount(amount)}
            </div>
            <div className="flex-grow pl-2">
              <h3 className="text-sm md:text-lg font-semibold leading-tight">
                {title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                #{rank} • {year}
              </p>
            </div>
            <div className="flex flex-col items-center text-gray-600 w-8 flex-shrink-0">
              <CoolMode
                options={{
                  particle: "/doge-black.png",
                }}
                enabled={userVoteState !== "up"}
              >
                <button
                  type="button"
                  className={`flex items-center justify-center h-5 w-6 md:h-6 md:w-7 rounded-md hover:bg-gray-200 ${
                    userVoteState === "up" ? "text-green-600" : ""
                  }`}
                  onClick={handleUpvote}
                  disabled={isUpvoteLoading}
                  aria-label="Upvote"
                >
                  <ChevronUp
                    className={`h-4 w-4 md:h-5 md:w-5 ${
                      isUpvoteLoading ? "opacity-50" : ""
                    }`}
                  />
                </button>
              </CoolMode>
              <span className="text-xs md:text-sm font-medium min-w-[0.5rem] text-center">
                {optimisticVotesCount}
              </span>
              <button
                type="button"
                className={`flex items-center justify-center h-5 w-6 md:h-6 md:w-7 rounded-md hover:bg-gray-200 ${
                  userVoteState === "down" ? "text-red-600" : ""
                }`}
                onClick={handleDownvote}
                disabled={isDownvoteLoading}
                aria-label="Downvote"
              >
                <ChevronDown
                  className={`h-4 w-4 md:h-5 md:w-5 ${
                    isDownvoteLoading ? "opacity-50" : ""
                  }`}
                />
              </button>
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
