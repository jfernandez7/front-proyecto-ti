const names = {
    5: "Harina",
    10: "Sal",
    15: "Levadura fresca",
    50: "Queso mozzarella granulado",
    60: "Pepperoni",
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

export {names, warehousesNames, baseApi, compareNombres}