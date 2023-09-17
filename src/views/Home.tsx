export function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full pb-40">
      <section className="flex flex-col items-start justify-center gap-2 container p-5 w-fit mx-auto">
        <h1 className="py-4">Hexgate</h1>
        <p className="text-xl text-start text-dove-500 max-w-3xl mx-auto">
          An LCU API wrapper for League of Legends and Node.js, written in
          TypeScript.
        </p>
      </section>
      <br />
    </div>
  );
}
