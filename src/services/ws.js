let WS = new WebSocket("wss://tits.api.boobsrate.com/ws");
export default WS;

WS.onclose = function(e) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(function() {
        WS = new WebSocket("wss://tits.api.boobsrate.com/ws");
    }, 1000);
};

WS.onerror = function(err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    WS.close();
};