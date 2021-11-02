import { names, baseApi, compareNombres, warehousesNames } from "./utils.js"
const allOrders = document.getElementById('all_orders');
const allStocks = document.getElementById('all_stocks');
const allWarehouses = document.getElementById('all_warehouses');

const refreshOrdersButton = document.getElementById('refresh_orders');
const refreshWarehousesButton = document.getElementById('refresh_warehouses');

const refreshStocksButton = document.getElementById('refresh_stocks');
const newOrderButton = document.getElementById('new_order');




const refreshOrders = function () {

    console.log('Actualizando ordenes');

}

const refreshStock = async function () {

    console.log('Actualizando stock');


    const stocks = await fetch(`${baseApi}/stocks`)
    .then(response => response.json())
    .then(data => {
        return data
    });
      
    console.log('stocks', stocks) 
    allStocks.innerHTML = ""; 

    // ---------------------------------------------------------- MODO LISTA

    // const newList = document.createElement('ul')
    // for (index = 0; index < stocks.length; index ++){
    //     console.log(stocks[index])
    //     const element = document.createElement('li');
    //     element.innerHTML = `[${stocks[index].sku}] ${names[stocks[index].sku]} - ${stocks[index].total} `;
    //     newList.appendChild(element)

    // }

    // allStocks.appendChild(newList);

    const newTable = document.createElement('table')
    const headersElement = document.createElement('tr')
    const headers = ["SKU", "NOMBRE", "TOTAL EN STOCK"]
    for (let i=0; i<3; i++){
        const header = document.createElement('th')
        header.innerHTML = headers[i]
        headersElement.appendChild(header)
    }
    newTable.appendChild(headersElement)

    // ---------------------------------------------------------- MODO TABLA PARCIAL

    // for (index = 0; index < stocks.length; index ++){
    //     console.log(stocks[index])
    //     const line = document.createElement('tr');

    //     const sku = document.createElement('td');
    //     sku.innerHTML = stocks[index].sku;
    //     line.appendChild(sku)

    //     const nombre = document.createElement('td');
    //     nombre.innerHTML = names[stocks[index].sku];
    //     line.appendChild(nombre)

    //     const total = document.createElement('td');
    //     total.innerHTML = stocks[index].total;
    //     line.appendChild(total)

    //     newTable.appendChild(line)

    // }

    // ---------------------------------------------------------- MODO TABLA TOTAL
    const skus = Object.entries(names)
    

    for (let index = 0; index < skus.length; index ++){
        const line = document.createElement('tr');

        const sku = document.createElement('td');
        sku.innerHTML = skus[index][0];
        line.appendChild(sku)

        const nombre = document.createElement('td');
        nombre.innerHTML = skus[index][1];
        line.appendChild(nombre)

        const total = document.createElement('td');
        total.innerHTML = 0
        for (let i = 0; i < stocks.length; i++){
            if (stocks[i].sku == skus[index][0]){
                total.innerHTML = stocks[i].total
            }
        }
        line.appendChild(total)

        newTable.appendChild(line)

    }
    allStocks.appendChild(newTable)

}

const refreshWarehouses = async function () {

    console.log('Actualizando warehouses');
    
    const warehouses = await fetch(`${baseApi}/ocupacion-dashboard`)
    .then(response => response.json())
    .then(data => {
        return data
    });

    warehouses.sort(compareNombres);
      
    console.log('ocupacion', warehouses) 
    allWarehouses.innerHTML = ""; 

    // const newList = document.createElement('ul')
    // for (index = 0; index < warehouses.length; index ++){
    //     console.log(warehouses[index])
    //     const element = document.createElement('li');
    //     element.innerHTML = `[${warehouses[index].nombre}] ${names[stocks[index].cantidad]} / ${stocks[index].total} `;
    //     newList.appendChild(element)

    // }
    // allWarehouses.appendChild(newList);

    const newTable = document.createElement('table')
    const headersElement = document.createElement('tr')
    const headers = ["NOMBRE", "CANTIDAD", "TOTAL"]
    for (let i = 0; i < 3; i++){
        const header = document.createElement('th')
        header.innerHTML = headers[i]
        headersElement.appendChild(header)
    }

    newTable.appendChild(headersElement)
    for (let index = 0; index < warehouses.length; index ++){
        console.log(warehouses[index])
        const line = document.createElement('tr');

        const nombre = document.createElement('td');
        nombre.innerHTML = warehouses[index].nombre;
        line.appendChild(nombre)

        const cantidad = document.createElement('td');
        cantidad.innerHTML = warehouses[index].cantidad;
        line.appendChild(cantidad)

        const total = document.createElement('td');
        total.innerHTML = warehouses[index].total;
        line.appendChild(total)

        newTable.appendChild(line)

    }
    allWarehouses.appendChild(newTable)

}

const newOrder = function () {

    console.log('Creando nueva orden');

}


refreshOrdersButton.onclick = refreshOrders;
refreshStocksButton.onclick = refreshStock;
refreshWarehousesButton.onclick = refreshWarehouses;
newOrderButton.onclick = newOrder;