import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-between flex-1 min-h-[80vh] md:min-h-[85vh]">
      <div className="flex flex-col items-center gap-2 mx-3 mt-[30vh]">
        <h2 className="text-5xl md:text-6xl font-bold text-center tracking-tighter">
          See Where Your Tax Dollars Go
        </h2>
        <p className="text-lg text-muted-foreground text-center">
          Let&apos;s keep the government accountable.
        </p>
      </div>
      <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(250px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
          )}
        />
      <VelocityScroll
        text="DEPARTMENT OF GOVERNMENT EFFICIENCY •"
        default_velocity={2}
        className="font-display text-center text-md font-bold tracking-[-0.02em] text-gray-800 drop-shadow-sm dark:text-white md:text-xl md:leading-[1rem]"
      />
    </section>
  );
}
