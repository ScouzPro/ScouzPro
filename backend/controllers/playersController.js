import { Player } from "../models/playersModel.js";

export const createPlayer = async (req, res) =>{
    const {name, age, actualTeam, photo, dorsal, nationality, position, weight, height, strongFoot} = req.body
    try {
        const player = new Player ({
            name : name,
            age: age,
            actualTeam: actualTeam,
            photo: photo,
            dorsal: dorsal,
            nationality: nationality,
            position: position,
            weight: weight,
            height: height,
            strongFoot: strongFoot
        })
        await player.save()
        res.status(201).json({message:"Player Registered", player})
    } catch (error) {
        res.status(500).json({message:"no funciona", error})  
    }
}

export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find()
        res.status(200).json(players)
    } catch (error) {
        res.status(500).json({message:"no funciona", error})
    }
}

export const getOnePlayer = async (req, res) => {
    const id = req.params.id
    try {
        const players = await Player.find({_id:id})
        res.status(200).json(players)
    } catch (error) {
        res.status(500).json({message:"no funciona", error})
    }
}

export const deletePlayer = async (req, res) => {
    const id = req.params.id
    try {
        await Player.deleteOne({_id:id},req.body) 
        res.status(200).json({message:"Player Borrado Satisfactoriamente", id})
    } catch (error) {
        res.status(500).json({message:"no funciona", error})
    }
}

export const updatePlayer = async (req, res) => {
    const id = req.params.id
    try {
        await Player.updateOne({_id:id},req.body) 
        res.status(200).json({message:"Player Modificado Satisfactoriamente", id})
    } catch (error) {
        res.status(500).json({message:"no funciona", error})
    }
}