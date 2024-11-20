'use client'
import NumberTicker from "@/components/ui/number-ticker";
import { CoolMode } from "@/components/ui/cool-mode";

interface TaxDollarsDisplayProps {
  value: number;
}

const TaxDollarsDisplay = ({ value }: TaxDollarsDisplayProps) => {
  return (
    <CoolMode options={{
        particle: "/doge-black.png",
      }}>
      <div className="text-center">
        <p className="text-6xl md:text-7xl font-semibold">
          $<NumberTicker value={value} className="tracking-tight"/>M
        </p>
        <p className="text-sm md:text-lg font-medium text-muted-foreground">
          Tax Dollars Wasted in 2023
        </p>
      </div>
    </CoolMode>
  );
};

export default TaxDollarsDisplay; 