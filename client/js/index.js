document.getElementById('userForm').onsubmit = (e) => {
    e.preventDefault();

    const company = document.getElementById('company').value;
    const position = document.getElementById("positionList").value;
    const salary = document.getElementById("salary").value;
    const stripend = document.getElementById('userHousingStipend').value;
    const stage = document.getElementById('userStages').value;
    const checkboxes = getCheckBoxValues();

    console.log(company, position, salary)

    const url = 'https://a3gk63que0.execute-api.us-west-2.amazonaws.com/dev/createjobdetails';
    const data = {
        company: company,
        position: position,
        salary: salary,
        stripend: stripend,
        stage: stage,
        process: checkboxes
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            console.log('res = ')
            console.log(res);
            return res.json()
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log('catch:')
            console.error(err)
            return err;
        });
}

function getCheckBoxValues() {
    const checkboxes = document.getElementsByName("process");
    var items = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            items.push(checkboxes[i].value)
        }
    }
    return items;

}  