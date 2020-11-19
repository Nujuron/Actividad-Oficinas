import { oficinas } from "../JSON/oficinas.js";
// window.onload = function createFilter() {
//     document.body.childNodes[3].firstElementChild.firstElementChild.appendChild(createElementText("p", "Isla"));
//     var input = document.createElement("input");
//     input.type = "text";
//     input.id = "isla";
//     document.body.childNodes[3].firstElementChild.firstElementChild.appendChild(input)
//     document.body.childNodes[3].firstElementChild.firstElementChild.appendChild(createElementText("p", "Municipio"));
//     var input = document.createElement("input");
//     input.type = "text";
//     input.id = "muninicipio";
//     document.body.childNodes[3].firstElementChild.firstElementChild.appendChild(input)
//     var input = document.createElement("input");
//     input.type = "button";
//     input.id = "filter";

//     document.body.childNodes[3].firstElementChild.firstElementChild.appendChild(input)
//     var input = document.createElement("input");
//     input.type = "button";
//     input.id = "cancel";

//     document.body.childNodes[3].firstElementChild.firstElementChild.appendChild(input)
// }

/**
 * MyMethod
 * * Metodo para recoger user input para un filtrado
 */
function getData() {
    let zoneIsla = document.getElementById("isla"); // primer parametro para filtrar
    let zoneMuni = document.getElementById("municipio"); // segundo parametro para filtrar 
    let isla = zoneIsla.value; //valor de la isla
    let muni = zoneMuni.value; //valor del municipio
    zoneIsla.value = ""; //reseteamos el campo isla
    zoneMuni.value = ""; //reseteamos el campo muni
    if (isla == "" && muni == "") {
        showOficinas(oficinas);
    }
    else {
        filterByData(isla, muni);
    }
}
/**
 * * Filtrado dependiendo de los parametros
 * @param {*} isla Isla introducida por el usuario 
 * @param {*} municipio Municipio introducido por el usuario
 */
function filterByData(isla, municipio) {
    let filteredArray = [];

    filteredArray = oficinas.filter(element => (element.islaTxt.toLowerCase() == isla.toLowerCase()) || (element.municipioTxt.toLowerCase() == municipio.toLowerCase()))

    showOficinas(filteredArray);
}
/**
 * * Ordenamiento y presentacion de la informacion
 * @param {*} toShow Array con el contenido a mostrar
 */
function showOficinas(toShow) {
    removeNodes() //borrado de nodos
    let arrayIsla = toShow.map(element => element.islaTxt) //tenemos un array con todas las islas en el conjunto
    let uniqIsla = [...new Set(arrayIsla)] //ahora no tenemos repeticiones

    uniqIsla.forEach(isla => {
        let newDivIsla = document.createElement("div"); //crear nodo que engloba toda la informacion de una isla
        newDivIsla.className = "isla";
        newDivIsla.appendChild(createElementText("h1", `${isla}`))
        document.body.childNodes[3].lastElementChild.lastElementChild.appendChild(newDivIsla) //lo añadimos al final del section#content
        let arrayMuni = toShow.filter(element => element.islaTxt.toLowerCase() == isla.toLowerCase()).map(element => element.municipioTxt) //tenemos un array con todos los municipios de una isla
        let uniqMuni = [...new Set(arrayMuni)] //ahora no tenemos repeticiones

        uniqMuni.forEach(muni => {
            let newDivMuni = document.createElement("div"); //crear nodo que engloba toda la informacion de un municipio
            newDivMuni.className = "municipio";
            document.body.childNodes[3].lastElementChild.lastElementChild.lastElementChild.appendChild(createElementText("h3", `${muni}`))
            document.body.childNodes[3].lastElementChild.lastElementChild.lastElementChild.appendChild(newDivMuni) //lo añadimos al final del ultimo div.isla
            
            toShow.forEach(office => {
                if (office.municipioTxt == muni && office.islaTxt == isla) {
                    createNodeOffice(office);
                }
            })

        })
    })
}
/**
 * * Crea un nodo con la información de una oficina concreta
 * @param {*} office Objeto oficina
 */
function createNodeOffice(office) {
    let newDiv = document.createElement("div");
    newDiv.className = "oficina";
    newDiv.appendChild(createElementText("h4", "Oficina"))
    newDiv.appendChild(createElementText("p", `${office.oficina}`))
    newDiv.appendChild(createElementText("h4", "Direccion"))
    newDiv.appendChild(createElementText("p", `${office.direccion}`))
    newDiv.appendChild(createElementText("h4", "Teléfono"))
    newDiv.appendChild(createElementText("p", `${office.telefono}`))
    document.body.childNodes[3].lastElementChild.lastElementChild.lastElementChild.lastElementChild.appendChild(newDiv)
}
/**
 * * Crea una etiqueta html del tipo y texto de los parametros
 * @param {*} type Etiqueta que queremos crear
 * @param {*} text Texto dentro de la etiqueta
 */
function createElementText(type, text) {
    let template = document.createElement(type)
    template.appendChild(document.createTextNode(text))
    return template
}
/**
 * * Remueve todos los nodos de oficinas
 */
function removeNodes() {
    let myNode = document.body.childNodes[3].lastElementChild.lastElementChild
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}
/**
 * * Suprime todos los nodos de oficinas
 */
function cancelButton() {
    let zoneIsla = document.getElementById("isla"); // primer parametro para filtrar
    let zoneMuni = document.getElementById("municipio"); // segundo parametro para filtrar 
    zoneIsla.value = ""; //reseteamos el campo isla
    zoneMuni.value = ""; //reseteamos el campo muni
    getData();
}
document.getElementById("filter").addEventListener("click", getData);
document.addEventListener("DOMContentLoaded", getData)
document.getElementById("cancel").addEventListener("click", cancelButton);