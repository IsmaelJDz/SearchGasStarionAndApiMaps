class UI {
  constructor() {
    //Instanciar la API
    this.api = new API();

    //crear los markers con layerGroup
    this.markers = new L.LayerGroup();

    // Iniciar el mapa
    this.mapa = this.inicializarMapa();
  }

  inicializarMapa() {
    // Inicializar y obtener la propiedad del mapa
    const map = L.map("mapa").setView([19.390519, -99.3739778], 6);
    const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + enlaceMapa + " Contributors",
      maxZoom: 18
    }).addTo(map);
    return map;
  }

  mostrarEstablecimientos() {
    this.api.obtenerDatos().then(data => {
      const resultados = data.respuestaJSON.results;

      //ejecutar funcion para mostrar los pines

      this.mostrarPines(resultados);
    });
  }

  mostrarPines(datos) {
    //console.log(datos);
    //Limpiar los markers
    this.markers.clearLayers();

    // recorrer los establecimientos
    datos.forEach(dato => {
      const { latitude, longitude, calle, regular, premium } = dato;

      // Crear popup
      const opcionesPopup = L.popup().setContent(`
          <p>Calle: ${calle}
          <p>Regular: </b> $ ${regular} </p>
          <p><b>Premium:</b> $ ${premium}</p>
        `);

      //Agregar el pin
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]).bindPopup(opcionesPopup);

      this.markers.addLayer(marker);
    });

    this.markers.addTo(this.mapa);
  }

  obtenerSugerencias(busqueda) {
    this.api.obtenerDatos().then(datos => {
      const resultados = datos.respuestaJSON.results;

      //enviar el JSON y la busqueda para el filtrado
      this.filtrarResultado(resultados, busqueda);
    });
  }

  filtrarResultado(resultado, busqueda) {
    //filtrar con .filter
    const filtro = resultado.filter(
      filtro => filtro.calle.indexOf(busqueda) !== -1
    );

    this.mostrarPines(filtro);

    //mostrar los pines
  }
}
