import axios from "axios";

interface Card {
  _id: string;
  title: string;
  emoji: string;
  rating: number;
}

interface PairResponse {
  status: string,
  data:{
    pair: [Card, Card];
  }
}


interface RankingsResponse {
  rankings: Card[];
}
// const BASE_URL = "http://localhost:5000/api/v1"
const BASE_URL = "https://rankify-pi5p.onrender.com/api/v1"

export const createCardApi = async(data:any) :Promise<void> =>{
  const res = await axios.post(`${BASE_URL}/card`, data)
  console.log("creating card", res)
}

export const getAllCardsApi = async() : Promise<any> =>{
  const res = await axios.get(`${BASE_URL}/cards`)
  return res.data.data
}


export const deleteCardByIdApi = async(id:any) : Promise<any> =>{
  const res = await axios.delete(`${BASE_URL}/card/${id}`)
  return res
}

export const generatePairsApi = async() : Promise<any> =>{
  const res = await axios.get(`${BASE_URL}/generatePairs`)
  return res
}

export const fetchPairApi = async (): Promise<PairResponse> => {
  const response = await axios.get(`${BASE_URL}/showPair`);
  return response.data;
};

export const updateRankingApi = async (data:any): Promise<any> => {
  const res = await axios.post(`${BASE_URL}/updateRanking`, data);
  return res
};
