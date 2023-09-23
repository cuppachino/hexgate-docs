import { Link } from "../components/router-link";
import { Toggle } from "../components/theme/toggle";
import { Outlet } from "@tanstack/react-router";
import Github from "../components/icon/github";
import { ToggleDocSidebar } from "@/features/siderbar/toggle-sidebar-top";

export function Root() {
  return (
    <div className="absolute inset-0">
      <header className="border-b h-14 glass fixed top-0 inset-x-0 z-50 overflow-clip">
        <div className="relative px-2 gap-2 h-full w-full flex items-center justify-start mx-auto max-w-screen-2xl">
          <div className="absolute inset-y-0 my-auto h-44 -right-4 w-8 bg-background blur -z-10" />
          <Link to="/" variant={"ghost"} className="font-light leading-2">
            Hexgate
          </Link>
          <ToggleDocSidebar />
          <div className="flex w-full h-full items-center justify-end gap-2">
            {/* <Link to="/api" variant={"ghost"} className="font-light leading-2">
              API
            </Link> */}
            <Link
              to={"/docs/introduction" as "/docs"}
              variant={"ghost"}
              className="font-light leading-2"
            >
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
      <div className="overflow-auto h-full w-full">
        <Outlet />
      </div>
    </div>
  );
}
