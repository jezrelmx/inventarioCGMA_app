var args = arguments[0] || {};

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

            // $.pickerTipoUsuario.add(rowsTipoUsuario);
            
            for (var key in objRespuesta.data.cat_direccion_ejecutiva) {
                var attrName = key;
                var attrValue = objRespuesta.data.cat_direccion_ejecutiva[key];

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
