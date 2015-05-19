var args = arguments[0] || {};
var arr=[
	      {"id": "1", "descripcion":"desvgfgg", "inventario":"invjdhbfher", "caracteristicas":"caractgmker"},
	      {"id": "2", "descripcion":"des2vgfgg", "inventario":"inv2jdhbfher", "caracteristicas":"caractgmker"},
	      {"id": "3", "descripcion":"des3vgfgg", "inventario":"invj3dhbfher", "caracteristicas":"caractgmker"},
	      {"id": "4", "descripcion":"des4vgfgg", "inventario":"invj4dhbfher", "caracteristicas":"caractgmker"}
	      
	  ];
	  
var data = [];
	for (var i = 0; i < arr.length; i++) {
		 data.push(
 				{ properties: {
				 id: arr[i].id,
 				descripcion: arr[i].descripcion,
 				inventario: arr[i].inventario,
 				caracteristicas:arr[i].caracteristicas
 }
 });
}

$.listSection.setItems(data);
$.list.sections = [$.listSection];	 



$.container.open();


