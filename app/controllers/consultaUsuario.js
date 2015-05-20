var args = arguments[0] || {};

if (OS_ANDROID) {
    var abx = require('com.alcoapps.actionbarextras');
    var volver = function() {
        $.winConsultaUsuario.close();
        $.destroy();
    };
    $.winConsultaUsuario.addEventListener('postlayout', function(e) {
        // abx.setBackgroundColor('#0E2843');
        abx.titleColor = "#121212";
        abx.subtitleColor = "#121212";
    });
};

$.winConsultaUsuario.addEventListener('close', function(evento) {
    $.winConsultaUsuario.close();
});
/**
 * ----------------- HTTP CLIENT PARA TRAER LA LISTA DE USUARIOS REGISTRADOS -----------------
 */
var url = url_base + "/inventarioCGMA/consultar_usuario_c";
console.log('URL WS LISTA USUARIOS ---- ' + url);
var client = Ti.Network.createHTTPClient({
    onload : function(e) {
        var respuesta = this.responseText;
        var objRespuesta = JSON.parse(respuesta);
        var items = [];
        if (objRespuesta.code == 200) {
            var listaUsuarios = objRespuesta.data;
            for (var key in listaUsuarios) {
                console.log(' --- ' + JSON.stringify(listaUsuarios[key]));
                items.push({
                    lbNombre : {
                        text : listaUsuarios[key].nombre
                    },
                    lbApPaterno : {
                        text : listaUsuarios[key].ap_paterno
                    },
                    lbApMaterno : {
                        text : listaUsuarios[key].ap_materno
                    },
                    lbCargo : {
                        text : listaUsuarios[key].cargo
                    },
                    lbNumEmpleado : {
                        text : listaUsuarios[key].num_empleado
                    }
                });
            };
        
            $.elementsList.sections[0].setItems(items);

            // $.elementsList.addEventListener('itemclick', function(e) {
                // Alloy.Globals.miCuadrante = cuadrantes[e.itemIndex];
                // Alloy.Globals.mostraInfoCuadrante();
                // $.winResultadoBusqueda.close();
                // // alert(JSON.stringify(cuadrantes[e.itemIndex]));
            // });

            if (OS_ANDROID) {
                $.winConsultaUsuario.open();
            };
            if (OS_IOS) {
                Alloy.Globals.winInventarioCGMA.openWindow($.winConsultaUsuario);
            };

            // Alloy.createController('administrador', objUsuario);
        } else {
            alert('Intente de nuevo' + this.responseText);
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

/**
 * ++++++++++++ GUARDAR USUARIO ++++++++++++
 */

// $.btnAccion.addEventListener('click', function() {
// var urlWS = url_base + "/inventarioCGMA/altaUsuario_c/guardarDatosUsuario";
// if (($.pickerDireccionEjecutiva.getSelectedRow(0).id != 0) && ($.pickerTipoUsuario.getSelectedRow(0).id != 0)) {
// var objDatosUsuario = {
// nombre : $.txtNombre.getValue(),
// ap_paterno : $.txtApPaterno.getValue(),
// ap_materno : $.txtApMaterno.getValue(),
// cargo : $.txtCargo.getValue(),
// num_empleado : $.txtNumEmpleado.getValue(),
// email : $.txtCorreoElectronico.getValue(),
// estatus : 1,
// contrasenia : $.txtContrasenia.getValue(),
// id_direccion_ejecutiva : $.pickerDireccionEjecutiva.getSelectedRow(0).id,
// id_tipo_usuario : $.pickerTipoUsuario.getSelectedRow(0).id
// };
// /**
// * -------------------------- CONEXION CON WS PARA GUARDAR DATOS DEL USUARIO --------------------------
// */
// var client = Ti.Network.createHTTPClient({
// onload : function(e) {
// var respuesta = this.responseText;
// var objRespuesta = JSON.parse(respuesta);
// alert(objRespuesta.message);
// if (objRespuesta.code == 200) {
// $.txtNombre.setValue('');
// $.txtApPaterno.setValue('');
// $.txtApMaterno.setValue('');
// $.txtCargo.setValue('');
// $.txtNumEmpleado.setValue('');
// $.txtCorreoElectronico.setValue('');
// $.txtContrasenia.setValue('');
// $.pickerDireccionEjecutiva.setSelectedRow(0, 0, true);
// $.pickerTipoUsuario.setSelectedRow(0, 0, true);
// };
// },
// onerror : function(e) {
// Ti.API.debug(e.error);
// alert('El servidor no responde');
// },
// timeout : 10000
// });
//
// client.open('POST', urlWS);
// client.send(objDatosUsuario);
// } else {
// if ($.pickerDireccionEjecutiva.getSelectedRow(0).id == 0) {
// alert('Seleccione una dirección ejecutiva');
// }
//
// if ($.pickerTipoUsuario.getSelectedRow(0).id == 0) {
// alert('Seleccione un tipo de usuario');
// };
// };
// });
