



const weatherForm=document.querySelector('form')
const selectValue=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//add event listener
weatherForm.addEventListener('submit',(event)=>{
    //no refreshing page as default
event.preventDefault()
const location=selectValue.value

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''

fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    //parsed here
response.json().then((dt)=>{
    if(dt.error){
        messageOne.textContent=dt.error
    }
    else{
        messageOne.textContent=dt.location
        messageTwo.textContent=dt.forecast
    }
})
})
})
