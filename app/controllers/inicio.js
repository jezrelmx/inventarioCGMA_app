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

    // Alloy.createController('resguardos');
    alert('resguardos');
});

$.btnAdmin.addEventListener('click', function() {
    alert($.txtCorreo.getValue());
    var objCredenciales = {
        txtUsuario : $.txtCorreo.value,
        txtContrasenia : $.txtContrania.value
    };
    console.log('usuario ' + objCredenciales.txtUsuario + ' constrasenia ' + objCredenciales.txtContrasenia);

    var url = "http://192.168.3.114/inventarioCGMA/Index_c/inicia_sesion";
    var client = Ti.Network.createHTTPClient({
        // function called when the response data is available
        onload : function(e) {
            var respuesta = JSON.parse(this.responseText);
            console.log('DOC >>>>>>>>>>>>> ' + respuesta);
            if (respuesta.code == 200) {
                var objUsuario = JSON.parse(respuesta.data);
                // alert(objUsuario.nombre);
                Alloy.createController('administrador', objUsuario);
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

    client.open('POST', url);
    client.send({
        txtUsuario : 'usuario1',
        txtContrasenia : '000'
    });
});

if (OS_ANDROID) {
    $.winInventarioCGMA.open();
};

if (OS_IOS) {
    $.win1.open();
};