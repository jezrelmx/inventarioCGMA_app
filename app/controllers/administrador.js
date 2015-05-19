var args = arguments[0] || {};
console.log(JSON.stringify(args));

function abrirusuarios(){
	Alloy.createController('usuarios');
	// alert("Vista usuarios");
};

function abrirarticulos(){
	Alloy.createController('articulos');
	// alert("Vista articulos");
};

function volver(){
	$.winadmin.close();
};

(function(){
	// console.log("----------->>>"+args.nombre);
	$.nombre.setText(args.nombre+" "+args.ap_paterno);
	$.cargo.setText(args.cargo);
	$.empleado.setText(args.num_empleado);
})();
    
if (OS_ANDROID) {
    $.winadmin.open();    
};

if (OS_IOS) {
    Alloy.Globals.winInventarioCGMA.openWindow($.winadmin);
};


