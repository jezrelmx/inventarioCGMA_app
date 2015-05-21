var args = arguments[0] || {};

console.log('STRING -------- ' + args);

var datosUsurio = JSON.parse(args);

console.log('OBJETO -------- ' + datosUsurio);

var diccionarioEstadoUsuario = {
    '0': 'Inactivo',
    '1': 'Activo'
};

$.txtNombreCompleto.setText(datosUsurio.nombre + ' ' + datosUsurio.ap_paterno + ' ' + datosUsurio.ap_materno);
$.txtCargo.setText(datosUsurio.cargo);
$.txtNumEmpleado.setText(datosUsurio.num_empleado);
$.txtCorreo.setText(datosUsurio.email);
$.txtDireccionEjecutiva.setText(datosUsurio.nom_direccion);
$.txtTipoUsuario.setText(datosUsurio.tipo_usuario);
$.txtEstado.setText(diccionarioEstadoUsuario[datosUsurio.estatus]);

if (OS_ANDROID) {
    var abx = require('com.alcoapps.actionbarextras');
    var volver = function() {
        $.winConfirmarEliminarUsuario.close();
        $.destroy();
    };
    $.winConfirmarEliminarUsuario.addEventListener('postlayout', function(e) {
        // abx.setBackgroundColor('#0E2843');
        abx.titleColor = "#121212";
        abx.subtitleColor = "#121212";
    });
};

$.winConfirmarEliminarUsuario.addEventListener('close', function(evento) {
    $.winConfirmarEliminarUsuario.close();
});

if (OS_ANDROID) {
    $.winConfirmarEliminarUsuario.open();
};
if (OS_IOS) {
    Alloy.Globals.winInventarioCGMA.openWindow($.winConfirmarEliminarUsuario);
};
/**
 * ----------------- HTTP CLIENT PARA TRAER LA LISTA DE USUARIOS REGISTRADOS -----------------
 */

$.btnAccion.addEventListener('click', function(e) {
    var url = url_base + "/inventarioCGMA/consultar_usuario_c/eliminarUsuarioEmail";
    var correo = datosUsurio.email;
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            var respuesta = this.responseText;
            var objRespuesta = JSON.parse(respuesta);
            alert(objRespuesta.message);
            // if (objRespuesta.code == 200) {
                // Alloy.createController('confirmarEliminarUsuario', JSON.stringify(datosUsuario));               
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