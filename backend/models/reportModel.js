import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    player_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'players'
    },
    date: Date,
    averageScore: Number,
    averageActualMatch: Number,
    averagePreviousMatch: Number,
    totalPrincipalSkills: Number,
    totalTacticalSkills: Number,
    totalPhysicalSkills: Number,
    averageTotalSkills: Number
}
);

const Report = mongoose.model('Report', reportSchema);

export default Report;