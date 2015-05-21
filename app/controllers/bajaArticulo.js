var args = arguments[0] || {};

function volver(){
	$.winbajaArt.close();
};

function abrirVerificarBaja(){
	alert("Verificar baja del articulo");
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
        if (objRespuesta.code == 200) {
        	console.log("<<<<<<<<<<<<<<<<<<<<<<"+JSON.stringify(objRespuesta));
        }
    }
});
    
client.open('GET',url);
client.send();


function abrirVerificarBaja(){
	 var url = url_base + "/inventarioCGMA/consultarArticuloGral_c/eliminarArticulo";
	 var clave=$.txtinventario.getValue();
	  for(var key in objRespuesta.data){
	  	if(objRespuesta.data[key].numinventario==clave){
	  		console.log("---><<<> key: "+key);
	  		var Eliminar={
    			id_articulo:key
    		};
	  		
			var client = Ti.Network.createHTTPClient({
   				onload : function(e) {
    			var respuesta = this.responseText;
        		objRespuesta = JSON.parse(respuesta);
        		alert("***"+objRespuesta.message);
        		if (objRespuesta.code == 200) {
        				
        				console.log("*****************************Entro");
        				// $.txtinventario.setValue('');
        }
       
    		}
		});
    
		client.open('POST',url);
		client.send(Eliminar);
	  	}
	  	
	  }//fin for

}











