var args = arguments[0] || {};

if (OS_ANDROID) {
    var abx = require('com.alcoapps.actionbarextras');
    var volver = function() {
        $.winConsultaResguardos.close();
        $.destroy();
    };
    $.winConsultaResguardos.addEventListener('postlayout', function(e) {
        // abx.setBackgroundColor('#0E2843');
        abx.titleColor = "#121212";
        abx.subtitleColor = "#121212";
    });
};

$.winConsultaResguardos.addEventListener('close', function(evento) {
    $.winConsultaResguardos.close();
});

function volver() {
    $.winConsultaResguardos.close();
};

var items = [];
var listaArticulos = JSON.parse(args);
var indiceActual = 0;
for (var key in listaArticulos) {
    if (indiceActual != listaArticulos[key].id_usuario) {
        indiceActual = listaArticulos[key].id_usuario;
        items.push({
            lbPropietario : {
                text : listaArticulos[key].nombre + '-' + listaArticulos[key].num_empleado
            },
            lbNum_Inventario : {
                text : listaArticulos[key].clave + '-' + listaArticulos[key].progresivo
            },
            lbResponsable : {
                text : listaArticulos[key].estatus
            },
            lbTipo : {
                text : listaArticulos[key].caracteristicas
            },
            lbCaracteristica : {
                text : listaArticulos[key].tipo
            },
        });
    } else {
        items.push({
            lbNum_Inventario : {
                text : listaArticulos[key].clave + '-' + listaArticulos[key].progresivo
            },
            lbResponsable : {
                text : listaArticulos[key].estatus
            },
            lbTipo : {
                text : listaArticulos[key].caracteristicas
            },
            lbCaracteristica : {
                text : listaArticulos[key].tipo
            },
        });
    };

};

$.elementsList.sections[0].setItems(items);
if (OS_ANDROID) {
    $.winConsultaResguardos.open();
};
if (OS_IOS) {
    Alloy.Globals.winInventarioCGMA.openWindow($.winConsultaResguardos);
};