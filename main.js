if(sessionStorage.getItem("loggedIn") == "true") {
    
    // If logged in
    // setData()
    getUserData2()
} 
else if (sessionStorage.getItem("loggedIn") == "false" || sessionStorage.getItem("loggedIn") == null) {
    window.location.replace("http://127.0.0.1:5500/index.html")
}

function getUserData2() {
    var randomNum = Math.floor(Math.random() * 15) + 10
    var url = "https://random-data-api.com/api/users/random_user" + "?size=" + randomNum

    $.get(url, function(data) {
        var table, tableRowE, name, id, phoneNumber, plan, status;
        var subscriptions = ""
        var statusOnSubs = ""

        table = document.getElementById('dataTable')
        console.log(data.length)
        for (let index = 0; index < data.length; index++) {
            tableRowE = document.createElement('tr')
            name = document.createElement('td')
            id = document.createElement('td')
            phoneNumber = document.createElement('td')
            plan = document.createElement('td')
            status = document.createElement('td')

            name.innerHTML = data[index].employment.title
            id.innerHTML = data[index].uid
            phoneNumber.innerHTML = data[index].phone_number
            plan.innerHTML = data[index].subscription.plan
            status.innerHTML = data[index].subscription.status

            subscriptions += data[index].subscription.plan + ","
            statusOnSubs += data[index].subscription.status + ","

            table.append(tableRowE)
            tableRowE.append(name)
            tableRowE.append(id)
            tableRowE.append(phoneNumber)
            tableRowE.append(plan)
            tableRowE.append(status)
        }
        var splittedSubs = subscriptions.split(',')
        splittedSubs.pop()
        var sortedElements = {}
        splittedSubs.forEach(element => {
            sortedElements[element] = (sortedElements[element] || 0) + 1;
        });

        createPieChart('pieChartSubs', Object.values(sortedElements), Object.keys(sortedElements), 'Abonnementer')

        var splittedStatus = statusOnSubs.split(',')
        splittedStatus.pop()
        var sortedElements = {}
        splittedStatus.forEach(element => {
            sortedElements[element] = (sortedElements[element] || 0) + 1;
        });

        createPieChart('pieChartStatus', Object.values(sortedElements), Object.keys(sortedElements), 'Status på abonnementer')
    })
}


function getUserData() {
    var url = "https://random-data-api.com/api/users/random_user"

    $.get(url, function(data) {
    
        var table, tableRowE, name, id, phoneNumber, plan, status;
        table = document.getElementById('dataTable')
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

        table.append(tableRowE)
        tableRowE.append(name)
        tableRowE.append(id)
        tableRowE.append(phoneNumber)
        tableRowE.append(plan)
        tableRowE.append(status)
    })
    console.log(tempdata)
}

function setData() { 
    var randomNum = Math.floor(Math.random() * 15) + 10

    for (let index = 0; index < randomNum; index++) {
        getUserData()
    }
    createPieChart('pieChartSubs', subscriptions, [], 'Abonnementer')
    createPieChart('pieChartStatus', statusOnSubs, [], 'Status på abonnementer')
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

function createPieChart(id, data, labels, title){
    const ctx = document.getElementById(id).getContext('2d')

    const pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                data: data,
                backgroundColor: ['#e60049', '#0bb4ff', '#50e991', '#e6d800', '#9b19f5', '#ffa300', '#dc0ab4', '#b3d4ff', '#00bfa0'],
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title
            }
            }
        },
    })
}