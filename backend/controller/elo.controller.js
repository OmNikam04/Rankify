import DecisionCard from "../config/decision_card.schema.js"
import Pair from '../config/pair.schema.js'; // Import the Pair model
import ErrorHandler from "../utils/ErrorHandler.js"
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';

/**
 * Generates all pairs of decision cards and stores them in the database.
 * @param {Array} cards - List of all cards.
 * @returns {Array} - Array of created pairs.
 */
const generateCardPairs = (cards) => {
  let pairs = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      pairs.push({ cardId1: cards[i]._id, cardId2: cards[j]._id });
    }
  }
  return pairs;
};

/**
 * ELO rating update function
 * @param {number} ratingA - Rating of the first card.
 * @param {number} ratingB - Rating of the second card.
 * @param {boolean} result - Result of the match (true if first card wins, false if second card wins).
 * @returns {Array} - Updated ratings for both cards.
 */
const updateEloRatings = (ratingA, ratingB, result) => {
  
  const K = 32; // Constant factor
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));
  const newRatingA = ratingA + K * (result - expectedA);
  const newRatingB = ratingB + K * (1 - result - expectedB);

  return [newRatingA, newRatingB];
};

/**
 * Pair Generation route
 * This generates and stores all possible pairs in the database.
 */
export const generatePairs = catchAsyncErrors(async (req, res, next) => {

  // Todo: Delete all pairs previously stored in database
  // before generating new pairs
  // so that only newly generated pairs are show to user
  await Pair.deleteMany({})

  const cards = await DecisionCard.find();

  // If no cards are found, return an error
  if (cards.length === 0) {
    return next(new ErrorHandler('No decision cards found to generate pairs', 404));
  }

  // Generate pairs of decision cards
  const pairs = generateCardPairs(cards);

  // Create pairs in the database with a randomization index
  const randomizedPairs = pairs.map((pair, index) => ({
    ...pair,
    randomizationIndex: Math.floor(Math.random() * 10000), // Add random index for randomization
  }));

  // Store the pairs in MongoDB
  await Pair.insertMany(randomizedPairs);

  return res.status(200).json({
    status: 'success',
    message: 'Existing pairs deleted and new pairs generated successfully',
    data: randomizedPairs,
  });
});

/**
 * Show a randomized pair of cards to the user.
 */
export const showPair = catchAsyncErrors(async (req, res, next) => {
  // Check if there are any pairs in the database
  const totalPairs = await Pair.countDocuments();
  if (totalPairs === 0) {
    return next(new ErrorHandler('No pairs available in the database', 404));
  }

  // Fetch one random pair that has not been shown yet
  const pair = await Pair.aggregate([
    { $match: { isShown: false } }, // Only consider pairs that have not been shown
    { $sample: { size: 1 } },       // Randomly select one pair
  ]);

  // If all pairs have been shown
  if (pair.length === 0) {
    return res.status(200).json({
      status: 'completed',
      message: 'All pairs have been shown.',
    });
  }

  const selectedPair = pair[0];

  // Mark the pair as shown
  await Pair.findByIdAndUpdate(selectedPair._id, { isShown: true });

  // Fetch the full card data using the cardIds
  const card1 = await DecisionCard.findById(selectedPair.cardId1);
  const card2 = await DecisionCard.findById(selectedPair.cardId2);

  if (!card1 || !card2) {
    return next(new ErrorHandler('One or both cards in the pair not found', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      pair: [card1, card2],
    },
  });
});


/**
 * Ranking Update route
 * This updates the rankings after the user selects the preferred card in the pair.
 */
export const updateRanking = catchAsyncErrors(async (req, res, next) => {
  const { cardId1, cardId2, winnerId } = req.body; // cardId1, cardId2 are the IDs of the compared cards, and winnerId is the winner's ID

  const card1 = await DecisionCard.findById(cardId1);
  const card2 = await DecisionCard.findById(cardId2);

  // If either card does not exist, throw an error
  if (!card1 || !card2) {
    return next(new ErrorHandler('One or both cards not found', 404));
  }

  // ELO rating update logic
  const result = winnerId === cardId1 ? 1 : 0; // 1 if card1 wins, 0 if card2 wins

  const [newRating1, newRating2] = updateEloRatings(card1.eloRating, card2.eloRating, result);

  // Update the ratings in the database
  card1.eloRating = newRating1
  card2.eloRating = newRating2
  console.log(`card1: ${newRating1} card2: ${newRating2}`)
  await card1.save()
  await card2.save()

  return res.status(200).json({
    status: 'success',
    message: `Rankings updated for card ${cardId1} and ${cardId2}`,
    data: { card1, card2 },
  });
});
