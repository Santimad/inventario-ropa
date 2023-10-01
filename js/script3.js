'use strict';
const TABLE_COLUMNS = 3;
const HEADER_TITLES = ['Producto','Descripcion','Ver más'];
let update = new Date(Date.UTC(2023,8,28,3,0,0));
let opt = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const loadJson = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(json => init(json));
}

const createTable = (products) => {
  const table = document.createElement('table');
  const caption = document.createElement('caption');
  const table_header = createTableHeader();
  //const table_body = createTableBody(products);
  
  caption.textContent = `Última actualización el día  ${update.toLocaleDateString('es-Es', opt)}`;

  table.append(caption);
  table.append(table_header);
  //table.append(table_body);

  return table;
};

const createTableHeader = function() {
  const thead = document.createElement("thead");
  const header_row = document.createElement("tr");
  const table_headers = [];

  for(let i = 0; i < TABLE_COLUMNS; i++){
    table_headers[i]= document.createElement("th");
    table_headers[i].setAttribute('scope','row');
    table_headers[i].textContent = HEADER_TITLES[i];

    header_row.append(table_headers[i]);
  }	

  thead.append(header_row);
  return thead;
}
/*
const createTableBody = function(products) {
  const tbody = document.createElement("tbody");

  for(let i = 0; i < products.length; i++){
    const row = document.createElement('tr');

    for(let j = 0; j < TABLE_COLUMNS; j++){
      const row_cell = document.createElement('td');
      row.append(row_cell);
    }
    tbody.append(row);
  }
  return tbody;
}
*/
const init = (products) => {
  const tableContent = document.querySelector("#table-content");
  const table = createTable(products);

  //addProductsToTable(table, products);

  tableContent.append(table);
}

const addProductsToTable = function(table, products) {
  const rows = table.tBodies[0].rows;
  
    for(let i = 0; i < rows.length; i++) {
      let cells = rows[i].cells;

	for(let td = 0; td < cells.length; td++){
	  if(td == 0){
	    cells[td].textContent = products[i].codigo;	
	  } else if (td == 1){
	    cells[td].textContent = products[i].descripcion;
	  } else {
	    cells[td].innerHTML = 
	      `<img height=32 width=32 data-item='${products[i].codigo}'
		src="icons/acercarse.png" alt="lupa para examinar"/>`; 
	  }
	}
    }
}

const loadDetailPage = (product) => {
  alert('Ok');
}

try{
  loadJson("productos.json");
} catch(err){
  alert(err);
}
