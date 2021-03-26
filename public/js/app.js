const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const firstMessage = document.querySelector('#message1')
const secondMessage = document.querySelector('#message2')

firstMessage.textContent=''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchElement.value

    firstMessage.textContent = "Loading..."
    secondMessage.textContent=''

fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            firstMessage.textContent=data.error
        }
        else {
            firstMessage.textContent = data.location
            secondMessage.textContent=data.forecast
        }
        
    })
})

})