const names = {
  5: "Harina",
  10: "Sal",
  15: "Levadura fresca",
  50: "Queso mozzarella granulado",
  60: "Pepperoni",
  70: "Aceituna completa",
  80: "Tomate entero",
  90: "Jamón para pizza",
  100: "Piña en conserva",
  1000: "Masa para pizza precocida familiar",
  1001: "Masa para pizza precocida mediana",
  1070: "Aceituna laminada",
  1080: "Tomate picado",
  1100: "Piña picada",
  5000: "Pizza pepperoni familiar",
  5001: "Pizza pepperoni mediana",
  5005: "Pizzas doble pepperoni familiar",
  5006: "Pizzas doble pepperoni mediana",
  5010: "Pizzas aceituna famiiar",
  5011: "Pizza aceituna mediana",
  5020: "Pizzas Hawaiana familiar",
  50005: "SKU GRUPO 5",
  50015: "SKU GRUPO 15",
};
const commodities = {
  5: "Harina",
  10: "Sal",
  15: "Levadura fresca",
  50: "Queso mozzarella granulado",
  60: "Pepperoni",
  70: "Aceituna completa",
  80: "Tomate entero",
  90: "Jamón para pizza",
  100: "Piña en conserva",
//   1000: "Masa para pizza precocida familiar",
//   1001: "Masa para pizza precocida mediana",
//   1070: "Aceituna laminada",
//   1080: "Tomate picado",
//   1100: "Piña picada",
//   5000: "Pizza pepperoni familiar",
//   5001: "Pizza pepperoni mediana",
//   5005: "Pizzas doble pepperoni familiar",
//   5006: "Pizzas doble pepperoni mediana",
//   5010: "Pizzas aceituna famiiar",
//   5011: "Pizza aceituna mediana",
//   5020: "Pizzas Hawaiana familiar",
//   50005: "SKU GRUPO 5",
//   50015: "SKU GRUPO 15",
};

const groupsDev = {
  "Grupo 1": "6167752d51533a0004922312",
  "Grupo 2": "6167752d51533a0004922317",
  "Grupo 3": "6167752d51533a000492231c",
  "Grupo 4": "6167752d51533a0004922321",
  "Grupo 5": "6167752d51533a0004922326",
  "Grupo 6": "6167752d51533a000492232b",
  "Grupo 7": "6167752d51533a0004922330",
  "Grupo 8": "6167752d51533a0004922335",
  "Grupo 9": "6167752d51533a000492233a",
  "Grupo 10": "6167752d51533a000492233f",
  "Grupo 11": "6167752d51533a0004922344",
  "Grupo 12": "6167752d51533a0004922349",
  "Grupo 13": "6167752d51533a000492234e",
  "Grupo 14": "6167752d51533a0004922353",
  "Grupo 15": "6167752d51533a0004922358",
  "Grupo 16": "6167752d51533a000492235d",
  "Grupo 17": "6167752d51533a0004922362",
};

const groupsProd = {
  "Grupo 1": "618332b7736b2300048b2180",
  "Grupo 2": "618332b7736b2300048b2185",
  "Grupo 3": "618332b7736b2300048b218a",
  "Grupo 4": "618332b7736b2300048b218f",
  "Grupo 5": "618332b7736b2300048b2194",
  "Grupo 6": "618332b7736b2300048b2199",
  "Grupo 7": "618332b7736b2300048b219e",
  "Grupo 8": "618332b7736b2300048b21a3",
  "Grupo 9": "618332b7736b2300048b21a8",
  "Grupo 10": "618332b7736b2300048b21ad",
  "Grupo 11": "618332b7736b2300048b21b2",
  "Grupo 12": "618332b7736b2300048b21b7",
  "Grupo 13": "618332b7736b2300048b21bc",
  "Grupo 14": "618332b7736b2300048b21c1",
  "Grupo 15": "618332b7736b2300048b21c6",
  "Grupo 16": "618332b7736b2300048b21cb",
  "Grupo 17": "618332b7736b2300048b21d0",
};

const recipes = {
  1000: "Masa para pizza precocida familiar",
  1001: "Masa para pizza precocida mediana",
  1070: "Aceituna laminada",
  1080: "Tomate picado",
  1100: "Piña picada",
  5000: "Pizza pepperoni familiar",
  5001: "Pizza pepperoni mediana",
  5005: "Pizzas doble pepperoni familiar",
  5006: "Pizzas doble pepperoni mediana",
  5010: "Pizzas aceituna famiiar",
  5011: "Pizza aceituna mediana",
  5020: "Pizzas Hawaiana familiar",
};

const warehousesNames = [
  "recepcion",
  "despacho",
  "pulmon",
  "cocina",
  "general",
];

// const baseApi = "http://127.0.0.1:8080";
const baseApi = "https://doblequeso5.ing.puc.cl";

function compareNombres(a, b) {
  if (a.nombre < b.nombre) {
    return -1;
  }
  if (a.nombre > b.nombre) {
    return 1;
  }
  return 0;
}

function compareStatus(a, b) {
  if (a.status < b.status) {
    return -1;
  }
  if (a.status > b.status) {
    return 1;
  }
  return 0;
}

// function compareDate( a, b ) {
//   if ( a.status < b.status ){
//     return -1;
//   }
//   if ( a.status > b.status ){
//     return 1;
//   }
//   return 0;
// }

const fillDropDowns = function () {
  var skus = document.getElementsByClassName("sku-opciones");
  var almacenes = document.getElementsByClassName("almacen-opciones");
  var recetas = document.getElementsByClassName("recipe-opciones");
  var destinos = document.getElementsByClassName("destino-opciones");
  var skuChicas = document.getElementsByClassName("sku-opciones-chicas");
  var groups = document.getElementsByClassName("group-opciones")


  // Groups

  for (var i = 0; i < groups.length; i++) {
    let select = groups[i];

    for (let groupNumber = 1; groupNumber <= 17 ; groupNumber ++) {
      var option = document.createElement("option");
      option.value = groupNumber;
      option.text = `group ${groupNumber}`;
      select.appendChild(option);
    }
  }


  for (var i = 0; i < skuChicas.length; i++) {
    let select = skuChicas[i];
    for (const val of Object.entries(commodities)) {
      var option = document.createElement("option");
      option.value = val[0];
      option.text = val[1];
      select.appendChild(option);
    }
  }

  for (var i = 0; i < skus.length; i++) {
    let select = skus[i];

    for (const val of Object.entries(names)) {
      var option = document.createElement("option");
      option.value = val[0];
      option.text = val[1];
      select.appendChild(option);
    }
  }

  for (var i = 0; i < recetas.length; i++) {
    let select = recetas[i];
    for (const val of Object.entries(recipes)) {
      var option = document.createElement("option");
      option.value = val[0];
      option.text = val[1];
      select.appendChild(option);
    }
  }

  for (var i = 0; i < almacenes.length; i++) {
    let select = almacenes[i];

    for (const val of warehousesNames) {
      var option = document.createElement("option");
      option.value = val;
      option.text = val;
      select.appendChild(option);
    }
  }

  for (var i = 0; i < destinos.length; i++) {
    let select = destinos[i];

    for (const val of Object.entries(groupsProd)) {
      var option = document.createElement("option");
      option.value = val[1];
      option.text = val[0];
      select.appendChild(option);
    }
  }
};

export {
  names,
  warehousesNames,
  baseApi,
  recipes,
  groupsDev,
  groupsProd,
  fillDropDowns,
  compareNombres,
  compareStatus,
};
