"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Card from "./Card"
import { fetchPairApi, updateRankingApi } from "../lib/fetchData"
import Ranking from "./Ranking"

export default function Home() {
    const queryClient = useQueryClient()

    const { isPending: isShowPairPending, isError, data: res, error } = useQuery({
        queryKey: ['showPair'],
        queryFn: fetchPairApi,
    })
    const statusMsg = res?.status
    const fetchedPair = res?.data
    console.log(statusMsg)
    const updateRatingMutation = useMutation({
        mutationFn: updateRankingApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rankedCards'] })
            queryClient.invalidateQueries({ queryKey: ['showPair'] })
        }
    });

    const handleCardClick = (winnerId: string) => {
        console.log(winnerId)
        if (fetchedPair?.pair) {
            const [card1, card2] = fetchedPair.pair;
            const cardId1 = card1._id;
            const cardId2 = card2._id;

            // Determine the winner and trigger the API
            updateRatingMutation.mutate({
                cardId1,
                cardId2,
                winnerId,
            });
        }
    };


    return (
        <div className="w-full min-h-auto my-4 ">
            <div className="grid grid-cols-6 h-full gap-4">
                <div className="col-span-4 flex flex-col">
                    <div className="text-center py-8">
                        <h1 className="text-2xl">Which decision is your priority? 🤔</h1>
                    </div>
                    {
                        statusMsg === "completed" ?
                            <div className="flex flex-col items-center justify-center gap-4">
                                <p>All pairs are compaired </p>
                                <p>Highest rated decision are the ones you should go with !!</p>
                                <p>All the best 🙌</p>
                            </div>
                            : <>
                                {
                                    fetchedPair?.pair &&
                                    <div className="flex items-center gap-4">
                                        <Card data={fetchedPair?.pair[0]} handleCardClick={handleCardClick} />

                                        <div>
                                            <p className="text-xl font-bold uppercase">
                                                or
                                            </p>
                                        </div>

                                        <Card data={fetchedPair?.pair[1]} handleCardClick={handleCardClick} />
                                    </div>
                                }
                            </>
                    }
                </div>

                <div className="col-span-2 col-start-5 ">
                    <Ranking />
                </div>
            </div>


        </div>
    )
}