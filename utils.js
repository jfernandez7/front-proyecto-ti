const names = {
    5: "Harina",
    10: "Sal",
    15: "Levadura fresca",
    50: "Queso mozzarella granulado",
    60: "Pepperoni",
    1000: "Masa para pizza precocida familiar",
    5000: "Pizza pepperoni familiar",
    50005: "SKU GRUPO 5",
    50015:"SKU GRUPO 15"
}

const groups = {
  "6167752d51533a0004922312": "Grupo 1",
  "6167752d51533a0004922317": "Grupo 2",
  "6167752d51533a000492231c": "Grupo 3",
  "6167752d51533a0004922321": "Grupo 4",
  "6167752d51533a0004922326": "Grupo 5",
  "6167752d51533a000492232b": "Grupo 6",
  "6167752d51533a0004922330": "Grupo 7",
  "6167752d51533a0004922335": "Grupo 8",
  "6167752d51533a000492233a": "Grupo 9",
  "6167752d51533a000492233f": "Grupo 10",
  "6167752d51533a0004922344": "Grupo 11",
  "6167752d51533a0004922349": "Grupo 12",
  "6167752d51533a000492234e": "Grupo 13",
  "6167752d51533a0004922353": "Grupo 14",
  "6167752d51533a0004922358": "Grupo 15",
  "6167752d51533a000492235d": "Grupo 16",
  "6167752d51533a0004922362": "Grupo 17",
}

const recipes = {
  1000: "Masa para pizza precocida familiar",
  5000: "Pizza pepperoni familiar"
}

const warehousesNames = ["recepcion", "despacho", "pulmon", "cocina"]

const baseApi = 'http://127.0.0.1:3000'

function compareNombres( a, b ) {
    if ( a.nombre < b.nombre ){
      return -1;
    }
    if ( a.nombre > b.nombre ){
      return 1;
    }
    return 0;
  }

const fillDropDowns = function(){
  var skus = document.getElementsByClassName("sku-opciones");
  var almacenes = document.getElementsByClassName("almacen-opciones");
  var recetas = document.getElementsByClassName("recipe-opciones");
  var destinos = document.getElementsByClassName("destino-opciones");

  for(var i = 0; i < skus.length; i++) {
      let select = skus[i];
  
      for (const val of Object.entries(names))
      {
          var option = document.createElement("option");
          option.value = val[0];
          option.text = val[1];
          select.appendChild(option);
      }
  }

  for(var i = 0; i < recetas.length; i++) {
      let select = recetas[i];
      for (const val of Object.entries(recipes))
      {
          var option = document.createElement("option");
          option.value = val[0];
          option.text = val[1];
          select.appendChild(option);
      }
  }

  for(var i = 0; i < almacenes.length; i++) {
      let select = almacenes[i];
  
      for (const val of warehousesNames)
      {
          var option = document.createElement("option");
          option.value = val;
          option.text = val;
          select.appendChild(option);
      }
  }

  for(var i = 0; i < destinos.length; i++) {
    let select = destinos[i];

    for (const val of Object.keys(groups))
    {
        var option = document.createElement("option");
        option.value = val;
        option.text = groups[val];
        select.appendChild(option);
    }
  }
}

export {names, warehousesNames, baseApi, recipes, groups, fillDropDowns, compareNombres}