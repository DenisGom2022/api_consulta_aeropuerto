var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import dotenv from "dotenv";
import { pool } from "./coneccion";
// configures dotenv to work in your application
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const aerolineas = yield getAllAerolineas();
    const aeropuertos = yield getAllAeropuertos();
    const vuelos = yield getAllVuelos();
    const pasajeros = yield getAllPasajeros();
    const data = {
        aerolineas,
        aeropuertos,
        vuelos,
        pasajeros
    };
    response.send(data);
}));
const getAllAerolineas = () => __awaiter(void 0, void 0, void 0, function* () {
    const [data, metadata] = yield pool.query("select * from aerolineas");
    return data;
});
const getAllAeropuertos = () => __awaiter(void 0, void 0, void 0, function* () {
    const [data, metadata] = yield pool.query("select * from aeropuertos");
    return data;
});
const getAllVuelos = () => __awaiter(void 0, void 0, void 0, function* () {
    const [data, metadata] = yield pool.query("select * from vuelos");
    return data;
});
const getAllPasajeros = () => __awaiter(void 0, void 0, void 0, function* () {
    const [data, metadata] = yield pool.query("select * from pasajeros");
    return data;
});
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
