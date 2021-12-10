import { baseApi } from "./utils.js";

const anularOrden = async function () {
  const ruta = "ordenes-compra/anular/orden"

  let orderId = document.getElementById("anular-orderid").value
  let razon = document.getElementById("anular-razon").value

  console.log(`Anulando la orden de id ${orderId} porque ${razon}`)

  const data = {
    id: orderId,
    anulacion: razon
  };
  const respuesta = await postData(`${baseApi}/${ruta}`, data).then(
    (answer) => {
      return answer;
    }
  );
  console.log(respuesta);
  
}

const cambiarParametro = async function () {
  const ruta = "actions/params"

  let paramKeys = document.getElementById("parameter-key");
  let selected = paramKeys.options[paramKeys.selectedIndex].value;

  let value = document.getElementById("parameter-value").value

  console.log(`Actualizando el parametro de key ${selected} al nuevo valor de  ${value}`)

  const data = {
    key: selected,
    value: parseInt(value, 10)
  };

  const respuesta = await postData(`${baseApi}/${ruta}`, data).then(
    (answer) => {
      return answer;
    }
  );
  console.log(respuesta);


}

const crearOC = async function () {

  // Group: <select class="group-opciones" id="create-oc-group"></select>
  // <br>
  // Quantity: <input type="number" id="create-oc-quantity">
  // <br>
  // SKU: <select class="sku-opciones-chicas" id="create-oc-sku"></select>

  const ruta = "actions/create-order"

  let groupNumbers = document.getElementById("create-oc-group");
  let selectedGroup = groupNumbers.options[groupNumbers.selectedIndex].value;

  let quantity = document.getElementById("create-oc-quantity").value

  let skus = document.getElementById("create-oc-sku");
  let selectedSku = skus.options[skus.selectedIndex].value;



  console.log(`Creando OC a grupo ${selectedGroup} por una cantidad ${quantity} del sku ${selectedSku}`)

  const data = {
    group: parseInt(selectedGroup, 10),
    sku: parseInt(selectedSku, 10),
    quantity: parseInt(quantity, 10),
  };

  const respuesta = await postData(`${baseApi}/${ruta}`, data).then(
    (answer) => {
      return answer;
    }
  );
  console.log(respuesta);
}

const cambiarRanking = async function () {
  const ruta = "groups/ranking"

  let groupNumbers = document.getElementById("ranking-group");
  let selected = groupNumbers.options[groupNumbers.selectedIndex].value;

  let cantidad = document.getElementById("ranking-cantidad").value

  console.log(`Actualizando el ranking  del grupo ${selected} al nuevo valor de  ${cantidad}`)

  const data = {
    groupId: parseInt(selected, 10),
    newRanking: parseInt(cantidad, 10)
  };
  const respuesta = await postData(`${baseApi}/${ruta}`, data).then(
    (answer) => {
      return answer;
    }
  );
  console.log(respuesta);
  
}

const forzarDespachoB2B = async function () {

    const ruta = "actions/forceDispatch";

    let cantidad = document.getElementById("force-cantidad").value;
  
    let skus = document.getElementById("force-sku");
    let selected = skus.options[skus.selectedIndex].value;
  
    let destinos = document.getElementById("force-destino");
    let destino = destinos.options[destinos.selectedIndex].value;
  
    let oc = document.getElementById("force-oc").value;
  
  
    console.log(
      `Forzando el despacho de ${cantidad} unidades del sku ${selected} desde nuestro despacho a destino ${destino} por la orden ${oc}`
    );
  
    const data = {
      sku: parseInt(selected, 10),
      quantity: parseInt(cantidad, 10),
      destination: destino,
      oc
    };
  
    const respuesta = await postData(`${baseApi}/${ruta}`, data).then(
      (answer) => {
        return answer;
      }
    );
    console.log(respuesta);
  
}



const moverBodegas = async function () {

  // <h2>B2B -> Mover a bodega (cantidad, SKU, destino, OC)</h2>
  // Cantidad: <input type="number" id="bodegas-cantidad">
  // <br>
  // SKU: <select class="sku-opciones" id="bodegas-sku"></select>
  // <br>
  // Destino: <select class="recepcion-opciones" id="bodegas-destino"></select>
  // <br>
  // Id OC: <input type="text" id="bodegas-oc">
  // <br>

  const ruta = "actions/moveStorage";

  let cantidad = document.getElementById("bodegas-cantidad").value;

  let skus = document.getElementById("bodegas-sku");
  let selected = skus.options[skus.selectedIndex].value;

  let destinos = document.getElementById("bodegas-destino");
  let destino = destinos.options[destinos.selectedIndex].value;

  let orderId = document.getElementById("bodegas-oc").value;


  console.log(
    `Moviendo ${cantidad} cantidad del sku ${selected} desde despacho a destino ${destino} por la orden ${orderId}`
  );

  const data = {
    sku: parseInt(selected, 10),
    quantity: parseInt(cantidad, 10),
    destination: destino,
    orderId
  };

  const respuesta = await postData(`${baseApi}/${ruta}`, data).then(
    (answer) => {
      return answer;
    }
  );
  console.log(respuesta);
};

const moverAlmacenes = async function () {
  const ruta = "actions/move";

  let cantidad = document.getElementById("mover-cantidad").value;
  let sku = document.getElementById("mover-sku");
  let selected = sku.options[sku.selectedIndex].value;
  let origenes = document.getElementById("mover-origen");
  let origen = origenes.options[origenes.selectedIndex].value;
  let destinos = document.getElementById("mover-destino");
  let destino = destinos.options[destinos.selectedIndex].value;

  console.log(
    `Moviendo ${cantidad} cantidad del sku ${selected} desde origen ${origen} a destino ${destino}`
  );

  const data = {
    sku: parseInt(selected, 10),
    quantity: parseInt(cantidad, 10),
    origin: origen,
    destination: destino,
  };

  const respuesta = await postData(`${baseApi}/${ruta}`, data).then(
    (answer) => {
      return answer;
    }
  );
  console.log(respuesta);
};

const pedir = async function () {
  const ruta = "actions/ask";

  let cantidad = document.getElementById("pedir-cantidad").value;
  let sku = document.getElementById("pedir-sku");
  let selected = sku.options[sku.selectedIndex].value;

  console.log(`Pidiendo ${cantidad} cantidad del sku ${selected}`);
  const data = {
    sku: parseInt(selected, 10),
    quantity: parseInt(cantidad, 10),
  };

  const respuesta = await postData(`${baseApi}/${ruta}`, data).then((data) => {
    return data;
  });
  console.log(respuesta);
};

const cocinar = async function () {
  let sku = document.getElementById("cocinar-sku");
  let selected = sku.options[sku.selectedIndex].value;

  console.log(`Cocinando sku ${selected}`);

  const ruta = "actions/ask";

  let cantidad = 1;

  console.log(`Cocinando 1 cantidad del sku ${selected}`);

  const data = {
    sku: parseInt(selected, 10),
    quantity: parseInt(cantidad, 10),
  };

  const respuesta = await postData(`${baseApi}/${ruta}`, data).then((data) => {
    return data;
  });
  console.log(respuesta);
};

const resetOC = async function () {

  let oc = document.getElementById("reset-oc").value;

  const ruta = "ordenes-compra/reset/one";

  console.log(`Reseteando la orden con id ${oc}`);

  const data = {
    id: oc
  };
  const respuesta = await postData(`${baseApi}/${ruta}`, data).then((data) => {
    return data;
  });
  console.log(respuesta);
};


const despachar = async function () {
  let sku = document.getElementById("despachar-sku");
  let selectedSku = sku.options[sku.selectedIndex].value;

  let cantidad = document.getElementById("despachar-cantidad").value;
  let orden = document.getElementById("despachar-order").value;


  console.log(`Despachando ${cantidad} cantidad del sku ${selectedSku} de la ordenId ${orden}`);

  const ruta = "actions/dispatchStorage";

  let direction = "UberEats";
  let price = 1;


  const data = {
    sku: parseInt(selectedSku, 10),
    quantity: parseInt(cantidad, 10),
    price: parseInt(price, 10),
    direction: direction,
    orderId: orden
  };

  const respuesta = await postData(`${baseApi}/${ruta}`, data).then((data) => {
    return data;
  });
  console.log(respuesta);
};



async function postData(url = "", data = {}) {
  // Opciones por defecto estan marcadas con un *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
}

export { cocinar, moverBodegas, pedir, moverAlmacenes , despachar, anularOrden, cambiarRanking, cambiarParametro, crearOC, forzarDespachoB2B, resetOC};
