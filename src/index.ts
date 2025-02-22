import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { pool } from "./coneccion";
import cors from "cors";

// configures dotenv to work in your application
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", async (request: Request, response: Response) => { 
    try{
        const aerolineas = await getAllDataTable("aerolineas");
        const aeropuertos = await getAllDataTable("aeropuertos");
        const vuelos = await getAllDataTable("vuelos");
        const pasajeros = await getAllDataTable("pasajeros");
        const beneficios = await getAllDataTable("beneficios");
        const clases = await getAllDataTable("clases");
        const colaboradores = await getAllDataTable("colaboradors");
        const departamentos = await getAllDataTable("departamentos");
        const municipios = await getAllDataTable("departamentos");
        const vuelo_colaboradores = await getAllDataTable("vuelo_colaboradors"); 
    
        const data = {
            aerolineas,
            aeropuertos,
            vuelos,
            pasajeros,
            beneficios,
            clases,
            colaboradores,
            departamentos,
            municipios,
            vuelo_colaboradores
        };
    
        response.send(data);
    }catch(error){
        response.status(500).send({message:"error en api"})
    }
}); 

const getAllDataTable = async (table:string) => {
    const [data, metadata] = await pool.query("select * from " + table);
    return data;
};

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});