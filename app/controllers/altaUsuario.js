var args = arguments[0] || {};

if (OS_ANDROID) {
    var abx = require('com.alcoapps.actionbarextras');
    var volver = function() {
        $.winAltaUsuario.close();
        $.destroy();
    };
    $.winAltaUsuario.addEventListener('postlayout', function(e) {
        // abx.setBackgroundColor('#0E2843');
        abx.titleColor = "#121212";
        abx.subtitleColor = "#121212";
    });
};

$.winAltaUsuario.addEventListener('close', function(evento) {
    $.winAltaUsuario.close();
});
/**
 * ----------------- HTTP CLIENT CON PARSER PARA JSON -----------------
 */
var url = url_base + "/inventarioCGMA/altaUsuario_c/catalogoUsuarios";
var client = Ti.Network.createHTTPClient({
    onload : function(e) {
        var respuesta = this.responseText;
        var objRespuesta = JSON.parse(respuesta);
        if (objRespuesta.code == 200) {
            var rowsTipoUsuario = [];
            var rowsDireccionEjecutiva = [];
            var row = Ti.UI.createPickerRow({
                id : 0,
                title : 'Tipo de usuario'
            });
            rowsTipoUsuario.push(row);
            var row = Ti.UI.createPickerRow({
                id : 0,
                title : 'Dirección ejecutiva'
            });
            rowsDireccionEjecutiva.push(row);

            for (var key in objRespuesta.data.cat_tipo_usuario) {
                var attrName = key;
                var attrValue = objRespuesta.data.cat_tipo_usuario[key];
                var row = Ti.UI.createPickerRow({
                    id : attrName,
                    title : attrValue.descripcion
                });
                rowsTipoUsuario.push(row);
            }

            $.pickerTipoUsuario.add(rowsTipoUsuario);

            for (var key in objRespuesta.data.cat_direccion_ejecutiva) {
                var attrName = key;
                var attrValue = objRespuesta.data.cat_direccion_ejecutiva[key];
                console.log('attrName ' + attrName + ' attrValue.descripcion ' + attrValue.descripcion);
                var row = Ti.UI.createPickerRow({
                    id : attrName,
                    title : attrValue.descripcion
                });
                rowsDireccionEjecutiva.push(row);
            }

            $.pickerDireccionEjecutiva.add(rowsDireccionEjecutiva);

            if (OS_ANDROID) {
                $.winAltaUsuario.open();
            };
            if (OS_IOS) {
                Alloy.Globals.winInventarioCGMA.openWindow($.winAltaUsuario);
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

$.btnAccion.addEventListener('click', function() {
    var urlWS = url_base + "/inventarioCGMA/altaUsuario_c/guardarDatosUsuario";
    if (($.pickerDireccionEjecutiva.getSelectedRow(0).id != 0) && ($.pickerTipoUsuario.getSelectedRow(0).id != 0)) {
        var objDatosUsuario = {
            nombre : $.txtNombre.getValue(),
            ap_paterno : $.txtApPaterno.getValue(),
            ap_materno : $.txtApMaterno.getValue(),
            cargo : $.txtCargo.getValue(),
            num_empleado : $.txtNumEmpleado.getValue(),
            email : $.txtCorreoElectronico.getValue(),
            estatus : 1,
            contrasenia : $.txtContrasenia.getValue(),
            id_direccion_ejecutiva : $.pickerDireccionEjecutiva.getSelectedRow(0).id,
            id_tipo_usuario : $.pickerTipoUsuario.getSelectedRow(0).id
        };
        /**
         * -------------------------- CONEXION CON WS PARA GUARDAR DATOS DEL USUARIO --------------------------
         */
        var client = Ti.Network.createHTTPClient({
            onload : function(e) {
                var respuesta = this.responseText;
                var objRespuesta = JSON.parse(respuesta);
                alert(objRespuesta.message);
                if (objRespuesta.code == 200) {
                    $.txtNombre.setValue('');
                    $.txtApPaterno.setValue('');
                    $.txtApMaterno.setValue('');
                    $.txtCargo.setValue('');
                    $.txtNumEmpleado.setValue('');
                    $.txtCorreoElectronico.setValue('');
                    $.txtContrasenia.setValue('');
                    $.pickerDireccionEjecutiva.setSelectedRow(0, 0, true);
                    $.pickerTipoUsuario.setSelectedRow(0, 0, true);
                };
            },
            onerror : function(e) {
                Ti.API.debug(e.error);
                alert('El servidor no responde');
            },
            timeout : 10000
        });

        client.open('POST', urlWS);
        client.send(objDatosUsuario);
    } else {
        if ($.pickerDireccionEjecutiva.getSelectedRow(0).id == 0) {
            alert('Seleccione una dirección ejecutiva');
        }

        if ($.pickerTipoUsuario.getSelectedRow(0).id == 0) {
            alert('Seleccione un tipo de usuario');
        };
    };
});
