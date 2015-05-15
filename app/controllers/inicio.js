if (OS_IOS) {
    Alloy.Globals.winInventarioCGMA = $.win1;
};

if (OS_ANDROID) {
    var abx = require('com.alcoapps.actionbarextras');
    var volver = function() {
        Alloy.Globals.winInventarioCGMA = null;
        $.winInventarioCGMA.close();
        $.destroy();
    };
    $.winInventarioCGMA.addEventListener('postlayout', function(e) {
        abx.setBackgroundColor('#0E2843');
        abx.titleColor = "#FFFFFF";
        abx.subtitleColor = "#FFFFFF";
    });
};

$.winInventarioCGMA.addEventListener('close', function(evento) {
    Alloy.Globals.winInventarioCGMA = null;
    $.winInventarioCGMA.close();
});

function salirinventarioCGMA() {
    Alloy.Globals.winInventarioCGMA = null;
    $.win1.close();
    $.destroy();
};

$.btnServidorPublico.addEventListener('click', function() {

    Alloy.createController('resguardos');
    // alert('resguardos');
});

$.btnAdmin.addEventListener('click', function() {
    var correo = $.txtCorreo.value;
    var contrasenia = $.txtContrania.value;

    // var url = "http://192.168.3.114/inventarioCGMA/Index_c/inicia_sesion";
    // var client = Ti.Network.createHTTPClient({
        // // function called when the response data is available
        // onload : function(e) {
            // // var xml = this.responseXML;
            // // console.log('XML >>>>>>>> ' + xml);
            // // var doc = xml.documentElement;
            // // console.log('DOC >>>>>>>>>>>>> ' + doc);
// 
            // alert('success' + e);
        // },
        // // function called when an error occurs, including a timeout
        // onerror : function(e) {
            // Ti.API.debug(e.error);
            // alert('error');
        // },
        // timeout : 5000 // in milliseconds
    // });
// 
    // xhr.open('POST', url);
    // xhr.send({
        // txtUsuario : 'usuario1',
        // txtContrasenia : '000'
    // });

    Alloy.createController('administrador');

    alert('correo ' + correo + ' contrasenia ' + contrasenia);
});

if (OS_ANDROID) {
    $.winInventarioCGMA.open();
};

if (OS_IOS) {
    $.win1.open();
};