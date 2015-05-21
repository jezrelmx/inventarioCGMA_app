var args = arguments[0] || {};

//Variables globales
alerta=0;

function volver() {
	$.winbajaArt.close();
};

$.winbajaArt.open();

/**
 * ----------------- HTTP CLIENT CON PARSER PARA JSON -----------------
 */

var url = url_base + "/inventarioCGMA/consultarArticuloGral_c";
var client = Ti.Network.createHTTPClient({
	onload : function(e) {

		var respuesta = this.responseText;
		objRespuesta = JSON.parse(respuesta);
		
	}
});

client.open('GET', url);
client.send();

$.btnbaja.addEventListener('click',function(){
	var url = url_base + "/inventarioCGMA/consultarArticuloGral_c/eliminarArticulo";
	var clave = $.txtinventario.getValue();
	for (var key in objRespuesta.data) {
		if (objRespuesta.data[key].numinventario == clave) {
			alerta=1;
			 var Eliminar = { 
				 id_articulo : objRespuesta.data[key].id_articulo
			 };

			 var client = Ti.Network.createHTTPClient({
				 onload : function(e) {
					 var respuesta = this.responseText;
					 objRespuesta = JSON.parse(respuesta);
					 alert("***" + objRespuesta.message);
					 if (objRespuesta.code == 200) {
						 $.txtinventario.setValue('');
					 }

				 },
				 onerror : function(e) {
					 Ti.API.debug(e.error);
					 alert("El servidor no responde");
				 },
				 timeout : 10000
			 });

			 client.open('POST', url);
			 client.send(Eliminar);
			 
		}
		
	}//fin for
	if(alerta==0){
		alert("La clave no existe");
	}
			
});//fin funcion


















