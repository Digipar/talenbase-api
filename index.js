import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./config/config.js";
import authRouter from "./routes/auth.js";
import {verifyToken} from "./middleware/authJwt.js";
import candidatoRouter from "./routes/candidatos.js";
import solicitudRouter from "./routes/solicitud.js";
import postulacionRouter from "./routes/postulaciones.js";
import departamentoRouter from "./routes/departamentos.js";



const app = express();
app.use(cors());

app.use(bodyParser.json()); 


app.use("/postulaciones", postulacionRouter);
app.use("/solicitudes", solicitudRouter);
app.use("/candidatos", candidatoRouter); 
app.use("/departamentos", departamentoRouter);
app.use('/auth', authRouter);


app.listen(PORT || 3001, () => {
    console.log(`Server is running on port ${PORT || 3001}`);
});

app.use((req, res) => {
    res.status(404).send("Not found");
});
