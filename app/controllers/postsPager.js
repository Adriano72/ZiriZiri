var navigationWindow = null;
var collection = null;
var currentIndex = null;
var startIndex = null;
var endIndex = null;

(function constructor(args) {

	navigationWindow = args.navigationWindow;

	collection = args.collection;

	var model = args.model;

	currentIndex = collection.indexOf(model);

	Ti.API.info("SELECTED INDEX: " + currentIndex);

	Ti.API.info("SELECTED MODEL: " + JSON.stringify(model));

	startIndex = currentIndex - 1;
	endIndex = currentIndex + 1;

	if (startIndex > -1) {
		addPageBefore(collection.at(startIndex));
	}

	addPageAfter(model);

	if (endIndex < collection.length) {
		addPageAfter(collection.at(endIndex));
	}

	var previousPage = 1;

	$.scrollableView.addEventListener("scrollend", function(args) {

		if (previousPage != args.currentPage) {
			if (args.currentPage < previousPage) {
				currentIndex--;
			} else if (args.currentPage > previousPage) {
				currentIndex++;
			}
			previousPage = args.currentPage;
		}

		if (args.currentPage == 0) {
			startIndex--;
			if (startIndex > -1) {
				addPageBefore(collection.at(startIndex));
			}

		} else if (args.currentPage == $.scrollableView.getViews().length - 1) {
			endIndex++;
			if (endIndex < collection.length) {
				addPageAfter(collection.at(endIndex));
			}
		}

		$.postsPager.fireEvent("itemSelected", collection.at(currentIndex).toJSON());
	});

})(arguments[0] || {});

function addPageBefore(model) {

	if (OS_IOS) {
		var postPage = Alloy.createController("postPage", {
			model : model,
			navigationWindow : navigationWindow
		}).getView();

		var views = $.scrollableView.getViews();
		views.unshift(postPage);
		$.scrollableView.setViews(views);
		$.scrollableView.setCurrentPage(1);
	}
	if (OS_ANDROID) {
		var postPage = Alloy.createController("postPage", {
			model : model
		}).getView();

		var views = $.scrollableView.getViews();
		views.unshift(postPage);
		$.scrollableView.setViews(views);
		setTimeout(function() {
			$.scrollableView.setCurrentPage(1);
		}, 1000);

		//$.scrollableView.setCurrentPage(0);
	}

	Ti.API.info("ADD BEFORE - CURRENT PAGE: " + $.scrollableView.getCurrentPage());

};

function addPageAfter(model) {

	if (OS_IOS) {
		var postPage = Alloy.createController("postPage", {
			model : model,
			navigationWindow : navigationWindow
		}).getView();

		$.scrollableView.addView(postPage);

		/*var views = $.scrollableView.getViews();
		 views.push(postPage);
		 $.scrollableView.setViews(views);*/
	}
	if (OS_ANDROID) {
		var postPage = Alloy.createController("postPage", {
			model : model
		}).getView();

		$.scrollableView.addView(postPage);

		/*var views = $.scrollableView.getViews();
		 views.push(postPage);
		 $.scrollableView.setViews(views);*/
	}

	Ti.API.info("ADD AFTER - CURRENT PAGE: " + $.scrollableView.getCurrentPage());

};

function onHomeIconItemSelected() {
	$.postsPager.close();
}