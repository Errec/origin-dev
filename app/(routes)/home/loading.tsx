export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-white text-2xl font-bold z-10">Loading...</div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 animate-progress" />
    </div>
  );
}
