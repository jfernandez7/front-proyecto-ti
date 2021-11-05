import { baseApi } from "./utils.js";


const despachar = async function () {
  const ruta = "actions/moveStorage";

  let cantidad = document.getElementById("despachar-cantidad").value;
  let skus = document.getElementById("despachar-sku");
  let selected = skus.options[skus.selectedIndex].value;
  let destinos = document.getElementById("despachar-destino");
  let destino = destinos.options[destinos.selectedIndex].value;

  console.log(
    `Moviendo ${cantidad} cantidad del sku ${selected} desde despacho a destino ${destino}`
  );

  const data = {
    sku: parseInt(selected, 10),
    quantity: parseInt(cantidad, 10),
    destination: destino,
  };

  const respuesta = await postData(`${baseApi}/${ruta}`, data).then(
    (answer) => {
      return answer;
    }
  );
  console.log(respuesta);
};

const mover = async function () {
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

async function postData(url = "", data = {}) {
  // Opciones por defecto estan marcadas con un *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
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

export { cocinar, mover, pedir, despachar };
