import express, { Request, Response } from 'express';
import { Person } from '../models/person';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma =  new PrismaClient();
const { check } = require('express-validator');
const hello = require('hello-service');


router.get('/', async (req: Request, res: Response) => {
    const person: Person[] = await prisma.person.findMany()
    
    if (res.status(200)){
        res.send(person)
    }else{
        res.send('No person found')
    }
})

async function addPersonToDB(name: string, age: number){
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

router.get('/addPerson', async (req: Request, res: Response) => {
    const message = {"message": ""}
    try {
        const { name, age } = req.query;
        
        if(name == undefined || name == "" || age == undefined || age == "") {
            message.message = "Incomplete parameters"
            res.status(400).send(message)
        }else{
            const isNameValid = /^[a-zA-Z\s]+$/i.test(name.toString());
            const isAgeValid = /^\d+$/.test(age.toString());
            if(!isNameValid || !isAgeValid || name.toString().length > 50 || age.toString().length > 3) {
                message.message = "The data types sent are incorrect, the parameter name must be string(50 max) and the parameter age(3 max) must be an int."
                res.status(400).send(message)
            }else{
                const person = await addPersonToDB(name as string, parseInt(age as string));
                res.status(200).json(person);
            }
        }
        
    } catch (error) {
        res.status(400).json(message);
    }
})
        
router.get('/helloWorld', async (req: Request, res: Response) => {
    const person  =  await getLastItem()

    if (person.length == 0) {
        res.status(404).send({"msg": "No person found"})
    }else{
        // calling hello-service
        const resp = hello(person[0].name)
        res.send({"msg": resp})
    }
})


module.exports = router;



