import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import GridPattern from "@/components/ui/grid-pattern";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center flex-1 p-36 overflow-hidden">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-6xl font-bold text-center tracking-tighter">
          See Where Your Tax Dollars Go
        </h2>
        <p className="text-lg text-muted-foreground text-center">
          Make Government Spending Accountable to the People.
        </p>

        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
    </section>
  );
}
