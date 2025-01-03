"use client";

import { useEffect, useState } from "react";
import { fetchPair, updateRanking } from "../lib/fetchData";
import Card from "./Card";
import Loader from "../ui/Loader";

interface CardType {
  _id: string;
  title: string;
  emoji: string;
  rating: number;
}

const SelectPair: React.FC = () => {
  const [pair, setPair] = useState<[CardType, CardType] | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPair = async () => {
    setLoading(true);
    const newPair = await fetchPair();
    setPair(newPair.pair);
    setLoading(false);
  };

  const handleSelect = async (winnerId: string) => {
    if (pair) {
      await updateRanking(pair[0]._id === winnerId ? pair[0]._id : pair[1]._id, winnerId);
      loadPair();
    }
  };

  useEffect(() => {
    loadPair();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <h1 className="text-2xl font-bold">Choose Your Favorite</h1>
      {pair && (
        <div className="grid grid-cols-2 gap-4">
          <Card title={pair[0].title} emoji={pair[0].emoji} onSelect={() => handleSelect(pair[0]._id)} />
          <Card title={pair[1].title} emoji={pair[1].emoji} onSelect={() => handleSelect(pair[1]._id)} />
        </div>
      )}
    </div>
  );
};

export default SelectPair;
