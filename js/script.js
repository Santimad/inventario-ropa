let titulo_pagina = document.querySelector('h1');
titulo_pagina.textContent = "Listado de productos";

fetch("productos.json")
  .then(response => response.text())
  .then(productos => localStorage.setItem('productos', products));
//No sé porque no fué suficiente con response.json()
//tuve que tomar la ruta larga  
let listOfProducts = JSON.parse(localStorage.getItem('products'));
//alert(listaDeProductos[0].codigo);

try{
  document.body.innerHTML = "";
  document.body.append(createTable(listOfProducts));
}
catch(err){
  alert(err);
}

function createPageOfProduct(item){
  alert(item.codigo);
}

function createTable(products){
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  const table_header = createTableHeader();

  for(let i = 0; i <= products.length - 1; i++) {

    const row = document.createElement("tr");

    for(let td = 1; td <= 3; td++){
      const row_cell = document.createElement("td");

	switch(td){
	case 1:
	  row_cell.textContent = products[i].codigo;
	  break;
	case 2:
	  row_cell.textContent = products[i].descripcion;
	  break;
	case 3:
	  row_cell.innerHTML = `<img height=32 width=32
				src="icons/acercarse.png" alt="lupa para examinar"/>`;
	  row_cell.addEventListener("click", () => {
	    createPageOfProduct(products[i]);  
	    localStorage.setItem(products[i].codigo, products[i]);
	  });
	  break;
	}

      row.append(row_cell);

    }

    caption.textContent = "Lista de productos";
    table.append(caption);
    table.append(table_header);
    table.append(row);

  }

  return table;
}

function createTableHeader() {
  const thead = document.createElement("thead");
  const header_row = document.createElement("tr");
  const table_headers = [];
   
  for(let i = 0; i <= 2; i++){
    table_headers[i]= document.createElement("th");
    table_headers[i].setAttribute('scope','row');
  }

  table_headers[0].textContent = "Productos";
  table_headers[1].textContent = "Descripcion";
  table_headers[2].textContent = "Ver más";

  for(let i = 0; i <= 2; i++){
    header_row.append(table_headers[i]);
  }
  
  thead.append(header_row);
  
  return thead;
}


 
