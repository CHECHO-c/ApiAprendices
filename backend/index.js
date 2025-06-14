
import express from "express";
import "dotenv/config";
import aprendiz from "./src/aprendiz.js";
import ficha from "./src/fichas.js";
import cors from "cors"
//maluma baby


const app = express();

app.use(express.json());
app.use(cors());
app.use("/", aprendiz);
app.use("/",ficha);

//Primer ruta


app.get("/", (req, res) => {
    res.send('Hola mundo del node.js exprress y las abiertas apis!')
    
});
const puerto = 4000;
app.listen(puerto, () => {
    console.log(`Api ejecutandose en el puerto ${puerto}`)
});