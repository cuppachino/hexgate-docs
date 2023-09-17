import { Link, Outlet } from "@tanstack/react-router";

import { Button } from "@/components/ui/button/button";
import { Header } from "@/features/header";

export function Root() {
  return (
    <>
      <Header />
      <div>
        <h1>Root</h1>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Button variant="secondary">Secondary</Button>
      </div>
      <Outlet />
    </>
  );
}
