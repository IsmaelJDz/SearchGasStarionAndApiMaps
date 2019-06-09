class API {
  async obtenerDatos() {
    //obtener datos desde la API

    const total = 100;

    const datos = await fetch(
      `https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`
    );
    const respuestaJSON = await datos.json();

    return {
      respuestaJSON
    };
  }
}
