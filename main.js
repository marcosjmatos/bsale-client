// const text = input.value
const resultado = document.querySelector('#products');
const container = document.querySelector('.container');
const removeElementButtons = document.querySelectorAll(
  '.btn-outline-danger'
);
const comprarButtons =
  document.querySelectorAll('.btn-primary');
const divisa = '$';
let text;
const URL = 'https://bsale-server.herokuapp.com/';

const searchInput = document.querySelector('#form12');
searchInput.addEventListener('keyup', (e) => {
  e.preventDefault()
  if (e.keyCode === 13) {
    getProducts(e.target.value);
    searchInput.value = '';
  }
});

async function getProducts() {
  let elements = [];
  resultado.innerHTML = '';
  try {
    elements = await loadElement(
      searchInput.value.toLowerCase()
    );
  } catch (err) {
    console.log(err);
  }
  renderizarProductos(elements);
  if (resultado.innerHTML === '') {
    renderizarNoEncontrado();
  }
}
async function loadElement(prod) {
  const res = await fetch(`${URL}products/${prod}`);
  const data = res.json();
  return data;
}

async function getProductsByCat(cat) {
  let elements = [];
  resultado.innerHTML = '';
  try {
    elements = await loadedCategory(cat);
  } catch (err) {
    console.log(err);
  }
  renderizarProductos(elements);
  if (resultado.innerHTML === '') {
    renderizarNoEncontrado();
  }
}
async function loadedCategory(cat) {

  const res = await fetch(`${URL}category/${cat}`);
  const data = res.json();
  return data;
}
function removeElement(event) {
  const buttonClicked = event.target;
  buttonClicked.parent;
}

// Buscador
const input = document.querySelector('#formulario');
const buttonBuscar = document.querySelector('#boton');
if (buttonBuscar) {
  buttonBuscar.addEventListener('click', (e) => {
    e.preventDefault();
    getProducts();
  });
}

async function renderizarListaCategorias() {
  let categorias;
  const lista = document.querySelector('#category_list');
  try {
    const res = await fetch(`${URL}category`);
    categorias = await res.json();
  } catch (err) {
    console.log(err);
  }
  if (!categorias) {
    return;
  }
  for (const categoria of categorias) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'dropdown-item';
    button.setAttribute('type', 'button');
    button.setAttribute('id', categoria.id);
    button.textContent = categoria.name.toUpperCase();
    li.appendChild(button);
    lista.appendChild(li);
  }
// Botones de Categorias
  const categoryButtons = document.querySelectorAll(
    '#category_list > li > button'
  );
  for (let button of categoryButtons) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      getProductsByCat(e.target.id);
    });
  }
}

//Genera las Tarjetas de los productos
function renderizarProductos(productos) {
  productos.forEach((info) => {
// Estructura
    const miNodo = document.createElement('div');
    miNodo.classList.add('card','col-sm-6','col-md-3','m-2');
    miNodo.setAttribute("style","width:18rem")
// Body
    const miNodoCardBody = document.createElement('div');
    miNodoCardBody.classList.add(
      'card-body',
      );
// Titulo
    const miNodoTitle = document.createElement('h5');
    miNodoTitle.classList.add('card-title','m-0');
    miNodoTitle.textContent = info.name;
// Imagen
    const miNodoImagen = document.createElement('img');
    miNodoImagen.classList.add('card-img-top','img-fluid');
    miNodoImagen.setAttribute("alt",`${info.name}`)
    miNodoImagen.setAttribute(
      'src',
      `${
        info.url_image == null || info.url_image == ''
          ? 'https://i.pinimg.com/564x/a3/6b/42/a36b422bb2bebcbd77bba846b83ddf5d.jpg'
          : info.url_image
      }`
    )
// Precio
    const miNodoPrecio = document.createElement('p');
    miNodoPrecio.classList.add('card-text','m-0');
    miNodoPrecio.textContent = `${info.price}${divisa}`;
// Descuento
    const miNodoDescuento = document.createElement('p');
    miNodoDescuento.classList.add('fw-bolder','discountText','m-0');
    miNodoDescuento.textContent = info.discount == 0 ? "" : `${info.discount}% OFF!`;
// Boton
    const miNodoBoton = document.createElement('a');
    miNodoBoton.classList.add(`btn`,`btn-success`,`comprarBtn`);
    miNodoBoton.textContent = 'Comprar';
    miNodoBoton.setAttribute('marcador', info.id);
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoDescuento);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    resultado.appendChild(miNodo);
  });
}
function renderizarNoEncontrado() {
// Estructura
  const miNodo = document.createElement('div');
  miNodo.classList.add('card', 'col-sm-2');
  miNodo.setAttribute("style","width:18rem")
// Body
  const miNodoCardBody = document.createElement('div');
  miNodoCardBody.classList.add(
    'card-body',
  );
// Titulo
  const miNodoTitle = document.createElement('h5');
  miNodoTitle.classList.add('card-title', 'text-wrap');
  miNodoTitle.textContent = 'Producto no encontrado';
// Imagen
  const miNodoImagen = document.createElement('img');
  miNodoImagen.classList.add('card-img-top','img-fluid');
  miNodoImagen.setAttribute(
    'src',
    'https://media.istockphoto.com/vectors/curiosity-magnifying-glass-doodle-cartoon-with-question-marks-vector-id1029271926?s=2048x2048'
  );
  miNodoCardBody.appendChild(miNodoImagen);
  miNodoCardBody.appendChild(miNodoTitle);
  miNodo.appendChild(miNodoCardBody);
  resultado.appendChild(miNodo);
}

renderizarListaCategorias();
getProducts()