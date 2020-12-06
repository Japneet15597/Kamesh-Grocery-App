// window.localStorage.clear()

let currentUserGlobal = {}

const stringifiedUsers = window.localStorage.getItem("Users")
if (!stringifiedUsers) {
    window.localStorage.setItem("Users", JSON.stringify([]))
}

let users = JSON.parse(stringifiedUsers)



function formSubmit(e) {
    e.preventDefault()
}


function submitForm(name) {

    if (name == "") {
        // alert("Please Enter a name to log in.")
        return
    }

    const currentUser = users.filter(item => {
        if (item.name == name) {
            return true
        } else {
            return false
        }
    })

    if (currentUser[0]) {
        currentUserGlobal = currentUser
    } else {
        const userObj = {
            name: name,
            groceryList: []
        }

        if (users.length >= 3) {
            users.shift()
        }


        users.push(userObj)
    }

    window.localStorage.setItem("Users", JSON.stringify(users))
    alert("You have logged in!")
    document.getElementById("listArea").style.display = "block"
    document.getElementById("nameField").setAttribute("disabled", true)
    document.getElementById("loginButton").setAttribute("disabled", true)
    document.getElementById("logOutButton").style.display = "block"
    populateList(name)

}

function populateList(name) {

    const currentUser = users.filter(item => {
        if (item.name == name) {
            return true
        } else {
            return false
        }
    })

    currentUserGlobal = currentUser

    buildList(currentUser, "firstTime")
}

function buildList(user, calledFrom) {

    if (calledFrom == "firstTime") {
        var list = document.createElement("ul")
        list.setAttribute("id", "groceryList")

    } else {
        var list = document.getElementById("groceryList")
        var newList = document.createElement("ul")
        newList.setAttribute("id", "groceryList")
    }

    if (user[0].groceryList.length > 0) {

        user[0].groceryList.map(item => {
            var listItem = document.createElement("li")
            listItem.style.marginTop = "10px"
            var text = document.createTextNode(item)

            // var editButton = document.createElement("BUTTON")
            // var editText = document.createTextNode("Edit")
            // editButton.style = "border-radius: 10px; border: 0px; padding: 5px; margin-left: 50px"
            // editButton.onclick = function () { EditListItem(item) }

            var deleteButton = document.createElement("BUTTON")
            var deleteText = document.createTextNode("Delete")
            deleteButton.style = "border-radius: 10px; border: 0px; padding: 5px; margin-left: 30px"
            deleteButton.onclick = function () { DeleteListItem(item) }

            // editButton.appendChild(editText)
            deleteButton.appendChild(deleteText)

            listItem.appendChild(text)
            // listItem.appendChild(editButton)
            listItem.appendChild(deleteButton)

            if (calledFrom == "firstTime") {
                list.appendChild(listItem)
            } else {
                newList.appendChild(listItem)
            }
        })
    }

    if (calledFrom == "firstTime") {
        var element = document.getElementById("listArea");
        element.appendChild(list)
    } else {
        var element = document.getElementById("listArea");
        element.replaceChild(newList, document.getElementById("groceryList"))
    }
}

// function EditListItem(item) {
//     console.log("ITEMMM", item)
//     for (var i = 0; i < currentUserGlobal.groceryList.length; i++) {

//     }

// }

function DeleteListItem(item) {

    const newGroceryList = currentUserGlobal[0].groceryList.filter(item1 => {
        if (item1 !== item) {
            return true
        } else {
            return false
        }
    })

    for (var i = 0; i < users.length; i++) {
        if (users[i].name == currentUserGlobal[0].name) {
            const newGroceryList = currentUserGlobal[0].groceryList.filter(item1 => {
                if (item1 !== item) {
                    return true
                } else {
                    return false
                }
            })

            users[i].groceryList = newGroceryList
        }
    }

    currentUserGlobal[0].groceryList = newGroceryList
    buildList(currentUserGlobal)

    window.localStorage.setItem("Users", JSON.stringify(users))
}

function logOut() {
    document.getElementById("nameField").removeAttribute("disabled")
    document.getElementById("loginButton").removeAttribute("disabled")
    document.getElementById("logOutButton").style.display = "none"
    document.getElementById("nameField").value = ""
    document.getElementById("item").value = ""
    document.getElementById("listArea").style.display = "none"
    document.getElementById("groceryList").remove()
}

function addItem(item) {

    const currentUser = document.getElementById("nameField").value

    for (var i = 0; i < users.length; i++) {
        if (currentUser == users[i].name) {
            if (users[i].groceryList.length == 5) {
                alert("Your list is full. Please remove one item to add another.")
                return
            } else {
                users[i].groceryList.push(item)
                buildList(currentUserGlobal, "repeat")
            }
        }
    }

    window.localStorage.setItem("Users", JSON.stringify(users))

}