if(localStorage.getItem("loggedIn") == "true") {
    
    // If logged in
    setData()
} 
else if (localStorage.getItem("loggedIn") == "false" || localStorage.getItem("loggedIn") == null) {
    window.location.replace("http://127.0.0.1:5500/index.html")
}

function getUserData() {
    var url = "https://random-data-api.com/api/users/random_user"
    var tempData;

    $.get(url, function(data) {
    
        var tableE, tableRowE, name, id, phoneNumber, plan, status;
        tableE = document.getElementById('dataTable')
        tableRowE = document.createElement('tr')
        name = document.createElement('td')
        id = document.createElement('td')
        phoneNumber = document.createElement('td')
        plan = document.createElement('td')
        status = document.createElement('td')


        name.innerHTML = data.employment.title
        id.innerHTML = data.uid
        phoneNumber.innerHTML = data.phone_number
        plan.innerHTML = data.subscription.plan
        status.innerHTML = data.subscription.status

        tableE.append(tableRowE)
        tableRowE.append(name)
        tableRowE.append(id)
        tableRowE.append(phoneNumber)
        tableRowE.append(plan)
        tableRowE.append(status)
    })
}
function setData() {
    var randomNum = Math.floor(Math.random() * 15) + 10

    for (let index = 0; index < randomNum; index++) {
      getUserData()
      
    }
}

function lookup() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("lookupUser");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }