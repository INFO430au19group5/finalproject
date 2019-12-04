const formElem = document.querySelector('form');
formElem.addEventListener('submit', async (e) => {
    // on form submission, prevent default
    e.preventDefault();
    // grab all form values
    var company1 = document.getElementById("company").value;
    var position1 = document.getElementById("positionID").value;
    var salary1 = document.getElementById("salaryID").value;
    var stipend1 = document.getElementById("userHousingStipend").value;
    var stages1 = document.getElementById("userStages").value;

    var process = []
    if (document.getElementById("messageCheckbox1").checked) { 
        process.push(document.getElementById("messageCheckbox1").value);
    }
    if (document.getElementById("messageCheckbox2").checked) {
        process.push(document.getElementById("messageCheckbox2").value);
    }
    if (document.getElementById("messageCheckbox3").checked) {
        process.push(document.getElementById("messageCheckbox3").value);
    }
    if (document.getElementById("messageCheckbox4").checked) {
        process.push(document.getElementById("messageCheckbox4").value);
    }
    if (document.getElementById("messageCheckbox5").checked) {
        process.push(document.getElementById("messageCheckbox5").value);
    }
    if (document.getElementById("messageCheckbox6").checked) {
        process.push(document.getElementById("messageCheckbox6").value);
    }
    if (document.getElementById("messageCheckbox7").checked) {
        process.push(document.getElementById("messageCheckbox7").value);
    }

    // construct body of request
    var body = { 
        "company": company1,
        "position": position1,
        "salary": salary1,
        "stipened": stipend1,
        "stages": stages1,
        "process": process,
    }

    console.log(body)

    // send request via API
    // var request = new XMLHttpRequest();
    // request.open("POST", "https://a3gk63que0.execute-api.us-west-2.amazonaws.com/dev/createjobdetails");
    // request.send(body);

    const url = 'https://a3gk63que0.execute-api.us-west-2.amazonaws.com/dev/createjobdetails';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: body, // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
    } catch (error) {
        console.error('Error:', error);
    }

    
    // reset form
    var form = document.getElementById("userForm");
    form.reset();
});