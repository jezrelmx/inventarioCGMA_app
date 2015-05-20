var args = arguments[0] || {};

var diccionarioTipoUsuario = {
    "1": "Administrador",
    "2": "Servidor público"
};

var diccionarioEstado = {
    "0": "Inactivo",
    "1": "Activo"
};

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
                    },
                    lbDireccionEjecutiva : {
                        text : listaUsuarios[key].nom_direccion
                    },
                    lbEmail : {
                        text : listaUsuarios[key].email
                    },
                    lbTipoUsuario : {
                        text : diccionarioTipoUsuario[listaUsuarios[key].id_tipo_usuario]
                    },
                    lbEstado : {
                        text : diccionarioEstado[listaUsuarios[key].estatus]
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