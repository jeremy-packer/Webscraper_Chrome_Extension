document.getElementById('scrape_text').addEventListener('click', trigger_contentScriptText);
document.getElementById('scrape_image').addEventListener('click', trigger_contentScriptImage);

var html = "";
var text = "";
//sends the message to the content script and recieve a response of text and html
function send_message() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting : "hello"}, function(response) {
			//log of reponse for console
			console.log(response.message);
			displayOutput(response.list);
		});
  });
}

//trigger the send_message function and indicates that the contentScript exists
function trigger_contentScriptText(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(tabs[0].id, {file: "contentScriptText.js"}, function(){
			send_message();
		});
	});
}

//trigger the send_message function and indicates that the contentScript exists
function trigger_contentScriptImage(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(tabs[0].id, {file: "contentScriptImage.js"}, function(){
			send_message();
		});
	});
}

//function to adjust popup to display output
function displayOutput(output) {
	document.body.innerHTML = "<b>List<B><br>";
	for(var i = 0; i < output.length; i++){
		document.body.innerHTML +=  output[i]+"<br>";
	}
	document.body.style.height = "300px";
	document.body.style.width = "300px";
}
