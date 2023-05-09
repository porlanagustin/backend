import express, {json, urlencoded } from 'express';
import session from "express-session";
import mongoose from "mongoose";
import os from "os";
import router from './routes/routes.js';
import invalidUrl from './middlewares/invalidUrl.js';
import cluster from "cluster";
import passport from "passport";
import { engine } from "express-handlebars";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { passportStrategies } from './lib/passport.lib.js';

mongoose.set('strictQuery', true);

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const cpus = os.cpus();
const PORT = 8080;

if (cluster.isPrimary) {
    cpus.map(() => {
        cluster.fork()
    });

    cluster.on('exit', (worker) => {
        console.log(`WORKER ${worker.process.pid} died`);
        cluster.fork();
    })
} else {

    // USE
    app.use("/", router);
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(express.static("src/uploads"));
    app.use(invalidUrl);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(
      session({
        secret: "porlan",
        rolling: true,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 600000,
        },
      })
    );

    // PASSPORT
    passport.use("login", passportStrategies.loginStrategy);
    passport.use("register", passportStrategies.registerStrategy);
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser(async (id, done) => {
      const data = await User.findById(id);
      done(null, data);
    });

    // HANDLEBARS
    app.engine(
        "hbs",
        engine({
          extname: ".hbs",
          defaultLayout: "main.html",
          layoutsDir: join(__dirname, "/views/layouts"),
          partialsDir: join(__dirname, "/views/partials"),
        })
      );

      app.set("view engine", "hbs");
      app.set("views", join(__dirname, "/views"));

      // CONNECT TO DATABASE
      const connectToDatabase = async () => {
        try {
          await mongoose.connect(
            "mongodb+srv://admin:admin123@backend.luoh6dz.mongodb.net/test"
          );
          console.log("Database connected!");
        } catch (error) {
          console.error("Error connecting to database:", error);
        }
      };
      await connectToDatabase();

      app.listen(PORT, () => {
        console.log(`Server lsitening port ${PORT}`)
      })

}