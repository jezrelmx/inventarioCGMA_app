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

$.btnServidorPublico.addEventListener('click', function(){
    // Alloy.createController('resguardos');
    alert('resguardos');
});

$.btnAdmin.addEventListener('click', function(){
    // Alloy.createController('administrador');
    
    alert('Admin');
});

if (OS_ANDROID) {
    $.winInventarioCGMA.open();
};

if (OS_IOS) {
    $.win1.open();
};