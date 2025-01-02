import mongoose from 'mongoose';

const decisionCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Main title or description of the decision card
    },
    description: {
      type: String,
      required: false, // Optional detailed explanation of the decision card
    },
    emoji: {
      type: String,
      required: false, // Emoji associated with the decision card
      default: null, // Default to null if no emoji is set
    },
    eloRating: {
      type: Number,
      default: 1000, // Default ELO rating for all decisions
    },
    createdAt: {
      type: Date,
      default: Date.now, // Timestamp for when the card was created
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Timestamp for when the card was last updated
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

const DecisionCard = mongoose.model('DecisionCard', decisionCardSchema);

export default DecisionCard;
