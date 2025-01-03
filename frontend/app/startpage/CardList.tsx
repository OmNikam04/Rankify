"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCardByIdApi, generatePairsApi, getAllCardsApi } from "../lib/fetchData"
import { Button } from "@/components/ui/button"
import { MoveRightIcon, Trash2Icon } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/router"

export const CardList = () => {
    const queryClient = useQueryClient()

    const cards = useQuery({ queryKey: ['cards'], queryFn: getAllCardsApi })

    const deleteMutation = useMutation({
        mutationFn: deleteCardByIdApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cards"] });
        },
        onError: (error) => {
            console.error("Error creating card:", error);
            alert("Failed to delete card. Check console for error. Please try again.");
        },
    });

    const handleCardDelete = (id: any) => {
        deleteMutation.mutate(id)
    }

    // Use mutation for generatePairs instead of query
    const generatePairsMutation = useMutation({
        mutationFn: generatePairsApi,
        onSuccess: (data) => {
            
        },
        onError: (error) => {
            console.error("Error generating pairs:", error);
            alert("Failed to generate pairs. Please try again.");
        }
    });

    // Trigger the mutation when the button is clicked
    const handleGeneratePairs = () => {
        generatePairsMutation.mutate();
    };

    return (
        <div className="w-full flex flex-col mt-4">
            <div className="flex justify-between items-center">
                <h2 className="text-left text-3xl">List of created decisions: </h2>
                <p className="text-md text-gray-500 font-bold">Total cards: {cards?.data && cards?.data.length}</p>
            </div>
            <div className="w-full pt-12 p-4 mb-10">
                <div className="grid gap-14 md:grid-cols-3 md:gap-5">
                    {
                        cards?.data && cards?.data.map((card: any) => {
                            return (
                                <div
                                    key={card._id}
                                    className="relative rounded bg-white p-6 mt-6 text-center shadow-xl group hover:shadow-2xl transition-shadow ease-in duration-300"
                                >
                                    <div
                                        className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-white shadow-md text-3xl"
                                    >
                                        {card.emoji}
                                    </div>

                                    <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">
                                        {card.title}
                                    </h1>

                                    <p className="px-4 text-gray-500">{card.description}</p>

                                    <Button
                                        variant="destructive"
                                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all rounded duration-300"
                                        onClick={() => handleCardDelete(card._id)}
                                    >
                                        <Trash2Icon />
                                    </Button>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
            <Button 
                className="text-lg group py-6 pr-8"
                onClick={handleGeneratePairs}
                disabled={generatePairsMutation.isPending} // Optionally disable the button when loading
            >
                {generatePairsMutation.isPending ? "Generating..." : "Start ranking your decision"}
                <MoveRightIcon className="text-xl group-hover:translate-x-4 duration-300 transition-transform" />
            </Button>

        </div>
    )
}
