let titlePage = document.querySelector('h1');
titlePage.textContent = "Listado de productos";

fetch("productos.json")
  .then(response => response.text())
  .then(productos => init(productos));

if(localStorage.length){
  localStorage.clear();
}

function init(p) {
  let arrayOfProducts = JSON.parse(p);
  const contentList = document.getElementById("content-table");
  try{
    contentList.append(createTable(arrayOfProducts));
  }
  catch(err){
    alert(err);
  }
}
function createPageOfProduct(item, callback){
  const firstParagraph = document.body.querySelector("p");

  titlePage.textContent = item.codigo;
  titlePage.classList.add("producto_titulo");
  firstParagraph.hidden = true;
  window["content-table"].innerHTML = "";
  const section = document.createElement("section");
  section.innerHTML = 
    `<div class="row">
      <div class="col-12">
      <h2>
	Descripción
      </h2>
      </div>
    </div>
    <div class="row producto">
      <div class="col-6">
	<p class="producto_descripcion">
	  ${item.descripcion}
	</p>
	<p class="producto_descripcion">
	  ${item["descripcion-extra"]}
	</p>
      </div>
      <div class="col-6">
	<img height=196 width=256
	src="${item.imagen}" alt""
      </div>
    </div>
    <div class="row">
      <div class="col-12">
      <h3 class="precio"> ${item.precio} </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
      <ul class="puntuacion">
      </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
      <a href="" class="btn_back">
	<img height=32 width=32 class="arrow_left"
	src="icons/left-arrow.png" alt="Fecha izquierda para volver atrás"/>
	<span class="arrow-left">
	Volver
	</span>
      </a>
      </div>
    </div> `;
  document.body.append(section);
  section.onload = callback();
  
  
  //setTimeout(() => {
  //  window["content-item"].append(h2);
  //}, 1000);

  /*
  product_description.innerHTML = 
  `<p class="producto_descripcion"> ${item.descripcion}  </p>
   <p class="producto_descripcion"> ${item["descripcion-extra"]} </p>`;
*/
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
	    createPageOfProduct(products[i], () => {
	      const score = document.querySelector(".puntuacion");
	      let stop = products[i].puntuacion.length;
	      for (let i = 0; i < stop; i++){
		//alert(i);
		const star = document.createElement("li");
		star.innerHTML = `<i class="fa-solid fa-star star-gold"></i>`;
		score.append(star);
	      }
	    });  
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
/* Si agrego esta funcion se rompe
function createTableBody(products){

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
	    createPageOfProduct(products[i], () => {
	      const score = document.querySelector(".puntuacion");
	      let stop = products[i].puntuacion.length;
	      for (let i = 0; i < stop; i++){
		//alert(i);
		const star = document.createElement("li");
		star.innerHTML = `<i class="fa-solid fa-star star-gold"></i>`;
		score.append(star);
	      }
	    });  
	    localStorage.setItem(products[i].codigo, products[i]);
	  });
	  break;
	}
      row.append(row_cell);
    }

}
*/ 
