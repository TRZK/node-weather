console.log('client side js is here')

const forecaster = (place, callback) => {
    fetch(`http://localhost:3000/weather?address=${place}`)
    .then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                return callback(data.error,undefined)
            }else{
                callback(undefined,data.forecast)
            }
        })
    })

}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.getElementById('message')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')
message1.textContent = '';
message2.textContent = '';
message.style.visibility = 'hidden';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    message.style.visibility = 'visible';
    console.log(location)
    forecaster(location, (error,response) => {
        if(error){
            message.style.visibility = 'hidden';
            message1.textContent = error;
            message2.textContent = '';
        }else{
            message2.textContent = response;
            message.style.visibility = 'hidden';
            
            message1.textContent = '';
        }
    })
})