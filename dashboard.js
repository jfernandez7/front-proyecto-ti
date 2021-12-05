import { names, baseApi, compareNombres, compareStatus, warehousesNames, recipes, groupsDev, groupsProd, fillDropDowns } from "./utils.js"
import { cocinar, despachar, pedir, moverAlmacenes, moverBodegas, anularOrden } from "./actions.js";
const allOrdersInternal = document.getElementById('all_orders_internal');
const allOrdersExternal = document.getElementById('all_orders_external');
const allStocks = document.getElementById('all_stocks');
const allWarehouses = document.getElementById('all_warehouses');

const refreshOrdersButton = document.getElementById('refresh_orders_internal');
const refreshOrdersExternalButton = document.getElementById('refresh_orders_external');
const refreshWarehousesButton = document.getElementById('refresh_warehouses');

const refreshStocksButton = document.getElementById('refresh_stocks');
// const newOrderButton = document.getElementById('new_order');

const anularButton = document.getElementById('anular');
const cocinarButton = document.getElementById('cocinar');
const moverBodegaButton = document.getElementById('mover-bodega');
const moverAlmacenButton = document.getElementById('mover-almacenes');
const pedirButton = document.getElementById('pedir');
const despacharButton = document.getElementById('despachar');

const filtrarOrdenesButton = document.getElementById('filter_orders_internal');
const desfiltrarOrdenesButton = document.getElementById('unfilter_orders_internal');


let allOrdersTable = document.createElement('table');
let inProcessOrdersTable = document.createElement('table');

const filterOrders = function() {
    allOrdersInternal.innerHTML = ""
    allOrdersInternal.appendChild(inProcessOrdersTable)
}

const unfilterOrders = function() {
    allOrdersInternal.innerHTML = ""
    allOrdersInternal.appendChild(allOrdersTable)
}


const refreshExternalOrders = async function () {

    console.log('Actualizando ordenes externas');

    const orders = await fetch(`${baseApi}/ordenes-compra/external`)
    .then(response => response.json())
    .then(data => {
        return data
    });
    console.log(orders);
    allOrdersExternal.innerHTML = ""; 

    orders.sort(compareStatus);


    orders.sort(function(a,b){
        return new Date(b.fechaEntrega) - new Date(a.fechaEntrega);
    });

    const newTable = document.createElement('table')
    const headersElement = document.createElement('tr')
    const headers = ["_id", "estado", "sku", "cantidad", "cantidadDespachada", "fechaEntrega", "fechaDespachos", "cliente", "proveedor", "canal", "precioUnitario", "urlNotificacion"]

    for (let i=0; i<headers.length; i++){
        const header = document.createElement('th')
        header.innerHTML = headers[i]
        headersElement.appendChild(header)
    }
    newTable.appendChild(headersElement)

    for (let index = 0; index < orders.length; index ++){
        const line = document.createElement('tr');

        const id = document.createElement('td');
        id.innerHTML = orders[index]._id;
        line.appendChild(id)

        const state = document.createElement('td');
        state.innerHTML = orders[index].estado;
        line.appendChild(state)

        const sku = document.createElement('td');
        sku.innerHTML = orders[index].sku;
        line.appendChild(sku)

        const quantity = document.createElement('td');
        quantity.innerHTML = orders[index].cantidad;
        line.appendChild(quantity)

        const quantityDelivered = document.createElement('td');
        quantityDelivered.innerHTML = orders[index].cantidadDespachada;
        line.appendChild(quantityDelivered)

        const deliveryDate = document.createElement('td');
        let day  = new Date(orders[index].fechaEntrega);
        deliveryDate.innerHTML = day.toLocaleString();
        line.appendChild(deliveryDate);

        const dispatchDate = document.createElement('td');
        dispatchDate.innerHTML = orders[index].fechaDespachos;
        line.appendChild(dispatchDate)

        const client = document.createElement('td');
        client.innerHTML = orders[index].cliente;
        line.appendChild(client)

        const supplier = document.createElement('td');
        supplier.innerHTML = orders[index].proveedor;
        line.appendChild(supplier)

        const channel = document.createElement('td');
        channel.innerHTML = orders[index].canal;
        line.appendChild(channel)        

        const price = document.createElement('td');
        price.innerHTML = orders[index].precioUnitario;
        line.appendChild(price)

        const urlNotification = document.createElement('td');
        urlNotification.innerHTML = orders[index].urlNotificacion;
        line.appendChild(urlNotification)
        

        newTable.appendChild(line)

    }
    allOrdersExternal.appendChild(newTable)


}

const refreshOrders = async function () {

    console.log('Actualizando ordenes internas');

    const orders = await fetch(`${baseApi}/ordenes-compra/internal`)
    .then(response => response.json())
    .then(data => {
        return data
    });
    console.log(orders);
    allOrdersInternal.innerHTML = ""; 

    orders.sort(compareStatus);


    const newTable = document.createElement('table')
    const partialTable = document.createElement('table')
    const headersElement = document.createElement('tr')

    const partialHeadersElement = document.createElement('tr')

    const headers = ["id", "orderId", "state", "inProcess", "sku", "quantity", "quantityDelivered", "cookedQuantity", "createdAt", "updatedAt", "deliveryDate", "urlNotification", "channel", "client", "supplier"]

    for (let i=0; i<headers.length; i++){
        const header = document.createElement('th')
        header.innerHTML = headers[i]
        headersElement.appendChild(header)

        const header2 = document.createElement('th')
        header2.innerHTML = headers[i]
        partialHeadersElement.appendChild(header2)
    }
    newTable.appendChild(headersElement)
    partialTable.appendChild(partialHeadersElement)

    for (let index = 0; index < orders.length; index ++){
        let line = document.createElement('tr');

        let id = document.createElement('td');
        id.innerHTML = orders[index].id;
        line.appendChild(id)

        let orderId = document.createElement('td');
        orderId.innerHTML = orders[index].orderId;
        line.appendChild(orderId)

        let state = document.createElement('td');
        state.innerHTML = orders[index].state;
        line.appendChild(state)

        let inProcess = document.createElement('td');
        inProcess.innerHTML = orders[index].inProcess;
        line.appendChild(inProcess)

        let sku = document.createElement('td');
        sku.innerHTML = orders[index].sku;
        line.appendChild(sku)
        
        let quantity = document.createElement('td');
        quantity.innerHTML = orders[index].quantity;
        line.appendChild(quantity)
        
        let quantityDelivered = document.createElement('td');
        quantityDelivered.innerHTML = orders[index].quantityDelivered;
        line.appendChild(quantityDelivered)

        let cookedQuantity = document.createElement('td');
        cookedQuantity.innerHTML = JSON.stringify(orders[index].cookedQuantity);
        line.appendChild(cookedQuantity)

        let createdAt = document.createElement('td');
        let day  = new Date(orders[index].createdAt);
        createdAt.innerHTML = day.toLocaleString();
        line.appendChild(createdAt)
        
        let updatedAt = document.createElement('td');
        day = new Date(orders[index].updatedAt);
        updatedAt.innerHTML = day.toLocaleString();
        line.appendChild(updatedAt)
        
        let deliveryDate = document.createElement('td');
        day = new Date(orders[index].deliveryDate);
        deliveryDate.innerHTML = day.toLocaleString();
        line.appendChild(deliveryDate)

        let urlNotification = document.createElement('td');
        urlNotification.innerHTML = orders[index].urlNotification;
        line.appendChild(urlNotification)
        
        let channel = document.createElement('td');
        channel.innerHTML = orders[index].channel;
        line.appendChild(channel)
    
        let client = document.createElement('td');
        client.innerHTML = orders[index].client;
        line.appendChild(client)

        let supplier = document.createElement('td');
        supplier.innerHTML = orders[index].supplier;
        line.appendChild(supplier)

        newTable.appendChild(line)

        if (orders[index].state == "aceptada" && orders[index].inProcess == true){
            line = document.createElement('tr');

            id = document.createElement('td');
            id.innerHTML = orders[index].id;
            line.appendChild(id)

            orderId = document.createElement('td');
            orderId.innerHTML = orders[index].orderId;
            line.appendChild(orderId)

            state = document.createElement('td');
            state.innerHTML = orders[index].state;
            line.appendChild(state)

            inProcess = document.createElement('td');
            inProcess.innerHTML = orders[index].inProcess;
            line.appendChild(inProcess)

            sku = document.createElement('td');
            sku.innerHTML = orders[index].sku;
            line.appendChild(sku)
            
            quantity = document.createElement('td');
            quantity.innerHTML = orders[index].quantity;
            line.appendChild(quantity)
            
            quantityDelivered = document.createElement('td');
            quantityDelivered.innerHTML = orders[index].quantityDelivered;
            line.appendChild(quantityDelivered)

            cookedQuantity = document.createElement('td');
            cookedQuantity.innerHTML = JSON.stringify(orders[index].cookedQuantity);
            line.appendChild(cookedQuantity)

            createdAt = document.createElement('td');
            let day  = new Date(orders[index].createdAt);
            createdAt.innerHTML = day.toLocaleString();
            line.appendChild(createdAt)
            
            updatedAt = document.createElement('td');
            day = new Date(orders[index].updatedAt);
            updatedAt.innerHTML = day.toLocaleString();
            line.appendChild(updatedAt)
            
            deliveryDate = document.createElement('td');
            day = new Date(orders[index].deliveryDate);
            deliveryDate.innerHTML = day.toLocaleString();
            line.appendChild(deliveryDate)

            urlNotification = document.createElement('td');
            urlNotification.innerHTML = orders[index].urlNotification;
            line.appendChild(urlNotification)
            
            channel = document.createElement('td');
            channel.innerHTML = orders[index].channel;
            line.appendChild(channel)
        
            client = document.createElement('td');
            client.innerHTML = orders[index].client;
            line.appendChild(client)

            supplier = document.createElement('td');
            supplier.innerHTML = orders[index].supplier;
            line.appendChild(supplier)


            partialTable.appendChild(line)
        }
        
    }
    allOrdersInternal.appendChild(newTable)
    allOrdersTable = newTable;
    inProcessOrdersTable = partialTable;

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
    const headers = ["SKU", "NOMBRE", "TOTAL EN STOCK", "recepcion", "cocina", "despacho", "pulmon", "general" ]
    for (let i=0; i<8; i++){
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

        const general = document.createElement('td');
        general.innerHTML = 0
        if (detailed.general[skus[index][0]]){
            general.innerHTML = detailed.general[skus[index][0]]
        }
        line.appendChild(general)

        

        




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

anularButton.onclick = anularOrden
cocinarButton.onclick = cocinar;
moverAlmacenButton.onclick = moverAlmacenes;
moverBodegaButton.onclick = moverBodegas;
pedirButton.onclick = pedir;
despacharButton.onclick = despachar;


refreshOrdersButton.onclick = refreshOrders;
refreshOrdersExternalButton.onclick = refreshExternalOrders;
refreshStocksButton.onclick = refreshStock;
refreshWarehousesButton.onclick = refreshWarehouses;

filtrarOrdenesButton.onclick = filterOrders;
desfiltrarOrdenesButton.onclick = unfilterOrders;

// newOrderButton.onclick = newOrder;