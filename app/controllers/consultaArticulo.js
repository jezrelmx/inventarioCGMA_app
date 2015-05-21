var args = arguments[0] || {};

if (OS_ANDROID) {
    var abx = require('com.alcoapps.actionbarextras');
    var volver = function() {
        $.winConsultaArticulo.close();
        $.destroy();
    };
    $.winConsultaArticulo.addEventListener('postlayout', function(e) {
        // abx.setBackgroundColor('#0E2843');
        abx.titleColor = "#121212";
        abx.subtitleColor = "#121212";
    });
};

$.winConsultaArticulo.addEventListener('close', function(evento) {
    $.winConsultaArticulo.close();
});

function volver(){
	$.winConsultaArticulo.close();
};

var url = url_base + "/inventarioCGMA/consultarArticuloGral_c";
var client = Ti.Network.createHTTPClient({
	onload: function(e){
		var respuesta = this.responseText;
        var objRespuesta = JSON.parse(respuesta);
        // console.log(">>>>>>>>>>>******"+JSON.stringify(objRespuesta));
        var items = [];
        if (objRespuesta.code == 200) {
            var listaArticulos = objRespuesta.data;
            for (var key in listaArticulos) {
                items.push({
                    lbNum_Inventario : {
                        text : listaArticulos[key].numinventario
                    },
                    lbResponsable : {
                        text : listaArticulos[key].usuario
                    },
                    lbNum_empleado : {
                        text : listaArticulos[key].num_empleado
                    },
                    lbTipo : {
                        text : listaArticulos[key].tipo
                    },
                    lbCaracteristica : {
                        text : listaArticulos[key].caracteristicas
                    },
                    lbEstatus : {
                        text : listaArticulos[key].estatus
                    },
                });
            };
        
            $.elementsList.sections[0].setItems(items);
            if (OS_ANDROID) {
         		$.winConsultaArticulo.open();
         	};
         	if (OS_IOS) {
         		Alloy.Globals.winInventarioCGMA.openWindow($.winConsultaArticulo);
         	};
        }else {
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

