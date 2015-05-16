var args = arguments[0] || {};

function volver(){
	$.winUsuarios.close();
};

function abrirAltaUsuario(){
	alert("Ventana alta de usuarios");
};

function abrirBajaUsuario(){
	alert("Ventana baja de usuarios");
};

function abrirConsultaUsuario(){
	alert("Ventana consulta de usuarios");
};

if (OS_ANDROID) {
    $.winUsuarios.open();
};

if (OS_IOS) {
    Alloy.Globals.winInventarioCGMA.openWindow($.winUsuarios);
};
