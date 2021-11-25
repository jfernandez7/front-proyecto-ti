import { names, baseApi, compareNombres, compareStatus, warehousesNames, recipes, groupsDev, groupsProd, fillDropDowns } from "./utils.js"
import { cocinar, despachar, pedir, moverAlmacenes, moverBodegas } from "./actions.js";
const allOrders = document.getElementById('all_orders');
const allStocks = document.getElementById('all_stocks');
const allWarehouses = document.getElementById('all_warehouses');

const refreshOrdersButton = document.getElementById('refresh_orders');
const refreshWarehousesButton = document.getElementById('refresh_warehouses');

const refreshStocksButton = document.getElementById('refresh_stocks');
// const newOrderButton = document.getElementById('new_order');

const cocinarButton = document.getElementById('cocinar');
const moverBodegaButton = document.getElementById('mover-bodega');
const moverAlmacenButton = document.getElementById('mover-almacenes');
const pedirButton = document.getElementById('pedir');
const despacharButton = document.getElementById('despachar');


const refreshOrders = async function () {

    console.log('Actualizando ordenes');

    const orders = await fetch(`${baseApi}/ordenes-compra`)
    .then(response => response.json())
    .then(data => {
        return data
    });

    allOrders.innerHTML = ""; 

    orders.sort(compareStatus);


    const newTable = document.createElement('table')
    const headersElement = document.createElement('tr')
    const headers = ["id", "orderId", "client", "supplier", "sku", "deliveryDate", "quantity", "quantityDelivered", "urlNotification", "state", "channel", "cookedQuantity", "createdAt", "updatedAt" ]
    for (let i=0; i<14; i++){
        const header = document.createElement('th')
        header.innerHTML = headers[i]
        headersElement.appendChild(header)
    }
    newTable.appendChild(headersElement)

    for (let index = 0; index < orders.length; index ++){
        const line = document.createElement('tr');

        const id = document.createElement('td');
        id.innerHTML = orders[index].id;
        line.appendChild(id)

        const orderId = document.createElement('td');
        orderId.innerHTML = orders[index].orderId;
        line.appendChild(orderId)

        const client = document.createElement('td');
        client.innerHTML = orders[index].client;
        line.appendChild(client)

        const supplier = document.createElement('td');
        supplier.innerHTML = orders[index].supplier;
        line.appendChild(supplier)

        const sku = document.createElement('td');
        sku.innerHTML = orders[index].sku;
        line.appendChild(sku)
        
        const deliveryDate = document.createElement('td');
        deliveryDate.innerHTML = orders[index].deliveryDate;
        line.appendChild(deliveryDate)
        
        const quantity = document.createElement('td');
        quantity.innerHTML = orders[index].quantity;
        line.appendChild(quantity)
        
        const quantityDelivered = document.createElement('td');
        quantityDelivered.innerHTML = orders[index].quantityDelivered;
        line.appendChild(quantityDelivered)
        
        const urlNotification = document.createElement('td');
        urlNotification.innerHTML = orders[index].urlNotification;
        line.appendChild(urlNotification)
        
        const state = document.createElement('td');
        state.innerHTML = orders[index].state;
        line.appendChild(state)
        
        const channel = document.createElement('td');
        channel.innerHTML = orders[index].channel;
        line.appendChild(channel)
        
        const cookedQuantity = document.createElement('td');
        cookedQuantity.innerHTML = orders[index].cookedQuantity;
        line.appendChild(cookedQuantity)
        
        const createdAt = document.createElement('td');
        createdAt.innerHTML = orders[index].createdAt;
        line.appendChild(createdAt)
        
        const updatedAt = document.createElement('td');
        updatedAt.innerHTML = orders[index].updatedAt;
        line.appendChild(updatedAt)


        newTable.appendChild(line)

    }
    allOrders.appendChild(newTable)

}



// const newOrder = function () {

//     console.log('Creando nueva orden');

// }

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
moverAlmacenButton.onclick = moverAlmacenes;
moverBodegaButton.onclick = moverBodegas;
pedirButton.onclick = pedir;
despacharButton.onclick = despachar;


refreshOrdersButton.onclick = refreshOrders;
refreshStocksButton.onclick = refreshStock;
refreshWarehousesButton.onclick = refreshWarehouses;
// newOrderButton.onclick = newOrder;