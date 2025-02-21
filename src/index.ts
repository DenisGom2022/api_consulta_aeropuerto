import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { pool } from "./coneccion";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", async (request: Request, response: Response) => { 
    const aerolineas = await getAllAerolineas();
    const aeropuertos = await getAllAeropuertos();
    const vuelos = await getAllVuelos();
    const pasajeros = await getAllPasajeros();

    const data = {
        aerolineas,
        aeropuertos,
        vuelos,
        pasajeros
    };

    response.send(data);
}); 

const getAllAerolineas = async () => {
    const [data, metadata] = await pool.query("select * from aerolineas");
    return data;
}

const getAllAeropuertos = async () => {
    const [data, metadata] = await pool.query("select * from aeropuertos");
    return data;
}

const getAllVuelos = async () => {
    const [data, metadata] = await pool.query("select * from vuelos");
    return data;
}

const getAllPasajeros = async () => {
    const [data, metadata] = await pool.query("select * from pasajeros");
    return data;
}

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});