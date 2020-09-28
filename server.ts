import express = require('express');
import {DatabaseAccessLayer} from './services/database'
import "reflect-metadata"
import { GamerPhoto } from './entities/GamerPhoto';
const app: express.Application = express();
var cors = require('cors')
const dal = new DatabaseAccessLayer()

app.use(cors())

app.get("/gamer/:id", (req, res) => {
    dal.getGamer(req.params.id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => res.status(404).json({"error": error})
        );
});

app.get("/gamer/:id/results", (req,res) => {
    dal.getGamerResults(req.params.id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => res.status(404).json({"error": error}))
})

app.get("/gamer/:id/photo", (req,res) => {
    dal.getGamerPhoto(req.params.id)
        .then((data : GamerPhoto) => {
            res.writeHead(200), {
                'Content-Type': data.mimeType,
                'Content-Lenght': data.photo.length
            }
            res.end(data.photo)
        })
        .catch((error) => res.status(404).json({"error": error}))
})

app.get("/gamers", (req, res) => {
    dal.getGamers()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => res.status(404).json({"error": error}))
});

app.get("/games", (req,res) => {
    console.log("Received request for all games")
    dal.getGames()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => res.status(500).json({"error": error}))
})

app.get("/games/:id/gamers", (req,res) => {
    console.log("Received request for all gamers for game " + req.params.id)
    dal.getGamerByGame(req.params.id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => res.status(500).json({"error": error}))
})

app.listen(3000, () => {
    console.log('Started server on port 3000');
});