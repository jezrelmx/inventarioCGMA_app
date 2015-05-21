var args = arguments[0] || {};
console.log(args);
alerta = 0;

if (OS_ANDROID) {
	var abx = require('com.alcoapps.actionbarextras');
	var volver = function() {
		$.winResguardos.close();
		$.destroy();
	};
	$.winResguardos.addEventListener('postlayout', function(e) {
		// abx.setBackgroundColor('#0E2843');
		abx.titleColor = "#121212";
		abx.subtitleColor = "#121212";
	});
};

$.winResguardos.addEventListener('close', function(evento) {
	$.winResguardos.close();
});

function volver() {
	$.winResguardos.close();
};

var url = url_base + "/inventarioCGMA/consultar_usuario_c";
var urlresguardo = url_base + "/inventarioCGMA/resguardo_c/resguardo";

var client = Ti.Network.createHTTPClient({
	onload : function(e) {
		var respuesta = this.responseText;
		var objRespuesta = JSON.parse(respuesta);
		console.log("+++++++++" + JSON.stringify(objRespuesta));
		if (objRespuesta.code == 200) {
			var listaUsuarios = objRespuesta.data;
			for (var key in listaUsuarios) {
				if (args == listaUsuarios[key].email) {
					$.nombre.setText(listaUsuarios[key].nombre + " " + listaUsuarios[key].ap_paterno);
					$.cargo.setText(listaUsuarios[key].cargo);
					$.no_empleado.setText(listaUsuarios[key].num_empleado);
					alerta = 1;
				}
			}
			if (alerta == 0) {
				alert("El servidor publico no existe!\nVerifiquelo!");
			}
			if (OS_ANDROID) {
				$.winResguardos.open();
			};
			if (OS_IOS) {
				Alloy.Globals.winInventarioCGMA.openWindow($.winResguardos);
			};
		}
	},
	onerror : function(e) {
		Ti.API.debug(e.error);
		alert('El servidor no responde');
	},
	timeout : 10000
});

client.open('GET', url);
client.send();

(function() {
	var objUsuario={
		email:args
	};
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var respuesta1 = this.responseText;
			var objRespuesta1 = JSON.parse(respuesta1);
			console.log(JSON.stringify(objRespuesta1));
			var items = [];
			if (objRespuesta1.code == 200) {
				var listaArticulos1 = objRespuesta1.data;
				for (var key in listaArticulos1) {
					items.push({
						lbNum_Inventario : {
							text : listaArticulos1[key].clave+"-"+listaArticulos1[key].progresivo
						},
						lbTipo : {
							text : listaArticulos1[key].tipo
						},
						lbCaracteristica : {
							text : listaArticulos1[key].caracteristicas
						},
						lbEstatus : {
							text : listaArticulos1[key].estatus
						},
					});
				};

				$.elementsList.sections[0].setItems(items);
				
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

	client.open('POST', urlresguardo);
	client.send(objUsuario);
})();
// $.winResguardos.open();
