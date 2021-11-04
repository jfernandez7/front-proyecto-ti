import { baseApi } from "./utils.js";

const mover = function () {

    const ruta = "actions/move";

    let cantidad = document.getElementById("mover-cantidad").value
    let sku = document.getElementById("mover-sku")
    let selected = sku.options[sku.selectedIndex].value
    let origenes = document.getElementById("mover-origen")
    let origen = origenes.options[origenes.selectedIndex].value
    let destinos = document.getElementById("mover-destino")
    let destino = destinos.options[destinos.selectedIndex].value

    console.log(`Moviendo ${cantidad} cantidad del sku ${selected} desde origen ${origen} a destino ${destino}`);


    const data = { 
        sku: parseInt(selected, 10), 
        quantity: parseInt(cantidad,10),
        origin: origen,
        destination: destino
    }

    postData(`${baseApi}/${ruta}`, data).then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });

}

const pedir = async function () {

    const ruta = "actions/ask";

    let cantidad = document.getElementById("pedir-cantidad").value
    let sku = document.getElementById("pedir-sku")
    let selected = sku.options[sku.selectedIndex].value

    console.log(`Pidiendo ${cantidad} cantidad del sku ${selected}`);
    const data = { 
        sku: parseInt(selected, 10), 
        quantity: parseInt(cantidad,10)
    }
    
    const response = postData(`${baseApi}/${ruta}`, data);
    console.log(response);

}

const cocinar = function () {

    let sku = document.getElementById("cocinar-sku")
    let selected = sku.options[sku.selectedIndex].value
    
    console.log(`Cocinando sku ${selected}`);

    // postData(`${baseApi}/${ruta}`, { sku: selected, quantity: cantidad})
    // .then(data => {
    //   console.log(data); // JSON data parsed by `data.json()` call
    // });



}

async function postData(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  
  

export{cocinar, mover, pedir}
