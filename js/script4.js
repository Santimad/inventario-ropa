'use strict';

window.onload = (event) => {
  if(window.location == "http://192.168.0.9:8080/productos/"){
    //alert('ok');
    event.stopPropagation();
  }
  else{
    //loadDetailPage();
  }
};

const loadJson = (url) => {

  fetch(url)
    .then(response => response.json())
    .then(products => {
      for(let item in products){
	generateHTML(products[item]);
      }
    });
};

const generateHTML = function(product){
  const tbody = document.querySelector('table tbody');
  let row;

  if(window.location == "http://192.168.0.9:8080/productos/"){  
    row = createRow(product);
  }
  else if(window.location == "http://192.168.0.9:8080/productos/detalle.html"){
    loadDetailPage(product);
    return;
  }

  tbody.append(row);
}

const redirect = (str) => {
  const BASE_URL = "http://192.168.0.9:8080/productos/";
  window.location = BASE_URL + str;
}

function createRow(product) {
  const row = document.createElement('tr');
  const template = 
    `<td> ${product.codigo} </td>
    <td> ${product.descripcion} </td>
    <td> 
      <img width=32 height=32
	src="icons/acercarse.png" alt="Lupa para examinar">
    </td>`;
  row.innerHTML = template;
  row.cells[2].addEventListener('click', () => {
    if(localStorage.getItem('product.codigo') == null){
      localStorage.setItem(product.id, JSON.stringify(product));
    }
    redirect("detalle.html");

  });
  return row;
}

const loadDetailPage = function(product) {
  let item = localStorage.getItem(product.id);

  if(item == null){
    return;
  } 

  item = JSON.parse(item);
  localStorage.removeItem(item.id);

  const title = document.querySelector('title');
  const description = document.querySelector('#description');
  const product_img = document.querySelector('#img');
  const img = document.createElement('img');
  const price = document.querySelector('#price');
  const score = document.querySelector("#score");
  const ul = document.createElement('ul');
  const button = document.querySelector('.btn_back');

  button.addEventListener('click', (event) => {
    event.preventDefault();
    redirect("");
  });

  const heading = createHeading(item.codigo);
  heading.classList.add('producto_titulo');
  document.body.prepend(heading);
  
  title.textContent = `Detalle ${item.id}`;
  description.innerHTML = `<p class="producto_descripcion"> ${item.descripcion} </p>
        		   <p class="producto_descripcion"> ${item["descripcion-extra"]} </p>`;
  img.src = item.imagen ? item.imagen : "img/no-img.png";
  img.setAttribute('width', 256);
  img.setAttribute('height', 256);
  product_img.append(img);

  price.innerHTML = `<h3> Precio ${item.precio} </h3>`;

  for (let i = 0; i < item.valoracion.length; i++){
    const star = document.createElement("li");

    star.innerHTML = `<i class="fa-solid fa-star star-gold"></i>`;
    ul.append(star);
  }

  score.append(ul);

};

const createHeading = (str) => {
  let h1 = document.createElement('h1');

  h1.textContent = str;
  return h1;
};

try {
  loadJson("productos.json");
}

catch(err){
  alert(err);
}


