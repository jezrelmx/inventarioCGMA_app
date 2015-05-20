var args = arguments[0] || {};

if (OS_ANDROID) {
    var abx = require('com.alcoapps.actionbarextras');
    var volver = function() {
        $.winAltaArticulo.close();
        $.destroy();
    };
    $.winAltaArticulo.addEventListener('postlayout', function(e) {
        // abx.setBackgroundColor('#0E2843');
        abx.titleColor = "#121212";
        abx.subtitleColor = "#121212";
    });
};

$.winAltaArticulo.addEventListener('close', function(evento) {
    $.winAltaArticulo.close();
});

/**
 * ----------------- HTTP CLIENT CON PARSER PARA JSON -----------------
 */
var url = url_base + "/inventarioCGMA/altaArticulo_c/traerCatalogos";
var client = Ti.Network.createHTTPClient({
    onload : function(e) {
        var respuesta = this.responseText;
        var objRespuesta = JSON.parse(respuesta);
        console.log("JSON--->>: "+JSON.stringify(objRespuesta));
        if (objRespuesta.code == 200) {
            var rowsTipoArticulo = [];
            var rowsEstatusArticulo = [];
            var row = Ti.UI.createPickerRow({
                id : 0,
                title : 'Tipo de articulo'
            });
            rowsTipoArticulo.push(row);
            var row = Ti.UI.createPickerRow({
                id : 0,
                title : 'Estatus articulo'
            });
            rowsEstatusArticulo.push(row);

            for (var key in objRespuesta.data.cat_tipo) {
                var attrName = key;
                var attrValue = objRespuesta.data.cat_tipo[key];
                var row = Ti.UI.createPickerRow({
                    id : attrName,
                    title : attrValue.descripcion
                });
                rowsTipoArticulo.push(row);
            }

            $.pickerTipoArticulo.add(rowsTipoArticulo);

            for (var key in objRespuesta.data.cat_estatus) {
                var attrName = key;
                var attrValue = objRespuesta.data.cat_estatus[key];
                console.log('attrName ' + attrName + ' attrValue.descripcion ' + attrValue.descripcion);
                var row = Ti.UI.createPickerRow({
                    id : attrName,
                    title : attrValue.descripcion
                });
                rowsEstatusArticulo.push(row);
            }

            $.pickerEstatusArt.add(rowsEstatusArticulo);

            if (OS_ANDROID) {
                $.winAltaArticulo.open();
            };
            if (OS_IOS) {
                Alloy.Globals.winInventarioCGMA.openWindow($.winAltaArticulo);
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

$.btnAccion.addEventListener('click', function(){
	 var urlWS = url_base + "/inventarioCGMA/altaArticulo_c/altaArticulo";
    if (($.pickerTipoArticulo.getSelectedRow(0).id != 0) && ($.pickerEstatusArt.getSelectedRow(0).id != 0)) {
        var objDatosArticulo = {
            id_tipo_mueble: $.pickerTipoArticulo.getSelectedRow(0).id,
            progresivo: $.txtProgresivo.getValue(),
            caracteristicas: $.txtCaracteristicas.getValue(),
            id_estatus: $.pickerEstatusArt.getSelectedRow(0).id,
            email: $.txtEmail.getValue()
        };
        console.log("--------->>>>>>>>>>Objeto: "+JSON.stringify(objDatosArticulo));
        console.log("------->>>id articulo: "+$.pickerTipoArticulo.getSelectedRow(0).id);
        console.log("------->>>id estatus: "+$.pickerEstatusArt.getSelectedRow(0).id);
        /**
         * -------------------------- CONEXION CON WS PARA GUARDAR DATOS DEL USUARIO --------------------------
         */
        var client = Ti.Network.createHTTPClient({
            onload : function(e) {
                var respuesta = this.responseText;
                var objRespuesta = JSON.parse(respuesta);
                alert(objRespuesta.message);
                if (objRespuesta.code == 200) {
                    $.pickerTipoArticulo.setSelectedRow(0, 0, true);
                    $.txtProgresivo.setValue('');
                    $.txtCaracteristicas.setValue('');
                    $.pickerEstatusArt.setSelectedRow(0, 0, true);
                    $.txtEmail.setValue('');
                };
            },
            onerror : function(e) {
                Ti.API.debug(e.error);
                alert('El servidor no responde');
            },
            timeout : 10000
        });

        client.open('POST', urlWS);
        client.send(objDatosArticulo);
    } else {
        if ($.pickerTipoArticulo.getSelectedRow(0).id == 0) {
            alert('Seleccione un tipo de articulo');
        }

        if ($.pickerEstatusArt.getSelectedRow(0).id == 0) {
            alert('Seleccione un esatutos');
        };
    };
});
