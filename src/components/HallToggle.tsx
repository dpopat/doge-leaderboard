"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState, useEffect } from "react"

const HallToggle = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    if (isPopoverOpen) {
      const timer = setTimeout(() => {
        setIsPopoverOpen(false)
      }, 750)

      return () => clearTimeout(timer)
    }
  }, [isPopoverOpen])

  return (
    <div className="flex justify-center text-sm md:text-lg font-semibold text-gray-800 max-w-5xl mx-auto w-full">
      <button
        className="w-1/2 rounded-none border-2 border-r-0 px-3 py-3 bg-gray-800 text-white"
        aria-label="View Hall of Shame"
        aria-pressed="true"
      >
        Hall Of Shame: Squanderers
      </button>
      <div className="w-1/2">
        {/* Desktop Tooltip */}
        <div className="hidden md:block">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-full rounded-none border-2 border-l-0 px-3 py-3 bg-gray-100 text-gray-400"
                  aria-label="View Hall of Fame"
                  aria-pressed="false"
                  disabled
                >
                  Hall Of Fame: American Heroes
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Coming Soon!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Mobile Popover */}
        <div className="block md:hidden">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                className="w-full rounded-none border-2 border-l-0 px-3 py-3 bg-gray-100 text-gray-400"
                aria-label="View Hall of Fame"
                aria-pressed="false"
              >
                Hall Of Fame: American Heroes
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <p className="text-sm">Coming Soon!</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default HallToggle 