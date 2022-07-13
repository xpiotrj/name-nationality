function show_data(data){
    var results = document.getElementById("results");
    for(var i =0; i < data.length; i++){
        var req = new XMLHttpRequest();
        req.open('GET', 'https://restcountries.com/v3.1/alpha/' + data[i]['country_id'], false);
        req.send();
        if(req.status == 200){
            var prop = data[i]['probability'].toString().slice(0,8);
            results.innerHTML += `<div class='result'>
                <div class='flag'>
                    <img src="${JSON.parse(req.responseText)[0]['flags']['png']}" alt="flag">
                </div>
                <div class='info'>
                    <span class="country">${JSON.parse(req.responseText)[0]['name']['common']}, ${data[i]['country_id']}</span><br>
                    Propability: ${prop}
                </div>
            </div>`;
        }
    }
}

function request_natio(name){
    var req = new XMLHttpRequest();
    req.open('GET', 'https://api.nationalize.io?name=' + name, false);
    req.send(null);
    if(req.status == 200){
        if(JSON.parse(req.responseText)['country'] == 0){
            alert('no data for: ' + name);
            return false;
        }
        document.getElementById("results").innerHTML = '';
       show_data(JSON.parse(req.responseText)['country']);
    }
    else{
        alert('api error');
    }
}



function check(){
    var name = document.getElementById("name").value;
    request_natio(name);
}