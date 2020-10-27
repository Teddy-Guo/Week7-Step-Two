// console.log("Hello form app.js");
window.addEventListener('load', () => {
    document.getElementById('button-coffee').addEventListener('click', ()=>{
        let noCups= document.getElementById('cups-coffee').value;
        console.log(noCups);

        //we are creating the objetc
        let obj = {"cups" : noCups};

        //stringify the object
        let jsonData = JSON.stringify(obj);
        //add change
        //fetch to route noCups
        fetch('/noCups', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});

        //1.make a fetch request of type POST so that we can send the (noCups) info to the sever;
        //2. go to sever itself (index.js)
    })

    document.getElementById('get-tracker').addEventListener('click', ()=> {
        //get info on all the coffees we've had 
        fetch('/getCups')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('coffee-info').innerHTML = '';
            console.log(data.data);
            for(let i=0; i<data.data.length; i++) {
                let string = data.data[i].date + " : " + data.data[i].coffee;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('coffee-info').appendChild(elt);
            }
        })
    })
})