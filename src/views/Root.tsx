import { Link } from "@/components/link";
import { Toggle } from "@/components/theme/toggle";
import { Outlet } from "@tanstack/react-router";
import Github from "@/components/icon/github";

export function Root() {
  return (
    <div className="absolute inset-0">
      <header className="border-b h-14 glass fixed top-0 inset-x-0 z-10 overflow-clip">
        <div
          className="p-2 gap-2 w-full flex items-center justify-start mx-auto max-w-screen-2xl
          after:bg-background after:aspect-square after:h-32 after:absolute after:-right-16 after:-z-10 after:blur-xl
        "
        >
          <Link
            to="/"
            variant={"ghost"}
            className="font-light leading-2 text-base"
          >
            Hexgate
          </Link>
          <div className="flex w-full h-full items-center justify-end gap-2">
            <Link to="/api" variant={"ghost"} className="font-light leading-2">
              API
            </Link>
            <Link to="/docs" variant={"ghost"} className="font-light leading-2">
              Docs
            </Link>

            <Link
              className="w-4 box-content"
              external={true}
              to="https://github.com/cuppachino/hexgate/"
              variant={"ghost"}
            >
              <Github className="dark:invert scale-150" />
            </Link>

            <Toggle />
          </div>
        </div>
      </header>
      <div className="overflow-auto h-full w-full pt-14">
        <Outlet />
      </div>
    </div>
  );
}
