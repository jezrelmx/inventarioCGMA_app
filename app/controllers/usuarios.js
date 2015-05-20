var args = arguments[0] || {};

function volver(){
	$.winUsuarios.close();
};

function abrirAltaUsuario(){
    Alloy.createController('altaUsuario');
};

function abrirBajaUsuario(){
    Alloy.createController('eliminarUsuario');
	// alert("Ventana baja de usuarios");
};

function abrirConsultaUsuario(){
    Alloy.createController('consultaUsuario');
	// alert("Ventana consulta de usuarios");
};

if (OS_ANDROID) {
    $.winUsuarios.open();
};

if (OS_IOS) {
    Alloy.Globals.winInventarioCGMA.openWindow($.winUsuarios);
};
