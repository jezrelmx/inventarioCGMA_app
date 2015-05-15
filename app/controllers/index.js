Alloy.createController('inicio');

// // var Api_policiaCDMX = require('api_policiaCDMX');
// // Alloy.Globals.APIPoliciaCDMX = new Api_policiaCDMX();
// // var datasetCargado = Alloy.Globals.APIPoliciaCDMX.init();
// 
// var iniciar = function(activityIndicator) {
    // var a = Titanium.UI.createAlertDialog({
        // title : 'CDMX Móvil Demo',
        // ok : 'Aceptar',
        // message : 'No se pudo establecer la ubicación'
    // });
    // /**
     // * Se podria hacer una validación para poder consumir los datos del cuadrante correspondiente desde un web service
     // */
    // if (Ti.Geolocation.locationServicesEnabled) {
        // Ti.Geolocation.purpose = "Receive User Location";
        // Titanium.Geolocation.getCurrentPosition(function(e) {
            // if (!e.success || e.error) {
                // a.show();
                // return;
            // } else {
                // var latitud = e.coords.latitude;
                // var longitud = e.coords.longitude;
                // if (datasetCargado == 1) {
                    // Alloy.Globals.miCuadrante = Alloy.Globals.APIPoliciaCDMX.getCuadranteCercano(latitud, longitud);
//                     
                // } else {
                    // /**
                     // * Si el dataset no es soportado por el telefono se puede plantear otra alternativa, como marcar al 066
                     // */
                    // a.show();
                // };
            // };
        // });
    // } else {
        // var a = Titanium.UI.createAlertDialog({
            // title : 'CDMX Móvil Demo',
            // ok : 'Aceptar',
            // message : 'Habilite el GPS para CDMX Móvil'
        // });
        // a.show();
    // };
// };
// 
// exports.iniciar = iniciar;


