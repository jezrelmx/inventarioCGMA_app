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
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            var respuesta = this.responseText;
            var objRespuesta = JSON.parse(respuesta);
            if (objRespuesta.code == 200) {
                var datosUsuario = objRespuesta.data;
                Alloy.createController('confirmarEliminarUsuario', JSON.stringify(datosUsuario));               
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

    client.open('POST', url);
    client.send({
        email : correo
    });
});
