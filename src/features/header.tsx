import { Button } from "@/components/ui/button/button";
import { Toggle } from "@/components/theme/toggle";

export function Header() {
  return (
    <header className="border-b p-4 gap-4 flex items-center">
      <h1 className="text-2xl">Hexgate</h1>
      <Button variant="secondary">Secondary</Button>
      <Toggle />
    </header>
  );
}
