import sqlite3 = require('sqlite3');
import {IDatabaseAccessLayer} from './interfaces/idatabase'
import md5 = require('md5');
import { Gamer } from '../entities/Gamer';
import { Game } from '../entities/Game'
import {plainToClass} from 'class-transformer'
import { GamerResult } from '../entities/GamerResult';
import { GamerPhoto } from '../entities/GamerPhoto';

sqlite3.verbose();

const db_file = 'gamers.db';

export class DatabaseAccessLayer implements IDatabaseAccessLayer {

    db : sqlite3.Database

    constructor() {
        this.db = new sqlite3.Database(db_file, (err) => {
            if (err){
                console.log(err.message);
                throw err;
            }
            else {
                console.log("Connected to SQLite database");
            }
        });
    }
    
    getGamer(id: string) : Promise<Gamer>{
        var sql = "select * from Gamer where gamer_id = ?";
        var params = [id];
        return new Promise((resolve, reject) =>
            this.db.all(sql, params, (err, row) => {
                if (err || row == null){
                    var msg = `Unable to obtain Gamer from db: ${err}`;
                    console.log(msg);
                    reject(msg);
                }
                else {
                    console.log(row);
                    let gmr = plainToClass(Gamer, row, { excludeExtraneousValues: true });                    
                    resolve(gmr[0]);
                }
            })
        );
    }

    getGamers() : Promise<Gamer[]> {
        let sql = "select * from Gamer"
        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows) => {
                if (err || rows == null) {
                    var msg = "Unable to obtain gamers";
                    console.log(msg);
                    reject(msg)                    
                }
                else {
                    let gamers = plainToClass(Gamer, rows, {excludeExtraneousValues: true });
                    resolve(gamers);
                }
            });
        });
    }

    getGamerResults(id: string) : Promise<GamerResult[]>{
        let sql = `
            select g.wins, g.losses, gr.type_of_game, gr.gameName from GamerResult gr
            inner join Game g on gr.game_id = g.game_id
            where gr.gamer_id = ?            
        `;
        let params = [id];
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err || rows == null) {
                    var msg = "Unable to obtain results for gamer";
                    console.log(msg);
                    reject(msg);
                }
                else {                    
                    let gamerResult = plainToClass(GamerResult, rows)
                    resolve(gamerResult);
                }
            });
        });
    }

    getGamerPhoto(id: string) : Promise<any> {
        let sql = `select p.photo, p.mime_type from GamerPhoto p
                   inner join Gamer a on a.photo_id = p.photo_id
                   where a.gamer_id = ?`
        let params = [id]
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err || row == null) {
                    var msg = `No image found for gamer with id: ${id}`
                    console.log(msg)
                    reject(err)
                }
                else {
                    let img = new GamerPhoto(row.mime_type, row.photo)
                    console.log(img)
                    resolve(img)                    
                }
            })
        });
    }

    getGames() : Promise<Game[]> {
        let sql = `select * from Game`        

        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows) => {
                if (err || rows == null) {
                    var msg = "Unable to obtain results for games";
                    console.log(msg);
                    reject(msg);
                }
                else {                                        
                    let results = plainToClass(Game, rows)
                    resolve(results);
                }
            })
        })
    }

    getGamerByGame(game_id : string) : Promise<Gamer[]> {
        let sql = `select a.* from Gamer a
        inner join GamerResult ar on a.gamer_id = ar.gamer_id
        where ar.game_id = ?`
        let params = [game_id]

        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err || rows == null) {
                    var msg = "Unable to obtain results for games";
                    console.log(msg);
                    reject(msg);
                }
                else {                    
                    let gamerResult = plainToClass(Gamer, rows)
                    resolve(gamerResult);
                }
            });
        });
    }
}