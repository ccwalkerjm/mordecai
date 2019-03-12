var formatMoney = function(n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c;

    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;

    var s = n < 0 ? "-" : "";
    var i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
    //var j;
    //j= (j = i.length) > 3 ? j % 3 : 0;
    var j = 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


var getStatus = function(x) {
    if (x === 0) return "fa-dove";
    else if (x < 25) return "md-face";
    else return "fa-twitter";
};


var items = [{
    "menu" : "Fried Chicken",
    "price": 530,
    "status": 50
  },
  {
    "menu": "Vegetable Soup",
    "price": 100,
    "status": 0
  },
  {
    "menu": "Bun and Cheese",
    "price": 150,
    "status": 0
  }];

var setGeoLocation = function(){
    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
};


var loadItems = function() {
    menu_items_elemt.innerHTML = '<ons-row>' +
        '<ons-col width="5%"><h4>No</h4></ons-col>' +
        '<ons-col width="50%"><h4>Description</h4></ons-col>' +
        '<ons-col width="20%"><h4>Price</h4></ons-col>' +
        '<ons-col width="10%"><h4>Status</h4></ons-col>' +
        '<ons-col width="15%"></ons-col>' +
        '</ons-row>';
    for (var i = 0; i < items.length; i++) {
        var x = items[i];
        var row_item = document.createElement("ons-row");

        var col_no = document.createElement("ons-col");
        col_no.setAttribute('width', '5%');
        col_no.innerHTML = '<span>' + (i + 1).toString() + '</span>';
        row_item.appendChild(col_no);

        var col_description = document.createElement("ons-col");
        col_description.setAttribute('width', '50%');
        col_description.innerHTML = '<span>' + x.menu + '</span>';
        row_item.appendChild(col_description);

        var col_price = document.createElement("ons-col");
        col_price.setAttribute('width', '20%');
        col_price.innerHTML = '<span class="money">' + formatMoney(x.price) + '</span>';
        row_item.appendChild(col_price);

        var col_status = document.createElement("ons-col");
        col_status.setAttribute('width', '10%');
        col_status.innerHTML = '<span><ons-icon icon="' + getStatus(x.status) + '"></ons-icon></span>';
        row_item.appendChild(col_status);

        var col_btn = document.createElement("ons-col");
        col_btn.setAttribute('width', '15%');
        col_btn.setAttribute('class', 'btn_container');
        var btn = document.createElement("ons-button");
        btn.addEventListener('click', function() {
            var msg = x.menu + " is " + (x.status === 0 ? "Finished" : (x.status < 25 ? "Almost Finised" : "OK"));
            ons.notification.alert(msg);
        });
        btn.innerHTML = "Select";
        col_btn.appendChild(btn);
        row_item.appendChild(col_btn);

        menu_items_elemt.appendChild(row_item);
    }
};

var menu_items_elemt;
ons.ready(function() {
    menu_items_elemt = document.querySelector('#menu-items');
    loadItems();
    setGeoLocation();
});