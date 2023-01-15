import express, { Request, Response } from 'express';
import { Person } from '../models/person';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma =  new PrismaClient();
const { check } = require('express-validator');


router.get('/', async (req: Request, res: Response) => {
    const person: Person[] = await prisma.person.findMany()
    
    if (res.status(200)){
        res.send(person)
    }else{
        res.send('No person found')
    }
})

async function addPersonToDB(name: string, age: number){
    // console.log(name, age)
    const person: Person = await prisma.person.create({
        data: {
            name: name,
            age: age
        }
    })
    return person;
}

async function getLastItem() {
    const person: Person[] = await prisma.person.findMany({
        take: 1,
        orderBy: {
            id: 'desc'
        }
    })
    return person;
}

router.get('/addPerson', 
    [
        check('name').isLength({max: 100}),
        check('age').isInt({min: 0, max: 100})
    ]
    , async (req: Request, res: Response) => {

    const { name, age } = req.query;
    // console.log(req.query)
    const person  =  await addPersonToDB(name as string, parseInt(age as string))

    res.status(200).send(person)
})

router.get('/helloWorld', async (req: Request, res: Response) => {

    const person  =  await getLastItem()

    if (person.length == 0) {
        res.status(404).send('No person found')
    } 
    res.send(person)
})


module.exports = router;


