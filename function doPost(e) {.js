function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Encabezados si está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha y Hora", "Nombre", "Numero de telefono", "Escuela", "pais","Estado","Direccion"]);
    }

    var nombre = (e && e.parameter && e.parameter.nombre) ? e.parameter.nombre : "";
    var edad = (e && e.parameter && e.parameter.edad) ? e.parameter.edad : "";
    var numerodetelefono = (e && e.parameter && e.parameter.numerodetelefono) ? e.parameter.numerodetelefono : "";
    var escuela = (e && e.parameter && e.parameter.escuela) ? e.parameter.escuela: "";
    var pais = (e && e.parameter && e.parameter.pais) ? e.parameter.pais: "";
    var estado = (e && e.parameter && e.parameter.estado) ? e.parameter.estado: "";
    var direccion = (e && e.parameter && e.parameter.direccion) ? e.parameter.direccion: "";

    sheet.appendRow([new Date(), nombre, edad, numerodetelefono,escuela, pais, estado, direccion]);

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService
      .createTextOutput("Error: " + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);

  } finally {
    lock.releaseLock();
  }
} 