const listOfProducts1 = 
[
  {
    "codigo":"Pantalón negro OUTDOOR",
    "descripcion":"Pantalón negro deportivo de la Temporada Primavera—Verano. Posee una contextura liviana, ideal para realizar actividades al aire libre. Disponible únicamente en color negro y en talle XL. Material: poliéster y elastano. Lugar de fabricación: China.",
    "descripcion-extra":"Muy cómodo y ligero, además de una estética excepcional.",
    "imagen":"",
    "precio":"$8,240.00",
    "puntuacion":"*****"
  },
  {
    "codigo":"Pantalón negro deportivo",
    "descripcion":"Posee una contextura flexible y resistente, se adapta muy bien a los movimientos del cuerpo. Tiene dos bolsillos con cierre y cordón para ajustar a la cintura. Disponible en color negro y talle XL. Material: poliester. Industria argentina.",
    "descripcion-extra":"",
    "imagen":"",
    "precio":"$7.200,00",
    "puntuacion":"*****"
  },
  {
    "codigo":"Jersey ciclista",
    "descripcion":"Jersey para ciclismo con diseño estampado. Incluye bolsillos en la parte trasera para guardar agua y utilidades. Disponible en talle XXL, XL y L. Fabricado en Argentina.",
    "descripcion-extra":"Hecho de material anti-transpirante, indispensable para realizar esta actividad.",
    "imagen":"",
    "precio":"$9.200,00",
    "puntuacion":"*****"
  }
];

let listOfProducts2;
//alert(items[0].codigo);

fetch("productos.json")
  .then(response => response.text())
  .then(json => {
    //inicio(JSON.parse(json));
    listOfProducts2 = JSON.parse(json);
    inicio(listOfProducts2); 
  });

//window.onload = inicio;

function cleanBody(){
  document.body.innerHTML = "";
}

function loadTable(tableNode, callback) {
  document.body.append(tableNode);

  tableNode.onload = callback();
}

function startUpPage(listOfProducts){
  //alert(listOfProducts);
  const titulo = createTitlePage("Lista de productos");
  const parrafo = document.createElement("p");
  parrafo.textContent = "Este es un inventario con los nuevos artículos deportivos disponibles para esta Temporada Primavera—Verano del vigente año 2023.";
  const table = createTable(listOfProducts);

  document.body.append(titulo);
  document.body.append(parrafo);
  
  //alert(document.querySelectorAll('table tr'));
  loadTable(table, () => {
    const imgs = document.querySelectorAll("table img");
      for(let img of imgs) {
	img.addEventListener('click', () => {
	  for(let product in listOfProducts) {
	    //alert(listOfProducts[product]);
	    if(listOfProducts[product].codigo === img.dataset.item){
	      loadPageOfProduct(listOfProducts, listOfProducts[product]);
	    }
	  }
	  //alert(img.dataset.item);
	});
      }
    //alert(table.rows[1].cells[2].firstChild.dataset.item);
   // table.childNodes[2].addEventListener('click', (evt) => {
   //   alert(evt.target);
   // });
  }); 

}

function createTitlePage(str){
  const title = document.createElement('h1');
  title.textContent = str;

  return title;
}

function createTable(listOfProducts){
  //alert(listOfProducts)
  const table = document.createElement("table");
  
  const caption = document.createElement("caption");
  const table_header = createTableHeader();

  for(let i = 0; i <= listOfProducts.length - 1; i++) {
    const row = document.createElement("tr");
    for(let td = 1; td <= 3; td++){                                                                   const row_cell = document.createElement("td");
        switch(td){
        case 1:
          row_cell.textContent = listOfProducts[i].codigo;
	  break;                                                                                        case 2:
          row_cell.textContent = listOfProducts[i].descripcion;
          break;
	case 3:
          row_cell.innerHTML = `<img height=32 width=32 data-item='${listOfProducts[i].codigo}'
                                src="icons/acercarse.png" alt="lupa para examinar"/>`;
	  break;
        }	
      row.append(row_cell);
    }

    table.append(row);

  }
    
  caption.textContent = "Lista de productos";
  table.append(caption);
  table.append(table_header);


  return table;

}

function createTableHeader() {
  const thead = document.createElement("thead");
  const header_row = document.createElement("tr");
  const table_headers = [];

  for(let i = 0; i <= 2; i++){
    table_headers[i]= document.createElement("th");                                                     table_headers[i].setAttribute('scope','row');
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

function loadPageOfProduct(listOfProducts , product) {
  const template = createTemplateString(product);
  const title = createTitlePage(product.codigo);
  title.classList.add('producto_titulo');

  cleanBody();
  document.body.append(title);
  document.body.innerHTML += template;
  const volver = document.querySelector(".btn_back");
  const score = document.querySelector(".puntuacion");
  
  let stop = product.puntuacion.length;
    for (let i = 0; i < stop; i++){
      //alert(i);
      const star = document.createElement("li");
      star.innerHTML = `<i class="fa-solid fa-star star-gold"></i>`;
      score.append(star);
    }

  volver.addEventListener('click', (e) => {
    e.preventDefault();
    inicio(listOfProducts);
  });
}

function createTemplateString(product){
  return `
    <div class="row">
      <div class="col-12">
      <h2>
        Descripción
      </h2>
      </div>
    </div>
    <div class="row producto">
      <div class="col-6">
        <p class="producto_descripcion">
          ${product.descripcion}
        </p>
        <p class="producto_descripcion">
          ${product["descripcion-extra"]}
        </p>
      </div>
      <div class="col-6">
        <img height=196 width=256
        src="${product.imagen}" alt""
      </div>
    </div>
    <div class="row">
      <div class="col-12">
      <h2 class="precio"> ${product.precio} </h2>
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
}

function inicio(listOfProducts) {
  try{
    cleanBody();
   //alert(listOfProducts2);
    startUpPage(listOfProducts);
  } catch(err) {
    alert(err);
  }
}
/*
 * 
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
*/

