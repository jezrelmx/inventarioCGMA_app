if (OS_IOS) {
    Alloy.Globals.winPoliciaCDMX = $.win1;
};

if (OS_ANDROID) {
    var abx = require('com.alcoapps.actionbarextras');
    var volver = function() {
        Alloy.Globals.winPoliciaCDMX = null;
        $.winPoliciaCDMX.close();
        $.destroy();
    };
    $.winPoliciaCDMX.addEventListener('postlayout', function(e) {
        abx.setBackgroundColor('#0E2843');
        abx.titleColor = "#FFFFFF";
        abx.subtitleColor = "#FFFFFF";
    });
};

$.winPoliciaCDMX.addEventListener('close', function(evento) {
    Alloy.Globals.winPoliciaCDMX = null;
    $.winPoliciaCDMX.close();
});

function salirPoliciaCDMX() {
    Alloy.Globals.winPoliciaCDMX = null;
    $.win1.close();
    $.destroy();
};

$.btnServidorPublico.addEventListener('click', function(){
    Alloy.createController('resguardos');
    alert('resguardos');
});

$.btnAdmin.addEventListener('click', function(){
    Alloy.createController('administrador');
    alert('Admin');
});

if (OS_ANDROID) {
    $.winPoliciaCDMX.open();
};

if (OS_IOS) {
    $.win1.open();
};