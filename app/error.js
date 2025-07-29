"use client";
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-lg md:text-3xl font-semibold">
        Something went wrong!
      </h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-base md:text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
