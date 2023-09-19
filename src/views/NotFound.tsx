import { Link } from "../components/link";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Outlet } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center pb-40">
      <section>
        <h1 className="pb-5">404 Not Found</h1>
        <Link
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          to="/"
        >
          Back to main page
        </Link>
        <Outlet />
      </section>
    </div>
  );
}
