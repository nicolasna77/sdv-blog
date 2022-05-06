import express, { json } from "express";
import knex from "knex";
import knexfile from "./knexfile.js";
import config from "./config.js";
import usersRoute from "./routes/User.js";
import cors from "cors";
import { Model } from "objection";
import postsRoute from "./routes/Post.js";
import commentsRoute from "./routes/Com.js";

const app = express();
const db = knex(knexfile);

Model.knex(db);

app.use(json());
app.use(cors());

usersRoute({ app, db });
postsRoute({ app, db });
commentsRoute({ app, db });

app.listen(config.port, () => console.log("Listening on :" + config.port));
