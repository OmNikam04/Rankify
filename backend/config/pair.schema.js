import mongoose from 'mongoose';

const pairSchema = new mongoose.Schema({
    cardId1: { type: mongoose.Schema.Types.ObjectId, ref: 'DecisionCard', required: true },
    cardId2: { type: mongoose.Schema.Types.ObjectId, ref: 'DecisionCard', required: true },
    isShown: { type: Boolean, default: false }, // to track whether the pair has been shown to the user
    randomizationIndex: { type: Number, required: true }, // to help with randomizing order
}, { timestamps: true });

const Pair = mongoose.model('Pair', pairSchema);

export default Pair;
