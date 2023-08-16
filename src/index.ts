import { AppDataSource } from "./data-source"
import express from "express"
import { Fighter } from "./entity/Fighter"
import { Fight } from "./entity/Fight"
import { Event } from "./entity/Event"
import { Ranking } from "./entity/Ranking"


AppDataSource.initialize().then(async () => {

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    const FighterRepository = AppDataSource.getRepository(Fighter)
    const FightRepository= AppDataSource.getRepository(Fight)
    const EventRepository= AppDataSource.getRepository(Event)
    const RankingRepository = AppDataSource.getRepository(Ranking)

    app.get('/fighters', async (req, res) => {
        const fighters = await FighterRepository.find()
        res.json(fighters)
    })

    app.get('/fighters/:id', async (req, res) => {
        const fighter = await FighterRepository.findOneBy({fighter_id : req.params.id})
        res.json(fighter)
    })

    app.get('/fighters/:id/fight-statistics', async (req, res) => {
        const fighter = await FighterRepository.findOneBy({fighter_id : req.params.id})

        const fightStatistics = {wins : fighter.wins, losses : fighter.losses, knockouts :fighter.knockouts, submissions:fighter.submissions}
        res.status(200).json(fightStatistics);
    });


    app.post('/fighters', async (req, res) => {
        const fighter = await FighterRepository.save(req.body)
        res.status(201).json(fighter)
    })


    app.put('/fighters/:id', async (req, res) => {
        const fighter = await FighterRepository.findOneBy({fighter_id : req.params.id})
        if (fighter) {
            await FighterRepository.save({ ...fighter, ...req.body })
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    })


    app.delete('/fighters/:id', async (req, res) => {
        const fighter = await FighterRepository.findOneBy({fighter_id : req.params.id})
        if (fighter) {
            await FighterRepository.remove(fighter)
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    })


    app.get('/fights', async (req, res) => {
        const fights = await FightRepository.find()
        res.json(fights)
    })


    app.get('/fights/:id', async (req, res) => {
        const fight = await FightRepository.findOne({
            where: {
                fight_id: req.params.id,
            },
            relations: {
                event : true, fighter1 : true, fighter2 : true, 
            },
        })
        res.json(fight)
    })


    app.post('/fights', async (req, res) => {
        const fight = await FightRepository.save(req.body)
        res.status(201).json(fight)
    })



    async function updateRanking(fight){
        const fighter1 = await FighterRepository.findOne({where : {fighter_id : fight.fighter1.fighter_id} })
        const fighter2 = await FighterRepository.findOne({where : {fighter_id : fight.fighter2.fighter_id} })
        if (fight.result === "fighter1 win") {
            fighter1.wins += 1;
            fighter2.losses += 1;
            fight.method === "knockout" ? fighter1.knockouts += 1 : fighter1.submissions += 1;
          } else if (fight.result === "fighter2 win") {
            fighter2.wins += 1;
            fighter1.losses += 1;
            fight.method === "knockout" ? fighter2.knockouts += 1 : fighter2.submissions += 1;
          }
        await FighterRepository.save(fighter1)
        await FighterRepository.save(fighter2)


        const fighter1Ranking = await RankingRepository.findOne({where : {fighter : fighter1 , weightClass : fighter1.weightClass} })
        const fighter2Ranking = await RankingRepository.findOne({where : {fighter : fighter2 , weightClass : fighter2.weightClass} })

        if (fighter1Ranking && fighter2Ranking) {
            if (fight.result === "fighter2 win" && fighter1Ranking.rank > fighter2Ranking.rank) {
                    fighter1Ranking.rank -= 1;
                    fighter2Ranking.rank += 1;
            } else if (fight.result === "fighter1 win" && fighter2Ranking.rank > fighter1Ranking.rank) {
                    fighter2Ranking.rank -= 1;
                    fighter1Ranking.rank += 1;
            }
        }
        await RankingRepository.save(fighter1Ranking)
        await RankingRepository.save(fighter2Ranking)
        return;
    }



    app.post('/fights/:id/updateRanking', async (req, res) => {
        const fight = await FightRepository.findOne({where: {
            fight_id: req.params.id,
        },
        relations: {
             fighter1 : true, fighter2 : true, 
        }})
        await updateRanking(fight)
        res.status(200).json({message : "Ranking updated"})
    })


    app.put('/fights/:id', async (req, res) => {
        const fight = await FightRepository.findOneBy({fight_id : req.params.id})
        if (fight) {
            await FightRepository.save({ ...fight, ...req.body })
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    })

    app.delete('/fights/:id', async (req, res) => {
        const fight = await FightRepository.findOneBy({fight_id : req.params.id})
        if (fight) {
            await FightRepository.remove(fight)
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    })


    app.get('/events', async (req, res) => {
        const events = await EventRepository.find()
        res.json(events)
    })

    app.get('/events/:id', async (req, res) => {
        const event = await EventRepository.findOneBy({event_id : req.params.id})
        res.json(event)
    })

    app.post('/events', async (req, res) => {
        const event = await EventRepository.save(req.body)
        res.status(201).json(event)
    })

    app.put('/events/:id', async (req, res) => {
        const event = await EventRepository.findOneBy({event_id : req.params.id})
        if (event) {
            await EventRepository.save({ ...event, ...req.body })
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    })

    app.delete('/events/:id', async (req, res) => {
        const event = await EventRepository.findOneBy({event_id : req.params.id})
        if (event) {
            await EventRepository.remove(event)
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    })




















    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server is running on port ${port}`))

}).catch(error => console.log(error))

