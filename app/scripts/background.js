(function () {
/* verify vote */
setInterval(function() {


	Cookies.remove('Buddy-Vote');
	let login = '';
	let vote = '';
	login = Cookies.get('Buddy-Login');
	vote = Cookies.get('Buddy-Vote');

	// if ( login === '' || login === null || login === undefined ) {

	// 	if (!('Notification' in window)) {
	// 		alert('This browser does not support desktop notification');
	// 	}
	// 	else if (Notification.permission === 'granted') {
	// 		var notification = new Notification('Olá, faça login por favor!');
	// 		voteAgain();
	// 	}
	// 	else if (Notification.permission !== 'denied') {
	// 		Notification.requestPermission(function (permission) {
	// 			if (permission === 'granted') {
	// 				var notification = new Notification('Olá, faça login por favor!');
	// 				voteAgain();
	// 			}
	// 		});
	// 	}

	// } else if ( vote === '' || vote === null || vote === undefined ) {

	// 	if (!('Notification' in window)) {
	// 		alert('This browser does not support desktop notification');
	// 	}
	// 	else if (Notification.permission === 'granted') {
	// 		var notification = new Notification('Olá, como está seu dia hoje?');
	// 		voteAgain();
	// 	}
	// 	else if (Notification.permission !== 'denied') {
	// 		Notification.requestPermission(function (permission) {
	// 			if (permission === 'granted') {
	// 				var notification = new Notification('Olá, como está seu dia hoje?');
	// 				voteAgain();
	// 			}
	// 		});
	// 	}

	// } else {

	// }

}, 10000); 

/* 
3600000 1hour 
86400000 24hours
*/

function voteAgain() {

	chrome.tabs.create({
		url: chrome.extension.getURL('pages/popup.html'),
		active: true
	}, function(tab) {
            // chrome.windows.create({
            //     tabId: tab.id,
            //     type: 'popup',
            //     focused: true
            //     // incognito, top, left, ...
            // });
        });

}
  /*end js*/
})();