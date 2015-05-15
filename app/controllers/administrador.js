var args = arguments[0] || {};

$.btnusuarios.addEventListener('click',function(){
	Alloy.createController('usuarios');
	// alert("Vista usuarios");
});
$.btnarticulos.addEventListener('click',function(){
	// Alloy.createController('usuarios');
	alert("Vista articulos");
});

function volver(){
	$.winadmin.close();
};

(function(){
	console.log(JSON.stringify(args));
	// console.log("----------->>>"+args.nombre);
	$.nombre.setText(args.nombre+" "+args.ap_paterno);
	$.cargo.setText(args.cargo);
	$.empleado.setText(args.num_empleado);
})();
$.winadmin.open();
