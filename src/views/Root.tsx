import { Link } from "@/components/Link";
import { Toggle } from "@/components/theme/toggle";
import { Outlet } from "@tanstack/react-router";
import Github from "@/components/icon/github";

export function Root() {
  return (
    <div className="absolute inset-0 overflow-clip">
      <header className="border-b p-2 gap-2 flex items-center justify-start h-14">
        <Link to="/" variant={"ghost"}>
          Hexgate
        </Link>
        <div className="flex w-full h-full items-center justify-end gap-2">
          <Link to="/api" variant={"ghost"}>
            API
          </Link>
          {/* @ts-expect-error // ! not implemented */}
          <Link to="/docs" variant={"ghost"}>
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
          <VerticalDivider />
          <Toggle />
        </div>
      </header>
      <Outlet />
    </div>
  );
}

const VerticalDivider = () => <span className="w-4 h-1/2 border-l-2" />;
