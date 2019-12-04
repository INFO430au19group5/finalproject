//populating index.html the home page this will be called home.js
function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

let params = ['company', 'position', 'salary', 'stipend', 'stages', 'process'];
let table = document.getElementById('table');

const url = 'https://a3gk63que0.execute-api.us-west-2.amazonaws.com/dev/getjobdetails';

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {

    for (i = data.length - 1; i >= 0; i--) {
      elem = createNode('tr');
      append(table, elem);
      for (j = 0; j < params.length; j++) {
        e = createNode('th')
        e.innerHTML = data[i][params[j]];
        append(elem, e);
      }
    }

    let r = data[1][params[0]];
    console.log(r);
  })
  .catch(function (error) {
    print('error');
  });


//const response = await fetch('https://99b87o7r17.execute-api.us-west-2.amazonaws.com/dev/getjobdetails?fbclid=IwAR3mc0aIDQw0g1JTkJOfVAaeyYZemfBQhq3YwtTSqUUxUzLaU1C0KOnJwR8');
//const myJson = await response.json();

//console.log(JSON.stringify(myJson));
