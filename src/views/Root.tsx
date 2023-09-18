import { Link } from "@/components/link";
import { Toggle } from "@/components/theme/toggle";
import { Outlet } from "@tanstack/react-router";
import Github from "@/components/icon/github";

export function Root() {
  return (
    <div className="absolute inset-0 overflow-clip pt-14">
      <header className="border-b p-2 gap-2 flex items-center justify-start h-14 fixed top-0 inset-x-0 w-full">
        <Link to="/" variant={"ghost"} className="font-light leading-2">
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
          <VerticalDivider />
          <Toggle />
        </div>
      </header>
      <div className="overflow-auto h-full w-full">
        <Outlet />
      </div>
    </div>
  );
}

const VerticalDivider = () => <span className="w-4 h-1/2 border-l-2" />;
