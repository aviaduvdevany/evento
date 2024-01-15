import { cn } from "@/lib/utils";


type props = {
  children: React.ReactNode;
  className?: string;
};

export default function Heading({ children, className }: props) {
  return (
    <h1
      className={cn(
        "text-3xl lg:text-6xl font-bold tracking-tight capitalize",
        className
      )}
    >
      {children}
    </h1>
  );
}
