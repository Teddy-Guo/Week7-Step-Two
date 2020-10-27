// console.log("Hello form app.js");
window.addEventListener('load', () => {
    document.getElementById('button-workout').addEventListener('click', ()=>{
        let noMins= document.getElementById('Mins-workout').value;
        console.log(noMins);

        //we are creating the objetc
        let obj = {"mins" : noMins};

        //stringify the object
        let jsonData = JSON.stringify(obj);
        //add change
        //fetch to route noMins
        fetch('/noMins', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});

        //1. make a fetch request of type POST so that we can send the (router) info to the sever;
        //2. go to sever itself (index.js)
    })

    document.getElementById('get-tracker').addEventListener('click', ()=> {
        //get info on all the time we've workout
        fetch('/getMins')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('workout-info').innerHTML = '';
            console.log(data.data);
            for(let i=0; i<data.data.length; i++) {
                let string = data.data[i].date + " : " + data.data[i].workout;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('workout-info').appendChild(elt);
            }
        })
    })
})