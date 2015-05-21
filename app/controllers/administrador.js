var args = arguments[0] || {};
console.log(JSON.stringify(args));

function consultarResguardos() {
    var url = url_base + "/inventarioCGMA/resguardo_c/resguardo";
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            var respuesta = this.responseText;
            var objRespuesta = JSON.parse(respuesta);
            if (objRespuesta.code == 200) {
                Alloy.createController('detalleresguardos', JSON.stringify(objRespuesta.data));
            } else {
                alert('Intente de nuevo. ' + objRespuesta.message);
            };

        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('El servidor no responde');
        },
        timeout : 10000

    });
    client.open('GET', url);
    client.send();
};

function abrirusuarios() {
    Alloy.createController('usuarios');
    // alert("Vista usuarios");
};

function abrirarticulos() {
    Alloy.createController('articulos');
    // alert("Vista articulos");
};

function volver() {
    $.winadmin.close();
};

(function() {
    // console.log("----------->>>"+args.nombre);
    $.nombre.setText(args.nombre + " " + args.ap_paterno);
    $.cargo.setText(args.cargo);
    $.empleado.setText(args.num_empleado);
})();

if (OS_ANDROID) {
    $.winadmin.open();
};

if (OS_IOS) {
    Alloy.Globals.winInventarioCGMA.openWindow($.winadmin);
};

