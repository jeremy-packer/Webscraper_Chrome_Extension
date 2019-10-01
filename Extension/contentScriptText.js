//this listens for the popup to be clicked and then sends a response back
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	//runs the webscrape function and creates an output
	var output = web_scrape();
	//sends a log for the console as well as the output
	sendResponse({message : "Good to Go", list : output});
});

//this scrapes a webpage using the class name of the highlited text
function web_scrape(){
	//this grabs the parentnode tag
	var tag = window.getSelection().anchorNode.parentNode;
	//this grabs the clas name of the parent node
	var class_name = tag.className;
	//this finds all tags with that given class name
	var allTags = document.getElementsByClassName(class_name);
	//creates an empty array to hold text from tags
	var output = []
	//loops through tags
	for(var i = 0; i < allTags.length; i++){
		output.push(allTags[i].textContent.trim());
	}	
	return output;
}

//potentially used to grab element text
//var text = window.getSelection.baseNode;