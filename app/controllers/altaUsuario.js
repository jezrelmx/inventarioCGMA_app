var args = arguments[0] || {};

var url = url_base + "/inventarioCGMA/altaUsuario_c/catalogoUsuarios";
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            var respuesta = JSON.parse(this.responseText);
            if (respuesta.code == 200) {
                var objCatalogos = JSON.parse(respuesta.data);
                alert(objUsuario);
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

    client.open('POST', url);
    client.send({
        txtCorreo : 'usuario1',
        txtContrasenia : '000'
    });


$.winAltaUsuario.open();
