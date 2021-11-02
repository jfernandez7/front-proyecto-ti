
const allOrders = document.getElementById('all_orders');
const allStocks = document.getElementById('all_stocks');
const allWarehouses = document.getElementById('all_warehouses');

const refreshOrdersButton = document.getElementById('refresh_orders');
const refreshWarehousesButton = document.getElementById('refresh_warehouses');

const refreshStocksButton = document.getElementById('refresh_stocks');
const newOrderButton = document.getElementById('new_order');

const names = {
    '5':	"Harina",
    '10':	"Sal",
    '15':	"Levadura fresca",
    '50':	"Queso mozzarella granulado",
    '60':	"Pepperoni",
    '1000':	"Masa para pizza precocida familiar",
    '5000':	"Pizza pepperoni familiar"
    
}


const refreshOrders = function () {

    console.log('Actualizando ordenes');

}

const refreshStock = async function () {

    console.log('Actualizando stock');


    const stocks = await fetch('http://127.0.0.1:3000/stocks')
    .then(response => response.json())
    .then(data => {
        return data
    });
      
    console.log('stocks', stocks) 
    allStocks.innerHTML = ""; 
    const newList = document.createElement('ul')
    for (index = 0; index < stocks.length; index ++){
        console.log(stocks[index])
        const element = document.createElement('li');
        element.innerHTML = `[${stocks[index].sku}] ${names[stocks[index].sku]} - ${stocks[index].total} `;
        newList.appendChild(element)

    }
    allStocks.appendChild(newList);

}

const refreshWarehouses = async function () {

    console.log('Actualizando warehouses');
    
    const warehouses = await fetch('http://127.0.0.1:3000/ocupacion-dashboard')
    .then(response => response.json())
    .then(data => {
        return data
    });
      
    console.log('ocupacion', warehouses) 
    allWarehouses.innerHTML = ""; 
    const newList = document.createElement('ul')
    for (index = 0; index < warehouses.length; index ++){
        console.log(warehouses[index])
        const element = document.createElement('li');
        element.innerHTML = `[${warehouses[index].nombre}] ${names[stocks[index].cantidad]} / ${stocks[index].total} `;
        newList.appendChild(element)

    }
    allWarehouses.appendChild(newList);

}

const newOrder = function () {

    console.log('Creando nueva orden');

}


refreshOrdersButton.onclick = refreshOrders;
refreshStocksButton.onclick = refreshStock;
refreshWarehousesButton.onclick = refreshWarehouses;
newOrderButton.onclick = newOrder;