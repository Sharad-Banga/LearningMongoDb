import express, { json } from "express";
import { UserModel, TodoModel } from "./db.js";
import { auth, JWT_SECRET } from "./auth.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

import { connect } from "mongoose";
import bcrypt from 'bcrypt';

connect("mongodb+srv://sharad_banga:sharad@cluster0.8vv4o.mongodb.net/todo-app-database");

const app = express();
app.use(json());

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password , 5 );

    await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password , 5 );


    const response = await UserModel.findOne({
        email: email,
        password: hashedPassword,
    });

    if (response) {
        const token = sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);