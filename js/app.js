const mapa = new UI();

document.addEventListener("DOMContentLoaded", () => {
  mapa.mostrarEstablecimientos();
});

//habilitar busqueda de establecimientos
const buscador = document.querySelector("#buscar input");
buscador.addEventListener("input", () => {
  if (buscador.value.length > 6) {
    mapa.obtenerSugerencias(buscador.value);
  } else {
    mapa.mostrarEstablecimientos();
  }
});
