import "reflect-metadata"
import { DataSource } from "typeorm"
import { Event } from "./entity/Event"
import { Fighter } from "./entity/Fighter"
import { WeightClass } from "./entity/WeightClass"
import { Team } from "./entity/Team"
import { Fight } from "./entity/Fight"
import { Ranking } from "./entity/Ranking"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "",
    database: "MMA",
    synchronize: true,
    logging: false,
    ssl : {
        rejectUnauthorized: false
    },
    entities: [Event, Fighter, WeightClass, Team, Fight, Ranking],
})

