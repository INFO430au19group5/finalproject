const formElem = document.querySelector('form');
formElem.addEventListener('submit', (e) => {
    // on form submission, prevent default
    e.preventDefault();

    // construct a FormData object, which fires the formdata event
    new FormData(formElem);
});

formElem.addEventListener('formdata', (e) => {
    console.log('formdata fired');

    // Get the form data from the event object
    // let data = e.formData;
    // for (var value of data.values()) {
    //     console.log(value);
    // }
    console.log(e.formData);

    // submit the data via XHR
    var request = new XMLHttpRequest();
    request.open("POST", "https://99b87o7r17.execute-api.us-west-2.amazonaws.com/dev/createjobdetails");
    request.send(formData);
});