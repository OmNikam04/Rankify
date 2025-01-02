import DecisionCard from "../config/decision_card.schema.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const createCard = catchAsyncErrors(async (req, res, next) => {
  const { title, description, emoji } = req.body;

  // Validate input
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Title is required and must be a non-empty string.",
    });
  }

  if (emoji && typeof emoji !== "string") {
    return res.status(400).json({
      status: "fail",
      message: "Emoji must be a string.",
    });
  }

  // Create a new decision card
  const card = new DecisionCard({ title, description, emoji });

  // Save the card and return the result
  const savedCard = await card.save();

  return res.status(201).json({
    status: "success",
    data: savedCard,
  });
});

export const getAllCards = catchAsyncErrors(async (req, res, next) => {
  // Fetch all decision cards from the database
  const cards = await DecisionCard.find().sort({ eloRating: -1 });

  // If no cards are found, throw a custom error
  if (cards.length === 0) {
    return next(new ErrorHandler("No decision cards found", 404));
  }

  // Send response with all the cards
  return res.status(200).json({
    status: "success",
    data: cards,
  });
});

export const deleteCardById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
  
    // Find the card by its ID
    const card = await DecisionCard.findById(id);
  
    // If the card does not exist, throw a custom error
    if (!card) {
      return next(new ErrorHandler(`Card with id ${id} not found`, 404));
    }
  
    // Delete the card
    await DecisionCard.findByIdAndDelete(id);
  
    // Send success response after deletion
    return res.status(200).json({
      status: 'success',
      message: `Card with id ${id} has been deleted.`,
    });
  });
  
