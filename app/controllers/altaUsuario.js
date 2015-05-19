var args = arguments[0] || {};

var url = url_base + "/inventarioCGMA/altaUsuario_c/catalogoUsuarios";
// console.log("URL ------ " + url);
var client = Ti.Network.createHTTPClient({
    onload : function(e) {
        var respuesta = this.responseText;
        var objRespuesta = JSON.parse(respuesta);
        if (objRespuesta.code == 200) {
            console.log('DATOS ------- ' + objRespuesta.data);
            alert(objRespuesta.data);
            for (var key in objRespuesta.data.cat_tipo_usuario) {
                var attrName = key;
                var attrValue = objRespuesta.data.cat_tipo_usuario[key];
                console.log(' attrName  ' + attrName + '  attrValue ' + attrValue.descripcion);
            }
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
