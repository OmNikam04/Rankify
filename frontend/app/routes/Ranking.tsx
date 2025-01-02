"use client";

import { useEffect, useState } from "react";
import { fetchRankings } from "../lib/fetchData";
import Loader from "../ui/Loader";

interface CardType {
  _id: string;
  title: string;
  emoji: string;
  rating: number;
}

const Ranking: React.FC = () => {
  const [rankings, setRankings] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRankings = async () => {
      const fetchedRankings = await fetchRankings();
      setRankings(fetchedRankings.rankings);
      setLoading(false);
    };
    loadRankings();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <h1 className="text-2xl font-bold">Rankings</h1>
      <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {rankings.map((item, index) => (
          <li key={item._id} className="flex justify-between border-b py-2">
            <span>
              {index + 1}. {item.title} {item.emoji}
            </span>
            <span className="font-bold">{item.rating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
