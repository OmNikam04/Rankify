"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCardsApi } from "../lib/fetchData";
import { AnimatePresence, motion } from "framer-motion";

const Ranking: React.FC = () => {
  const cards = useQuery({ queryKey: ['rankedCards'], queryFn: getAllCardsApi });

  return (
    <div>
      <div className="text-center py-8">
        <h1 className="text-lg">Ranked List of your decisions:</h1>
        <p className="text-sm text-gray-500">
          Higher the rating, higher priority should be given to that decision
        </p>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {cards?.data &&
            [...cards.data]
              .sort((a: any, b: any) => b.eloRating - a.eloRating) // Sort cards by rating
              .map((card: any, index: any) => (
                <motion.div
                  key={card._id}
                  initial={{ opacity: 0, y: 50 }} // Adjusted for a more visible entry
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }} // Adjusted for a more visible exit
                  layout
                  transition={{
                    duration: 1.5, // Increased duration for slower animation
                    ease: "easeInOut", // Smooth easing for a polished effect
                  }}
                  className="flex items-center gap-2 p-2 bg-white shadow-lg hover:shadow-xl transition-all w-full h-20"
                >
                  <div className="text-lg font-semibold px-2">{index + 1}</div>
                  <div className="text-4xl">{card.emoji}</div>
                  <div>
                    <h1 className="text-lg">{card.title}</h1>
                    <h4 className="text-md text-gray-500">
                      {card.eloRating.toFixed(2)}
                    </h4>
                  </div>
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Ranking;
