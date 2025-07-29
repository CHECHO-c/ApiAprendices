import '../scss/style.scss'
import * as bootstrap from 'bootstrap'
import Swal from 'sweetalert2';

const url = "http://localhost:4000/aprendiz/";
const modalAprendiz = new bootstrap.Modal(document.getElementById('frmAprendiz'))
const frmAprendiz = document.querySelector("#frmAprendiz");
const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputCorreo = document.querySelector("#correo");
const inputId = document.querySelector("#idAprendiz");

var opcion = ""

document.addEventListener("DOMContentLoaded", cargarAprendizes);

function llenarTabla(datos) {   
    const aprendizes = datos.resultado;
  
    if (aprendizes.length < 1){
        const contenedorPrincipal = document.querySelector("#contenedorPrincipal");
        contenedorPrincipal.replaceChildren();
        contenedorPrincipal.classList.add("text-center")

        let h1 = document.createElement("h1");
        let botonCrear = document.createElement("button");
        botonCrear.classList.add("btn", "btn-success");
        botonCrear.setAttribute("id","btnFormAprendiz")

        h1.innerText = "No hay aprendices para mostrar";
        botonCrear.innerText = "Agregar Aprendiz"
        
        
        
        contenedorPrincipal.appendChild(h1);
        contenedorPrincipal.appendChild(botonCrear);

        let btnCrear = document.querySelector("#btnFormAprendiz").addEventListener('click', () => {

            modalAprendiz.toggle();
            inputId.value = "";
            inputApellido.value = "";
            inputNombre.value="";
            inputCorreo.value = "";
            opcion = "crear";
            

            });
    }
    else {
        let tablaAprendiz = document.querySelector("#tablaAprendizes")

        if (!tablaAprendiz) {
            setTimeout(() => {
                location.reload();
            },1000)
            
            
        }


            tablaAprendiz.innerHTML = "";
        aprendizes.forEach(aprendiz => {
        
            


            let fila = document.createElement("tr");

            let idTd = document.createElement("td")
            let nombreTd = document.createElement("td")
            let apeliidoTd = document.createElement("td")
            let correoTd = document.createElement("td")
            let editarTd = document.createElement("td")
            let eliminarTd = document.createElement("td")


            let botonEditar = document.createElement("button");
            botonEditar.classList.add("btn", "btn-warning", "shadow", "m-1");

            let botonEliminar = document.createElement("button");
            botonEliminar.classList.add("btn", "btn-danger", "m-1","shadow");

            botonEditar.innerText = 'Editar'
            botonEliminar.innerText = 'Eliminar'

            let id = document.createTextNode(aprendiz.id)
            let nombre = document.createTextNode(aprendiz.nombre)
            let apeliido = document.createTextNode(aprendiz.apellido)
            let correo = document.createTextNode(aprendiz.correo)
            
            idTd.appendChild(id)
            nombreTd.appendChild(nombre)
            apeliidoTd.appendChild(apeliido)
            correoTd.appendChild(correo)
            editarTd.appendChild(botonEditar)
            eliminarTd.appendChild(botonEliminar)


            fila.appendChild(idTd)
            fila.appendChild(nombreTd)
            fila.appendChild(apeliidoTd)
            fila.appendChild(correoTd)
            fila.appendChild(editarTd)
            fila.appendChild(eliminarTd)


            tablaAprendiz.appendChild(fila);
        
        



        

        
        
    });
    }


    
    
}   

function cargarAprendizes() {
    fetch(url + "listarTodos")
    .then(response => response.json())
        .then((datos) => {
                llenarTabla(datos);
            
            
    })    
    
}

let btnCrear = document.querySelector("#btnFormAprendiz").addEventListener('click', () => {
    modalAprendiz.toggle();
    inputId.value = "";
    inputApellido.value = "";
    inputNombre.value="";
    inputCorreo.value = "";
    opcion = "crear";

});
let btnCerrar = document.querySelector("#btnCerrarModal").addEventListener('click', () => { modalAprendiz.hide(); });

//Conectarnos con la api y usamos el evento submit para enviar datos
frmAprendiz.addEventListener('submit', (e) => {
    e.preventDefault();
    if (opcion == "crear") { 
        
        let datosAprendiz = {
             "id": inputId.value,
             "nombre" :inputNombre.value,
             "apellido" : inputApellido.value,
             "correo" : inputCorreo.value
        }

       

        fetch(url + "agregarAprendiz", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(datosAprendiz),
        })
            .then((response)=>response.json())
            .then((response) => {
                console.log(response)
                if (response.resultado.affectedRows == 1) {
            Swal.fire({
            title: "Bien hecho!",
            text: "Aprendiz insertado con exito!",
            icon: "success"
            });
                    
                    
                    
                    let tablaAprendiz = document.querySelector("#tablaAprendizes");
                            
                    let tr = document.createElement("tr");

                    let idTd = document.createElement("td")
                    let nombreTd = document.createElement("td")
                    let apeliidoTd = document.createElement("td")
                    let correoTd = document.createElement("td")
                    let editarTd = document.createElement("td")
                    let eliminarTd = document.createElement("td")

                    idt

                    let botonEditar = document.createElement("button");
                    botonEditar.classList.add("btn", "btn-warning", "shadow", "m-1");

                    let botonEliminar = document.createElement("button");
                    botonEliminar.classList.add("btn", "btn-danger", "m-1","shadow");

                    botonEditar.innerText = 'Editar';
                    botonEliminar.innerText = 'Eliminar';

                    
        }
            })

        
        
        
        modalAprendiz.hide();
        
        cargarAprendizes();
    }

    if (opcion == "editar") {
        
    }
})
