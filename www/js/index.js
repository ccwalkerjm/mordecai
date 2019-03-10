const formatMoney = function (n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c;

    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;

    const s = n < 0 ? "-" : "";
    const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
    //let j;
    //j= (j = i.length) > 3 ? j % 3 : 0;
    const j = 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


const getStatus = function(x) {
  if(x===0) return "fa-dove";
  else if(x<25) return "md-face";
  else return "fa-twitter";
};


function loadJson(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const json = JSON.parse(this.responseText);
      callback(null, json);
    }else {
      callback(new Error(this.statusText));
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


const doInitPage= function(){
  const populateTable = function(items){
    const menu_items_elemt = document.querySelector('#menu-items');
    menu_items_elemt.innerHTML = '<ons-row>'+
                       '<ons-col width="5%"><h4>No</h4></ons-col>'+
                       '<ons-col width="50%"><h4>Description</h4></ons-col>'+
                       '<ons-col width="20%"><h4>Price</h4></ons-col>'+
                       '<ons-col width="10%"><h4>Status</h4></ons-col>'+
                       '<ons-col width="15%"></ons-col>'+
                       '</ons-row>';
    for(let i=0;i<items.length;i++){
      const x = items[i];
      const row_item =document.createElement("ons-row");

      const col_no =document.createElement("ons-col");
      col_no.setAttribute('width','5%');
      col_no.innerHTML = '<span>'+(i+1).toString()+'</span>';
      row_item.appendChild(col_no);

      const col_description =document.createElement("ons-col");
      col_description.setAttribute('width','50%');
      col_description.innerHTML = '<span>'+x.menu+'</span>';
      row_item.appendChild(col_description);

      const col_price =document.createElement("ons-col");
      col_price.setAttribute('width','20%');
      col_price.innerHTML = '<span class="money">'+formatMoney(x.price)+'</span>';
      row_item.appendChild(col_price);

      const col_status =document.createElement("ons-col");
      col_status.setAttribute('width','10%');
      col_status.innerHTML = '<span><ons-icon icon="'+getStatus(x.status)+'"></ons-icon></span>';
      row_item.appendChild(col_status);

      const col_btn =document.createElement("ons-col");
      col_btn.setAttribute('width','15%');
      col_btn.setAttribute('class','btn_container');
      const btn =document.createElement("ons-button");
      btn.addEventListener('click', function(){
        const msg = x.menu + " is " + (x.status === 0 ? "Finished" : (x.status < 25 ? "Almost Finised" : "OK"));
        ons.notification.alert(msg);
      });
      btn.innerHTML = "Select";
      col_btn.appendChild(btn);
      row_item.appendChild(col_btn);

      menu_items_elemt.appendChild(row_item);

    }
  };

  let url = 'items.json';
  loadJson(url, function(err, items){
    if(err) return;
    console.log("loading file", items);
    populateTable(items);
  });
};


ons.ready(function(){
   doInitPage();
});