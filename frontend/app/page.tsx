export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to the ELO Decision Maker</h1>
      <p className="mt-4 text-lg text-gray-600">
        Start ranking your decisions and view the results in real-time!
      </p>
      <div className="mt-8">
        <a href="/routes/SelectPair" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Start Selecting
        </a>
        <a href="/routes/Ranking" className="ml-4 bg-gray-700 text-white py-2 px-4 rounded-lg">
          View Rankings
        </a>
      </div>
    </div>
  );
}
