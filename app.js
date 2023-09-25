import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./config/config.js";
import authRouter from "./routes/auth.js";
import {verifyToken} from "./middleware/authJwt.js";
import candidatoRouter from "./routes/candidatos.js";
import solicitudRouter from "./routes/solicitud.js";
import postulacionRouter from "./routes/postulaciones.js";
import departamentoRouter from "./routes/departamentos.js";
import mailerRouter from "./routes/mailer.js";



const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json()); 

app.use("/postulaciones", postulacionRouter);
app.use("/solicitudes", solicitudRouter);
app.use("/candidatos", candidatoRouter); 
app.use("/departamentos", departamentoRouter);
app.use('/auth', authRouter);
app.use('/mailer/', mailerRouter);

app.use('/', (req, res, next) => {
    res.send('Welcome to Talenbase 👷🏾‍♀️👷🏾 API v3.0');
});


app.use((req, res) => {
    res.status(404).send("Not found");
});

app.listen(PORT || 3001, () => {
    console.log(`Server is running on port ${PORT || 3001}`);
});