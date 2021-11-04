const names = {
    5: "Harina",
    10: "Sal",
    15: "Levadura fresca",
    50: "Queso mozzarella granulado",
    60: "Pepperoni",
    1000: "Masa para pizza precocida familiar",
    5000: "Pizza pepperoni familiar"
    
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
}

export {names, warehousesNames, baseApi, recipes, fillDropDowns, compareNombres}