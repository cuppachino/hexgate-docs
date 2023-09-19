import { TooltipCard } from "@/components/tooltip-card";
import { Link } from "@/components/router-link";

export function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full pb-40 graph-paper">
      <section className="flex flex-col items-start justify-center gap-2 container w-fit mx-auto">
        <h1 className="md:text-7xl pb-4">Hexgate</h1>
        <div className="md:text-lg text-start text-muted-foreground/90 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-ellipsis mx-auto pl-0.5">
          An LCU API wrapper for
          <TooltipCard
            className="text-base md:text-lg px-2"
            text={"League of Legends"}
            name={"Legal Jibber Jabber Policy"}
            img={"riot.ico"}
            fallback={"LoL"}
            to={"https://www.riotgames.com/en/legal"}
          >
            <p className="text-sm text-muted-foreground">
              Hexgate was created using assets owned by Riot Games. Riot Games
              does not endorse or sponsor this project.
            </p>
          </TooltipCard>
          and
          <TooltipCard
            className="text-base md:text-lg pl-2 pr-0"
            text={"Node.js®"}
            img={"https://nodejs.org/static/images/favicons/favicon.png"}
            fallback={"N"}
            to={"https://nodejs.org/en"}
          >
            <p className="text-sm text-muted-foreground">
              Node.js® is an asynchronous event-driven JavaScript runtime
              designed for building scalable network applications.
            </p>
          </TooltipCard>
          , packed with features that make it easy to build companion apps.
        </div>
        <div className="flex pt-4 gap-4">
          <Link
            variant={"default"}
            size="lg"
            to={"/docs"}
            className="relative group dark:bg-primary/95 dark:hover:bg-white dark:hover:text-primary-foreground duration-200"
          >
            <span>Get Started</span>
            <div
              className="absolute -inset-0.5 dark:-inset-0.5 rounded-lg -z-10 blur-lg bg-gradient-to-br 
                        from-indigo-600 via-indigo-500 to-pink-600
                        dark:from-blue-600 dark:to-amber-500
                          opacity-0 group-hover:opacity-50 dark:group-hover:opacity-90
                          group-hover:animate-wobble
                          transition-all duration-300"
            />
          </Link>
          <Link
            variant={"outline"}
            size="lg"
            external={true}
            to="https://github.com/cuppachino/hexgate/"
          >
            GitHub
          </Link>
        </div>
      </section>
      <br />
    </div>
  );
}
