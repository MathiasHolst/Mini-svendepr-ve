var users = [{
    username: "admin",
    password: "admin",
},
{
    username: "jakup",
    password: "test",
}]

const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')
localStorage.setItem("loggedIn", false)

form.addEventListener('submit', (e) => {
    let messages = []
    if (name.value === "" || name.value == null) {
        messages.push("Name is required")
    }

    if(users.find(x => x.username === name.value) == undefined || users.find(x => x.password === password.value) == undefined) {
        messages.push("User does not exist")
    }

    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
        sessionStorage.setItem("loggedIn", false)
    } else {
        sessionStorage.setItem("loggedIn", true)
    }
})