var args = arguments[0] || {};

function volver(){
	$.winUsuarios.close();
};

function abrirAltaUsuario(){
    Alloy.createController('altaArticulo');
};

function abrirBajaUsuario(){
	// alert("Ventana baja de usuarios");
	Alloy.createController('bajaArticulo');
};

function abrirConsultaUsuario(){
	// alert("Ventana consulta de usuarios");
	Alloy.createController('consultaArticulo');
};

if (OS_ANDROID) {
    $.winUsuarios.open();
};

if (OS_IOS) {
    Alloy.Globals.winInventarioCGMA.openWindow($.winUsuarios);
};
