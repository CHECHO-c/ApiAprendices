import express, { response } from "express";

import conexion from "./conexion.js";


let ficha = express.Router();


ficha.post("/ficha/agregarFicha", async (request, response) => {
    
    try {
        let datosFicha = {
        id: request.body.id,
        nombre: request.body.nombre,
        fecha_inicio: request.body.fecha_inicio,
        fecha_fin: request.body.fecha_fin,
        estado: request.body.estado}


        let consulta = "INSERT INTO ficha SET ?";

        let [resultado] = await conexion.query(consulta, [datosFicha]);
        
        response.send({ resultado });
        response.send({
            estado: "OK",
            data : resultado,
        })
        


    }
    catch(error) {
        response.status(500).send({
            estado: "error",
            data: error.message
        })
    }
    
    





    
})


ficha.get("/ficha/verFichas", async (request, response) => {
    try {
        let consulta = "SELECT * FROM ficha";
        let [resultado] = await conexion.query(consulta);

        response.send({ resultado });
        response.send({
            estado: "OK",
            data : resultado,
        })


    }
    catch (error) {
         response.status(500).send({
            estado: "error",
            data: error.message
        })
    }
    
});


ficha.get("/ficha/buscarFicha/:id", async (request, response) => {
    try {

        let id = request.params.id;
        let consulta = "SELECT * FROM ficha WHERE id = ?";
        let [resultado] = await conexion.query(consulta,[id]);

        response.send({ resultado });
        response.send({
            estado: "OK",
            data : resultado,
        })


    }
    catch (error) {
         response.status(500).send({
            estado: "error",
            data: error.message
        })
    }
    
});


ficha.put("/ficha/editarFicha/:id", async (request, response) => {
    try { 

        let id = request.params.id;
        let datosFicha = {
        nombre: request.body.nombre,
        fecha_inicio: request.body.fecha_inicio,
        fecha_fin: request.body.fecha_fin,
        estado: request.body.estado}


        let consulta = "UPDATE ficha SET ? where id=?";

        let [resultado] = await conexion.query(consulta, [datosFicha,id]);
        
        response.send({ resultado });
        response.send({
            estado: "OK",
            data : resultado,
        })
        


    }
    catch(error) {
        response.status(500).send({
            estado: "error",
            data: error.message
        })
    }
});


export default ficha;