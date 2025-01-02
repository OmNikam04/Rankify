import axios from "axios";

interface Card {
  _id: string;
  title: string;
  emoji: string;
  rating: number;
}

interface PairResponse {
  pair: [Card, Card];
}

interface RankingsResponse {
  rankings: Card[];
}

export const fetchPair = async (): Promise<PairResponse> => {
  const response = await axios.get("/api/elo/showpair");
  return response.data.data;
};

export const updateRanking = async (pairId: string, winnerId: string): Promise<void> => {
  await axios.post("/api/elo/updateranking", {
    pairId,
    winnerId,
  });
};

export const fetchRankings = async (): Promise<RankingsResponse> => {
  const response = await axios.get("/api/elo/rankings");
  return response.data;
};
