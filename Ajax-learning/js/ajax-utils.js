(function (global) {
	
	// Set up namespace of our ajax utility
	var ajaxUtils = {}


	// Return an HTTP request object
	function getRequestObject() {
		if (window.XMLHttpRequest) {
			return (new XMLHttpRequest());
		}
		else if (window.ActiveXObject) {
			return (new ActiveXObject("Microsoft.XMLHttp"));
		}
		else {
			global.alert("Ajax is not supported!")
			return (null);
		}
	}

	ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
		var request = getRequestObject();
		request.onreadystatechange = function () {
			handleResponse(request, responseHandler, isJsonResponse);
		};
		//request.onreadystatechange();
		request.open("GET", requestUrl, true);
		request.send(null); // for POST only
	}

	function handleResponse(request, responseHandler, isJsonResponse) {
		if ((request.readyState == 4) && (request.status == 200)) {
      if (isJsonResponse == undefined) {
        isJsonResponse = true;
      }

      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText));
      }
      else{
        responseHandler(request.responseText);
      }
    }
	}

	global.$ajaxUtils = ajaxUtils;

})(window);