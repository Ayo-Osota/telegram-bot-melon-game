function Task() {
  return (
    <main className="relative text-center flex flex-col items-center justify-center h-full">
      <h1 className="font-bold text-3xl leading-none">You have tasks</h1>
      <p className="font-medium text-white/70 text-base leading-none mt-4">
        Follow me on{" "}
        <a
          rel="noopener"
          target="_blank"
          href="https://x.com/Ayo_Osota"
          className=" text-blue-500"
        >
          twitter
        </a>
      </p>
      <p className="font-medium text-white/70 text-base leading-none mt-2">
        Connect on{" "}
        <a
          rel="noopener"
          target="_blank"
          href="https://www.linkedin.com/in/ayo-osota/"
          className=" text-blue-500"
        >
          linkedIn
        </a>
      </p>
    </main>
  );
}

export default Task;
