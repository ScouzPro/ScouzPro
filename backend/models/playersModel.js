import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    actualTeam: {type: String, required: true},
    photo: {type: String, required: true},
    dorsal: {type: Number, required: true},
    nationality: {type: String, required: true},
    position: {type: String, required: true},
    weight: {type: String, required: true },
    height: {type: String, required: true },
    strongFoot: {type: String, required: true}
},
{timestamp: true}
)

export const Player = mongoose.model('players', playerSchema)