import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerMetricSchema = new Schema (
    {
        player_id:{
            type:Schema.Types.ObjectId,
            ref: "players",
            required: true,
        },

        averageTotalSkills: {type: Number},
        principalSkills:[{
            shot :Number,
            heading: Number,
            association: Number,
            rightFoot: Number,
            leftFoot: Number,
            longPasses: Number,
            dribbling: Number,
            reflexes: Number,
            crosses: Number,
            overallRating: Number,
            totalPrincipalSkills: Number,
        }],

        tacticalSkills: [{
            anticipation: Number,
            placement: Number,
            concentration: Number, 
            forcefulness: Number,
            overlap: Number,
            offTheBall: Number,
            positioning: Number,
            gameVision: Number,
            // globalAverage: Number,
            totalTacticalSkills: Number
        }],

        physicalSkills: [{
            agility: Number,
            flexibility: Number,
            strength: Number,
            power: Number,
            endurance: Number,
            jumping: Number,
            speed: Number,
            // globalAverage: Number,
            totalPhysicalSkills: Number,
        }],
        matchSummary:{type:String},
        Created_At: { type: Date, default: Date.now }
    },
    { collection: 'playermetrics', versionKey: false }
);

const playerMetricModel = mongoose.model('playerMetricModel', playerMetricSchema);
export default playerMetricModel;
