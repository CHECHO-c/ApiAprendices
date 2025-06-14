    import '../scss/style.scss'
    import * as bootstrap from 'bootstrap'

const url = "http://localhost:4000/aprendiz/";



function llenarTabla(datos) {
    const aprendizes = datos.resultado;
    console.log(aprendizes)
    aprendizes.forEach(aprendiz => {
        let tablaAprendiz = document.querySelector("#tablaAprendizes")


        let fila = document.createElement("tr");

        let idTd = document.createElement("td")
        let nombreTd = document.createElement("td")
        let apeliidoTd = document.createElement("td")
        let correoTd = document.createElement("td")



        let id = document.createTextNode(aprendiz.id)
        let nombre = document.createTextNode(aprendiz.nombre)
        let apeliido = document.createTextNode(aprendiz.apellido)
        let correo = document.createTextNode(aprendiz.correo)
        

        idTd.appendChild(id)
        nombreTd.appendChild(nombre)
        apeliidoTd.appendChild(apeliido)
        correoTd.appendChild(correo)

        fila.appendChild(idTd)
        fila.appendChild(nombreTd)
        fila.appendChild(apeliidoTd)
        fila.appendChild(correoTd)

        tablaAprendiz.appendChild(fila);



        

        
        
    });
    
}

function cargarAprendizes() {
    fetch(url + "listarTodos")
    .then(response => response.json())
        .then((datos) => {
            llenarTabla(datos);
    })    
    
}

cargarAprendizes();