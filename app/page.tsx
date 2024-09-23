import HomePage from './(routes)/home/page';

export const revalidate = 30; // Revalidate every 30 seconds

const minimumLoadTime = 5000; // 5 seconds

async function ensureMinimumLoadTime<T>(
  asyncFunction: () => Promise<T>
): Promise<T> {
  const startTime = Date.now();
  const result = await asyncFunction();
  const elapsedTime = Date.now() - startTime;

  if (elapsedTime < minimumLoadTime) {
    await new Promise((resolve) =>
      setTimeout(resolve, minimumLoadTime - elapsedTime)
    );
  }

  return result;
}

export default async function Home() {
  await ensureMinimumLoadTime(async () => {
    // This is where your existing data fetching would occur in the parallel routes
    // We're not actually fetching anything here, just simulating the time it might take
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  return <HomePage />;
}
