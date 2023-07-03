import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./config/config.js";

import solicitudTestRouter from "./routes/solicitud.js";



const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(
    "/solicitudes",
    solicitudTestRouter,
);

app.listen(PORT || 3001, () => {
    console.log(`Server is running on port ${PORT || 3001}`);
});

app.use((req, res) => {
    res.status(404).send("Not found");
});
