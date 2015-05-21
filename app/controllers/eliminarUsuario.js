var args = arguments[0] || {};

if (OS_ANDROID) {
    var abx = require('com.alcoapps.actionbarextras');
    var volver = function() {
        $.winEliminarUsuario.close();
        $.destroy();
    };
    $.winEliminarUsuario.addEventListener('postlayout', function(e) {
        // abx.setBackgroundColor('#0E2843');
        abx.titleColor = "#121212";
        abx.subtitleColor = "#121212";
    });
};

$.winEliminarUsuario.addEventListener('close', function(evento) {
    $.winEliminarUsuario.close();
});

if (OS_ANDROID) {
    $.winEliminarUsuario.open();
};
if (OS_IOS) {
    Alloy.Globals.winInventarioCGMA.openWindow($.winEliminarUsuario);
};
/**
 * ----------------- HTTP CLIENT PARA TRAER LA LISTA DE USUARIOS REGISTRADOS -----------------
 */

$.btnAccion.addEventListener('click', function(e) {
    var url = url_base + "/inventarioCGMA/consultar_usuario_c/usuario_email";
    var correo = $.txtCorreo.getValue();
    alert(correo);
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            var respuesta = this.responseText;
            alert(respuesta);
            // var objRespuesta = JSON.parse(respuesta);
            // if (objRespuesta.code == 200) {
            // var listaUsuarios = objRespuesta.data;
            //
            //
            // $.elementsList.sections[0].setItems(items);
            //
            //
            //
            // if (OS_ANDROID) {
            // $.winEliminarUsuario.open();
            // };
            // if (OS_IOS) {
            // Alloy.Globals.winInventarioCGMA.openWindow($.winEliminarUsuario);
            // };
            //
            // Alloy.createController('administrador', objUsuario);
            // } else {
            // alert('Intente de nuevo' + this.responseText);
            // };
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('El servidor no responde');
        },
        timeout : 10000
    });

    client.open('POST', url);
    client.send({
        email : correo
    });
}); 