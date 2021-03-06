var model = null;

(function constructor(args) {
	model = args.model;

	$.titleTextFieldWidget.init({
		text: model.get("name")
	});
	$.titleTextFieldWidget.on("textSelected", function(args) {		
		model.set("name", args);	 
	});
	
	$.categoryTextFieldWidget.init({
		category: model.get("category")
	});
	$.categoryTextFieldWidget.on("categorySelected", function(args) {		
		model.set("category", args);	 
	});
	
	$.startDateTimeTextFieldWidget.init({
		date: (model.get("data") && model.get("data").startTime ? new Date(model.get("data").startTime.time) : new Date())
	});	
	$.startDateTimeTextFieldWidget.on("dateSelected", function(args) {
		var data = model.get("data") || {};
		data = _.extend(data, {
			startTime: {
				time: args.getTime()
			}
		});
		model.set("data", data);				 
	});
	
	$.endDateTimeTextFieldWidget.init({
		date: (model.get("data") && model.get("data").endTime ? new Date(model.get("data").endTime.time) : new Date())
	});	
	$.endDateTimeTextFieldWidget.on("dateSelected", function(args) {		
		var data = model.get("data") || {};
		data = _.extend(data, {
			endTime: {
				time: args.getTime()
			}
		});
		model.set("data", data);		
	});
	
})(arguments[0] || {});