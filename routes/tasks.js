import { Router } from 'express';
import { body, validationResult } from "express-validator";

import db from '../database.js';

const router = Router();

router.get('/tasks',
    async (req, res) => {
        try {
            const tasks = await db.query(
              'SELECT title, id, color, completed FROM Tasks'
            );
          
            res.send(tasks[0]);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
});

router.get('/tasks/:id', async (req, res) => {
    const parsedId = parseInt(req.params.id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).send({
        error: 'Bad Request(Invalid Id): Id must be a number',
      });
    }

    try {
        const findTask = await db.query(`SELECT title, id, color, completed FROM Tasks WHERE id = ${parsedId}`);
        if (findTask[0].length === 0) {
            return res.status(404).send('Task not found');
        }
        return res.send(findTask[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error. Error: ' + err.sqlMessage);
    }
});

router.post(
    '/tasks',
    body('title')
        .notEmpty()
        .withMessage('Title cannot be empty..')
        .isLength({ min: 1 })
        .withMessage('Title must be at least 1 character long')
        .isString().withMessage('Title must be a string'),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }
        const { title, color } = req.body;
        try {
            await db.query(`INSERT INTO Tasks (title, color, completed) VALUES ('${title}', '${color}', ${0})`);

            return res.send(`Task '${title}' has been added successfully.`);
        } catch (err) {
            console.error(err.sqlMessage);
            return res.status(500).send('Internal Server Error. Error: ' + err.sqlMessage);
        }
        
});

router.put('/tasks/:id', async (req, res) => {
    const parsedId = parseInt(req.params.id, 10);
    if (isNaN(parsedId)) {
        return res.status(400).send({
            error: 'Bad Request: Id must be a number',
        });
    }
    const { title, color, completed } = req.body;

    try {
        await db.query(`UPDATE Tasks SET title = '${title}', color = '${color}', completed = ${completed} WHERE id = ${parsedId}`);

        return res.send(`Task with id ${parsedId} has been updated successfully.`);
    } catch (err) {
        console.error(err.sqlMessage);
        return res.status(500).send('Internal Server Error. Error: ' + err.sqlMessage);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const parsedId = parseInt(req.params.id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).send({
        error: 'Bad Request(Invalid Id): Id must be a number',
      });
    }

    try {
        await db.query(`DELETE FROM Tasks WHERE id = ${parsedId}`);

        return res.send("Task has been deleted successfully.");
    } catch (err) {
        console.error(err.sqlMessage);
        return res.status(500).send('Internal Server Error. Error: ' + err.sqlMessage);
    }
});

export default router;