(function () {
	/* verify vote */
	setInterval(function() {
	
	let lastVote = JSON.parse( localStorage.getItem('Buddy-Last-Vote') );
	let date = moment().format('DD/MM/YYYY');
	let day = moment().format('dddd');
	let month = moment().format('MMM');
	
	/* verify is valid day of week */
	if( day != 'Saturday' && day != 'Sunday' && date != lastVote.day ) {

		localStorage.removeItem('Buddy-Vote');
		localStorage.removeItem('Buddy-Last-Vote');
		let login = '';
		let vote = '';
		login = JSON.parse( localStorage.getItem('Buddy-Login') );
		vote = JSON.parse( localStorage.getItem('Buddy-Vote') );

		resetVote(login, vote);
	} /* verify is valid day of week */

}, 3600000); 

/* 
3600000 1hour 
86400000 24hours
*/

function resetVote(login, vote) {
	if ( login === '' || login === null || login === undefined ) {

		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
		}
		else if (Notification.permission === 'granted') {
			var notification = new Notification('Olá, faça login por favor!');
			voteAgain();
		}
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (permission === 'granted') {
					var notification = new Notification('Olá, faça login por favor!');
					voteAgain();
				}
			});
		}

	} else if ( vote === '' || vote === null || vote === undefined ) {

		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
		}
		else if (Notification.permission === 'granted') {
			var notification = new Notification('Olá, como está seu dia hoje?');
			voteAgain();
		}
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (permission === 'granted') {
					var notification = new Notification('Olá, como está seu dia hoje?');
					voteAgain();
				}
			});
		}

	} else {

	}
}

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