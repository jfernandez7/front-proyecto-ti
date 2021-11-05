import { names, baseApi, compareNombres, warehousesNames, recipes, groupsDev, groupsProd, fillDropDowns } from "./utils.js"
import { cocinar, mover, pedir, despachar } from "./actions.js";
const allOrders = document.getElementById('all_orders');
const allStocks = document.getElementById('all_stocks');
const allWarehouses = document.getElementById('all_warehouses');

const refreshOrdersButton = document.getElementById('refresh_orders');
const refreshWarehousesButton = document.getElementById('refresh_warehouses');

const refreshStocksButton = document.getElementById('refresh_stocks');
const newOrderButton = document.getElementById('new_order');

const cocinarButton = document.getElementById('cocinar');
const moverButton = document.getElementById('mover');
const pedirButton = document.getElementById('pedir');
const despacharButton = document.getElementById('despachar');


const refreshOrders = function () {

    console.log('Actualizando ordenes');

}
const newOrder = function () {

    console.log('Creando nueva orden');

}

const refreshStock = async function () {

    console.log('Actualizando stock');


    const stocks = await fetch(`${baseApi}/stocks`)
    .then(response => response.json())
    .then(data => {
        return data
    });

    const detailed = await fetch(`${baseApi}/stocks/detailed-stocks`)
    .then(response => response.json())
    .then(data => {
        return data
    });
      
    console.log('stocks', stocks) 
    console.log('detailed', detailed) 

    allStocks.innerHTML = ""; 

    const newTable = document.createElement('table')
    const headersElement = document.createElement('tr')
    const headers = ["SKU", "NOMBRE", "TOTAL EN STOCK", "recepcion", "cocina", "despacho", "pulmon" ]
    for (let i=0; i<7; i++){
        const header = document.createElement('th')
        header.innerHTML = headers[i]
        headersElement.appendChild(header)
    }
    newTable.appendChild(headersElement)
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

        const recepcion = document.createElement('td');
        recepcion.innerHTML = 0
        if (detailed.recepcion[skus[index][0]]){
            recepcion.innerHTML = detailed.recepcion[skus[index][0]]
        }
        line.appendChild(recepcion)

        const cocina = document.createElement('td');
        cocina.innerHTML = 0
        if (detailed.cocina[skus[index][0]]){
            cocina.innerHTML = detailed.cocina[skus[index][0]]
        }
        line.appendChild(cocina)

        const despacho = document.createElement('td');
        despacho.innerHTML = 0
        if (detailed.despacho[skus[index][0]]){
            despacho.innerHTML = detailed.despacho[skus[index][0]]
        }
        line.appendChild(despacho)

        const pulmon = document.createElement('td');
        pulmon.innerHTML = 0
        if (detailed.pulmon[skus[index][0]]){
            pulmon.innerHTML = detailed.pulmon[skus[index][0]]
        }
        line.appendChild(pulmon)

        

        




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

    const newTable = document.createElement('table')
    const headersElement = document.createElement('tr')
    const headers = ["NOMBRE", "OCUPADO", "TOTAL"]
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

        const ocupado = document.createElement('td');
        ocupado.innerHTML = warehouses[index].ocupado;
        line.appendChild(ocupado)

        const total = document.createElement('td');
        total.innerHTML = warehouses[index].total;
        line.appendChild(total)

        newTable.appendChild(line)

    }
    allWarehouses.appendChild(newTable)

}


fillDropDowns();

cocinarButton.onclick = cocinar;
moverButton.onclick = mover;
pedirButton.onclick = pedir;
despacharButton.onclick = despachar;


refreshOrdersButton.onclick = refreshOrders;
refreshStocksButton.onclick = refreshStock;
refreshWarehousesButton.onclick = refreshWarehouses;
newOrderButton.onclick = newOrder;