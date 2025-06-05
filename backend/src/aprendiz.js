import express, { response } from "express";

import connection from "./conexion.js";


let aprendiz = express.Router();

aprendiz.get("/aprendiz/listarTodos", async (req, res) => {
  let consulta = "SELECT * from aprendiz";

  try {
    let [resultado] = await connection.query(consulta);

    res.send({ resultado });
    res.send({
      estado: "ok",
      data: resultado
    });

  }
  catch (e) {
    res.status(500).send({
      estado: "error",
      data: "Hay un error",
    });
  }
  
    
});


//listar por id
aprendiz.get("/aprendiz/buscarId/:id", async (req, res) => {
  
  try {
    let idAprendiz = req.params.id;
    let consulta = "SELECT * FROM aprendiz where id = ?";
    let [resultado] = await connection.query(consulta, [idAprendiz]);
    
    if (resultado.length == 0) {
      res.send({ res: "No hay datos con el id: " + idAprendiz });
      res.send({
        estado: "Datos vacios",
        data: resultado,
      });
    }

    res.send({ resultado });
    res.send({
      estado: "ok",
      data: resultado,
    });
  }
  catch (e) {
    res.status(500).send({
      estado: "error",
      data: e.code + "=>" + e.message,
    })
    
  }
});


aprendiz.post("/aprendiz/agregarAprendiz", async (req, res) => {
  try {
    let datosUsuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      correo: req.body.correo,
    }

    let consulta = "INSERT INTO aprendiz SET  ?";

    let [resultado] = await connection.query(consulta, [datosUsuario]);

     res.send({ resultado });
    res.send({
      estado: "ok",
      data: resultado,
    });

  }
  catch(er) {
    res.send({
      estado: "ok",
      data: er.message,
    });
  }
});

//Actualizar aprendices
aprendiz.put("/aprendiz/actualizarAprendiz/:id", async (req, res) => {
  try {

    let   id = req.params.id;
    let datosUsuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      correo: req.body.correo,
    }

    let consulta = "UPDATE aprendiz set ? where id= ?";

    let [resultado] = await connection.query(consulta, [datosUsuario,id]);

     res.send({ resultado });
    res.send({
      estado: "ok",
      data: resultado,
    });

  }
  catch(e) {
    res.send({
      estado: "ok",
      data: e.message,
    });
  }
});


aprendiz.put("/aprendiz/eliminarAprendiz/:id", async (req, res) => {
  try {

    let id = req.params.id;
    let consulta = "DELETE FROM  aprendiz where id = ?";

    let [resultado] = await connection.query(consulta, [id]);

     res.send({ resultado });
    res.send({
      estado: "ok",
      data: resultado,
    });

  }
  catch(e) {
    res.send({
      estado: "ok",
      data: e.message,
    });
  }
})

export default aprendiz;
