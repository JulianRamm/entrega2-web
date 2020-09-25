/**
 * constante para la sección del la barra de navegación
 */
const navBar = document.getElementById("nav");
/**
 * constante para la sección del menú de  la barra de navegación
 */
const navMenu = document.getElementById("nav-menu");

/**
 * constante para la sección del banner de la página
 */
const banner = document.getElementById("banner");

/**
 * constante para la sección del login
 */
const login = document.getElementById("Login");

/**
 * constante para la sección del registro
 */
const register = document.getElementById("register");

/**
 * constante para la sección acerca de nosotros
 */
const aboutUs = document.getElementById("aboutUs");

/**
 * constante para la sección del a quien ayudamos
 */
const who = document.getElementById("who");

/**
 * constante para la sección de las personas que hemos ayudado
 */
const testimonies = document.getElementById("testimonies");

/**
 * constante para la sección para hacer donaciones
 */
const donation = document.getElementById("donation");

/**
 * constante para la sección de los mapas de donaciones
 */
const maps = document.getElementById("maps");

/**
 * constante para la sección de fudaciones a las que puedes donar
 */
const organizationMap = document.getElementById("organizationMap");

/**
 * constante para la sección de personas que se pueden ayudar
 */
const peopleMap = document.getElementById("peopleMap");

/**
 * constante para manejar la geolocalización del usuario
 */
const Geolocation = navigator.geolocation;

/**
 * variable que permite el manejo de los marcadores del mapa de organizaciones
 */
let organizationMarkers = [];

/**
 * variable que permite el manejo de los marcadores del mapa de personas
 */
let peopleMarkers = [];

/**
 * constante para la sección de reporte de personas
 */
const report = document.getElementById("report");

/**
 * constante para el boton ingresas
 */
const ingresarButton = document.getElementById("ingresarbtn");

/**
 * constante para el boton donar
 */
let Donarbutton = null;

/**
 * constante para el boton donar de la barra de navegación
 */
const donarNavButton = document.getElementById("donarNav");

/**
 * constante con la llave para Google maps
 */

const mapsKey = "AIzaSyDnpwgQdxEq3I_zF_yoI1wTn8vY8arbUUI";
/**
 * constante para el logo de usuario
 */
const userLogo = document.getElementById("user-logo");
userLogo.hidden = true;
/**
 * constante para el nombre de usuario
 */
const userName = document.getElementById("user-name");
userName.hidden = true;

/**
 * constante para hacer logout
 */
const logout = document.getElementById("logout");
logout.hidden = true;

checkLogin();

/**
 * Función que cambia de la sección de login a la de registro
 */
function LoginToRegister() {
  login.hidden = true;
  register.hidden = false;
  document
    .getElementById("registerLink")
    .removeEventListener("click", LoginToRegister);
}
document
  .getElementById("registerLink")
  .addEventListener("click", LoginToRegister);

/**
 * Función que cambia de la sección de registro a la de login
 */
function RegisterToLogin() {
  login.hidden = false;
  register.hidden = true;
  document
    .getElementById("IniciarSesionLink")
    .removeEventListener("click", RegisterToLogin);
}
document
  .getElementById("IniciarSesionLink")
  .addEventListener("click", RegisterToLogin);

/**
 * Función que muestra la sección de login al oprimir el boton ingresar
 */
function showLogin() {
  login.hidden = false;
  banner.hidden = true;
  aboutUs.hidden = true;
  testimonies.hidden = true;
  donation.hidden = true;
  maps.hidden = true;
  ingresarButton.hidden = true;
  navMenu.hidden = true;
  who.hidden = true;
  report.hidden = true;
  ingresarButton.removeEventListener("click", showLogin);
}
ingresarButton.addEventListener("click", showLogin);

/**
 * funcion que muestra los mapas de los posibles lugares/personas de donacion al oprimir el boton donar
 * del formulario
 */
function showMaps() {
  if (!validarFormulario()) {
    document.getElementById("lbl-incorrect").hidden = false;
    maps.hidden = true;
    document.getElementById("mapa-organizaciones").hidden = true;
    document.getElementById("mapa-personas").hidden = true;
    return;
  }
  document.getElementById("lbl-incorrect").hidden = true;
  let tipo = document.getElementById("tipo-receptor").value;
  if (tipo === "si") {
    maps.hidden = false;
    document.getElementById("mapa-personas").hidden = true;
    document.getElementById("mapa-organizaciones").hidden = false;
    mapCreator(organizationMap, organizationMarkers);
  } else if (tipo === "no") {
    maps.hidden = false;
    document.getElementById("mapa-organizaciones").hidden = true;
    document.getElementById("mapa-personas").hidden = false;
    mapCreator(peopleMap, peopleMarkers);
  }
}

function validarFormulario() {
  let tipo = tipoDonacion.value;
  let form = document.getElementById("donacion");
  if (tipo === "Ropa") {
    if (
      form.checkValidity() === false ||
      $("input[type=checkbox]:checked").length < 1
    ) {
      return false;
    }
  } else {
    if (form.checkValidity() === false) {
      return false;
    }
  }
  return true;
}

/**
 * Funcion que muestra la opcion de donar desde la seccion de login o registro
 */
function showDonar() {
  document.getElementById("lbl-incorrect").hidden = true;
  donation.hidden = false;
}
donarNavButton.addEventListener("click", showDonar);

/**
 * Funcion para modificar el formulario de donación según cada caso
 */
let tipoDonacion = document.getElementById("tipo-donacion");
let pagos = document.getElementById("payment-options");
let modoPago = document.getElementById("modo-pago");

tipoDonacion.addEventListener("change", modifyDonationForm);
function modifyDonationForm() {
  maps.hidden = true;
  document.getElementById("mapa-organizaciones").hidden = true;
  document.getElementById("mapa-personas").hidden = true;
  document.getElementById("lbl-incorrect").hidden = true;
  let tipo = tipoDonacion.value;
  if (tipo === "¿Qué deseas donar?") {
    //Caso ninguna
    resetFormDonacion();
  } else if (tipo === "Ropa") {
    //Caso ropa
    resetFormDonacion();
    let estado = document.createElement("div");
    estado.classList.add("form-group");
    estado.classList.add("input-group");
    estado.innerHTML = `<div class="input-group-prepend">
        <span class="input-group-text">
            <i class="fas fa-tshirt"></i>
        </span>
      </div>
      <select class="form-control" id="estado-ropa" required>
        <option selected="" value="">¿En qué estado se encuentra?</option>
        <option>Usada</option>
        <option>Nueva</option>
        <option>Tengo de ambos tipos</option>
      </select>`;

    let genero = document.createElement("div");
    genero.classList.add("form-group");
    genero.classList.add("input-group");
    genero.innerHTML = `<div class="input-group-prepend">
        <span class="input-group-text">
          <i class="fas fa-venus-mars"></i>
        </span>
      </div>
      <select class="form-control" id="genero-ropa" required>
        <option selected="" value="">¿A quién le sirve la ropa?</option>
        <option>Mujeres</option>
        <option>Hombres</option>
        <option>Ambos</option>
      </select>`;

    let persona = document.createElement("div");
    persona.classList.add("form-group");
    persona.classList.add("input-group");
    persona.innerHTML = `<div class="input-group-prepend">
        <span class="input-group-text">
          <i class="fas fa-user-friends"></i>
        </span>
      </div>
      <label class="label-form">¿Y a qué tipo de personas?</label>`;

    let checks = document.createElement("div");
    checks.classList.add("form-group");
    checks.innerHTML = `<div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="bebes">
      <label class="custom-control-label" for="bebes">Bebes</label>
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="ninos">
      <label class="custom-control-label" for="ninos">Niños</label>
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="adultos">
      <label class="custom-control-label" for="adultos">Adultos</label>
    </div>`;

    //Agregar los elementos al html
    const form = document.getElementById("donacion");
    form.appendChild(estado);
    form.appendChild(genero);
    form.appendChild(persona);
    form.appendChild(checks);
    addTipoYBoton();
  } else if (tipo === "Comida") {
    //Caso comida
    resetFormDonacion();

    let receptor = document.createElement("div");
    receptor.classList.add("form-group");
    receptor.classList.add("input-group");
    receptor.innerHTML = `<div class="input-group-prepend">
        <span class="input-group-text">
          <i class="fas fa-user-friends"></i>
        </span>
      </div>
      <select class="form-control" id="tipo-persona" required>
        <option selected="" value="">¿A quién quisieras donar?</option>
        <option>Niños</option>
        <option>Adultos/Ancianos</option>
        <option>Cualquiera</option>
      </select>`;

    let tipoComida = document.createElement("div");
    tipoComida.classList.add("form-group");
    tipoComida.classList.add("input-group");
    tipoComida.innerHTML = `<div class="input-group-prepend">
      <span class="input-group-text">
        <i class="fas fa-utensils"></i>
      </span>
    </div>
    <select class="form-control" id="tipo-comida" required>
      <option selected="" value="">¿Qué tipo de comida es?</option>
      <option>Lista para consumir</option>
      <option>Requiere preparación</option>
      <option>Tengo de ambos tipos</option>
    </select>`;

    //Agregar los elementos al html
    const form = document.getElementById("donacion");
    form.appendChild(receptor);
    form.appendChild(tipoComida);
    addTipoYBoton();
  } else if (tipo === "Dinero") {
    //Caso dinero
    resetFormDonacion();
    let a = document.getElementById("paypal-button-container");
    a.style.display="block";
    let monto = document.createElement("div");
    monto.classList.add("form-group");
    monto.classList.add("input-group");
    monto.innerHTML = `<div class="input-group-prepend">
      <span class="input-group-text">
        <i class="fas fa-dollar-sign"></i>
      </span>
    </div>
    <input required type="number" value="50000" min="1000" step="1000" data-number-to-fixed="2" data-number-stepfactor="1000" class="form-control currency" id="monto-dinero" />`;
/*     if(pagos.style.display==="none"){
      pagos.style.display="block"
    } */
    let modoPago = document.createElement("div");
    modoPago.classList.add("form-group");
    modoPago.classList.add("input-group");
    modoPago.innerHTML = `<div class="input-group-prepend">
      <span class="input-group-text">
        <i class="fas fa-money-bill-wave"></i>
      </span>
    </div>
    <select class="form-control" id="modo-pago" required>
      <option selected="" value="">¿Qué modalidad prefieres?</option>
      <option>Directamente con el beneficiario</option>
      <option>Pago online inmediato</option>
    </select>
    `; 

    //Agregar los elementos al html
    const form = document.getElementById("donacion");
    form.appendChild(monto);
    form.appendChild(modoPago);
    addTipoYBoton();
  } else {
    //Caso otros
    resetFormDonacion();

    let otro = document.createElement("div");
    otro.classList.add("form-group");
    otro.innerHTML = `<label for="otros-value">Por favor especifica que deseas donar</label>
    <textarea required class="form-control" id="otros-value" rows="3"></textarea>`;

    //Agregar los elementos al html
    const form = document.getElementById("donacion");
    form.appendChild(otro);
    addTipoYBoton();
  }
}

//Borrar el formulario
function resetFormDonacion() {
  let form = tipoDonacion.parentNode.parentNode;

  while (form.firstElementChild !== form.lastElementChild) {
    form.removeChild(form.lastElementChild);
  }
}

//Funcion para agregar el campo de tipo de receptor y boton para donar
function addTipoYBoton() {
  //Tipo receptor
  let receptor = document.createElement("div");
  receptor.classList.add("form-group");
  receptor.classList.add("input-group");
  receptor.innerHTML = `<div class="input-group-prepend">
      <span class="input-group-text">
        <i class="fas fa-home"></i>
      </span>
    </div>
    <select class="form-control" id="tipo-receptor" required>
      <option selected="" value="">¿Deseas donar a una fundación?</option>
      <option value="si">Si</option>
      <option value="no">No, prefiero donar directamente a personas que lo necesitan</option>
    </select>`;
  document.getElementById("donacion").appendChild(receptor);

  //Botón
  // let button = document.createElement("button");
  // button.type = "button";
  // button.id = "donarbtn";
  // button.classList.add("btn");
  // button.classList.add("btn-primary");
  // button.classList.add("btn-block");
  // button.textContent = "Donar";

  Donarbutton = document.getElementById("donarbtn");
  Donarbutton.addEventListener("click", showMaps);
  //document.getElementById("donacion").appendChild(Donarbutton);
}

/* Funcion para el display para la opcion de comida en el formulario de reporte de personas */
let checkboxComida = document.getElementById("checkComida");
checkboxComida.addEventListener("change", modifyReportComida);
let divComida = document.getElementById("divReportComida");
function modifyReportComida() {
  if (checkboxComida.checked) {
    divComida.hidden = false;
  } else {
    divComida.hidden = true;
  }
}

/* Funcion para el display del text area en el formulario de reporte de personas */
let checkboxOtros = document.getElementById("checkOtros");
checkboxOtros.addEventListener("change", modifyReportOtros);
let divOtros = document.getElementById("divOtros");
function modifyReportOtros() {
  if (checkboxOtros.checked) {
    divOtros.hidden = false;
  } else {
    divOtros.hidden = true;
  }
}

/**
 * Función que inicializa de forma general los mapas
 */
function mapCreator(mapElement, markers) {
  console.log(mapElement);
  let location = { lat: 4.711, lng: -74.0721 };
  let map = null;
  Geolocation.getCurrentPosition((position) => {
    console.log(position);
    location.lat = position.coords.latitude;
    location.lng = position.coords.longitude;
    map = new google.maps.Map(mapElement, {
      zoom: 15,
      center: location,
      mapTypeControl: false,
      streetViewControl: false,
    });
    placeMarkers(markers, map);
    console.log(map);
  });
  map = new google.maps.Map(mapElement, {
    zoom: 15,
    center: location,
    mapTypeControl: false,
    streetViewControl: false,
  });
  placeMarkers(markers, map);
}

function placeMarkers(markers, map) {
  console.log("pasa");
  if (markers.length == 0) {
    markers = [
      new google.maps.Marker({
        position: { lat: 4.706356, lng: -74.036728 },
        map: map,
      }),
      new google.maps.Marker({
        position: { lat: 4.696939, lng: -74.094181 },
        map: map,
      }),
      new google.maps.Marker({
        position: { lat: 4.670558, lng: -74.100274 },
        map: map,
      }),
      new google.maps.Marker({
        position: { lat: 4.645172, lng: -74.066613 },
        map: map,
      }),
      new google.maps.Marker({
        position: { lat: 4.632827, lng: -74.136731 },
        map: map,
      }),
      new google.maps.Marker({
        position: { lat: 4.539202, lng: -74.109463 },
        map: map,
      }),
    ];
  } else {
    console.log("entre al else");
    markers.forEach((marker) => {
      new google.maps.Marker({
        position: marker.coords,
        map: map,
      });
    });
  }
}

function showMain() {
  login.hidden = true;
  banner.hidden = false;
  aboutUs.hidden = false;
  testimonies.hidden = false;
  donation.hidden = false;
  maps.hidden = false;
  navMenu.hidden = false;
  who.hidden = false;
  report.hidden = false;
  checkLogin();
}

/**
 * Función que se llama siempre al recargar la aplicación. Esta se encarga de verificar
 * si hay un login previo registrado y, de haberlo, actua en consecuencia
 */
function checkLogin() {
  let loginInfo = JSON.parse(localStorage.getItem("login"));

  if (loginInfo) {
    userName.innerHTML = loginInfo.name;
    ingresarButton.hidden = true;
    userName.hidden = false;
    userLogo.hidden = false;
    logout.hidden = false;
  }
}

/**
 * Función que maneja el logIn de un usuario. No verifica nada contra una base de datos, solo simula
 * la funcionalidad que tendría un login
 */
function handleLogIn() {
  const loginEmail = document.getElementById("login-email");
  const loginPass = document.getElementById("login-password");

  const email = loginEmail.value;
  const password = loginPass.value;

  const loginInfo = { email: email, password: password, name: email };
  localStorage.setItem("login", JSON.stringify(loginInfo));
  showMain();
}

/**
 * Función que maneja el registro de usuarios nuevos. No verifica esta información contra una base de datos,
 * guarda los datos de forma local en el almacenamiento del navegador.
 */
function handleSignUp() {
  const form = document.getElementById("form-registro");
  const formData = new FormData(form);
  const name = formData.get("name");
  const lastName = formData.get("lastname");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");

  const signUpInfo = {
    email: email,
    password: password,
    name: name,
    lastName: lastName,
    phone: phone,
  };
  localStorage.setItem("login", JSON.stringify(signUpInfo));
  showMain();
}

/**
 * Maneja el logaout de la aplicación. Remueve la información de login del almacenamiento local y llama a la función que
 * actualiza la interfaz
 */
function handleLogOut() {
  localStorage.removeItem("login");
  location.reload();
}

/**
 * Funcion para inicializar los mapas
 */

function initMap() {
  let location = { lat: 4.7382528, lng: -74.0458496 };
  Geolocation.getCurrentPosition((position) => {
    console.log(position);
    location.lat = position.coords.latitude;
    location.lng = position.coords.longitude;
  });
  console.log(location);
  var mapReport = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: location,
  });
  let marker = new google.maps.Marker({
    position: location,
    map: mapReport,
  });
  google.maps.event.addListener(mapReport, "click", function (event) {
    cord = event.latLng;
    peopleMarkers.push({ coords: cord });
    placeMarkers(peopleMarkers, mapReport);
  });
}
