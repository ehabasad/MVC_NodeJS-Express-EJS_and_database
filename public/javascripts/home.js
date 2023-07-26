//
// //The APIKEY variable is a string containing a API key.
// const APIKEY = "pg778oU23kgZJPR1ITvYgQLzouyh0lj3qv4m85dp";
//
// // Declare variables that will be used to store dates
// let currDate = null;
// let selectedDate = null;
//
// // Declare an array to store data about pictures
// const pictures = [];
//
// // Get references to DOM elements
// const secondScreen = document.getElementById("SecondScreen");
//
// // Set the value of the date input element with the ID "myDate" to the current date
// // document.getElementById('myDate').valueAsDate = new Date();
//
// // Wait for the DOM to load, then add event listeners to DOM elements
// document.addEventListener("DOMContentLoaded", function () {
//
//     // Add a "click" event listener to the element with the ID "newDate"
//     document.getElementById("newDate").addEventListener("click", () => {
//         // When the element is clicked, hide the first screen and show the second screen
//         //secondScreen.hidden = false;
//         // Call a function called "checkDate"
//         checkDate();
//     }, false);
//
//     // Add a "click" event listener to the element with the ID "loadMore"
//     document.getElementById("loadMore").addEventListener('click', fetchMore);
// });
//
// function checkDate() {
//
//     // Set the currDate variable to a new Date object based on the value of the date input element with the ID "myDate"
//     currDate = new Date(document.getElementById("myDate").value);
//     console.log(currDate, selectedDate);
//     // Set the selectedDate variable to a new Date object representing the current date
//     selectedDate = new Date();
//
//     // Set the inner HTML of the element with the ID "pictures" to an empty string
//     document.getElementById("pictures").innerHTML = '';
//
//     // Call a function called "getData"
//     getData();
// }
//
// function getData() {
//     // Send a fetch request to the NASA API with the specified API key, start date, and end date
//     fetch('https://api.nasa.gov/planetary/apod?api_key=' + APIKEY +
//         "&start_date=" + currDate.toISOString().split("T")[0] + "&end_date=" + selectedDate.toISOString().split("T")[0])
//         .then((response) => {
//             // Process the response from the API as a JSON object and assign it to the data variable
//             return response.json()
//         }).then((data) => {
//         // Get a reference to the DOM element with the ID "container"
//         const container = document.getElementById("pictures")
//
//         // Loop through the elements in the data array in reverse order
//         for (let i = data.length - 1; i >= 0; i--) {
//             // Use the findIndex method to check if an element with a matching title already exists in the pictures array
//             const index = pictures.findIndex((item) => item.id === data[i].title)
//
//             // If an element with a matching title is not found
//             if (index === -1) {
//                 // Create a string of HTML containing several DOM elements:
//                 let copyright = ``;
//                 if (data[i].copyright) {
//                     copyright = `<h4>${data[i].copyright}</h4>`;
//                 }
//                 // Determine whether to display an image or video based on the media_type of the data element
//                 const mediaDiv = `<div>${data[i].media_type === 'image' ?
//                     `<img class="img-fluid img-thumbnail" src="${data[i].url}" style="width: 50vw;" alt='${data[i].title}'/>`
//                     : `<iframe src='${data[i].url}'></iframe>`}</div>`;
//
//                 // Get the date of the data element as an ID for the card element
//                 const id = data[i].date;
//
//                 // Create the card element as a string of HTML
//                 const cardDiscription = `
//                     <div class="cardDiscription">
//                         <div class="row">
//                             <div class="col-6 p-4">
//                             <h2>${data[i].title}</h2>
//                             <h3>${data[i].copyright}</h3>
//                             <h3>${data[i].date}</h3>
//                             <p>${data[i].explanation}</p>
//                             </div>
//                             <div class="col-6 p-4">
//                             ${mediaDiv}
//                             <button class="btn btn-primary mt-2" type="button" data-bs-toggle="collapse"
//                                 data-bs-target="#collapse${id}" aria-expanded="false" aria-controls="collapseComments">
//                                 show comments
//                             </button>
//                             <div class="collapse mt-2" id="collapse${id}">
//                                 <div class="card card-body" id="com">
//                                 <div id = "${data[i].title}"></div>
//                                 </div>
//                             </div>
//                             ${createComment(data[i].title, i)}
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 container.innerHTML += cardDiscription;
//                 pictures.push({ id: data[i].title, comments: [] });
//             }
//         }
//     })
// }
// // Function that creates a form for adding comments to a card element
// function createComment(title, id) {
//     // Create a string of HTML containing an input field and a submit button
//     const commentForm = `
//                 <div class="mt-2">
//                 <input class = "form-control" type="text" id="comment${id}"/>
//                 <button class = "btn btn-outline-primary btn-sm mt-2" onclick="postComment('${title}', ${id})">SUBMIT</button>
//                 </div>`;
//
//     // Return the comment form HTML string
//     return commentForm;
// }
//
// function postComment(title, id) {
//     // Create an object called comment with name, comment, and id properties
//     const comment = { name: username };
//     // Get a reference to the input field with an ID matching the id argument
//     const commentText = document.getElementById(`comment${id}`);
//     // Get the value of the input field and assign it to the text variable
//     const text = commentText.value;
//     // Assign the text variable to the comment property of the comment object
//     comment.comment = text;
//     // Assign the id argument to the id property of the comment object
//     comment.id = id;
//     // Send a fetch request to the /users/:title route with the POST method, Content-Type header set to application/json, and the comment object stringified and passed as the request body
//     fetch(`comment/${title}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(comment)
//     }).then(response => response.json()) // Process the response from the fetch request as a JSON object and assign it to the data variable
//         .then(data => {
//             console.log("===============", data)
//             // Get a reference to the div element with an ID matching the title argument
//             const div = document.getElementById(title);
//             // Set the value of the input field to an empty string
//             commentText.value = '';
//             // Assign an ID to the p element consisting of the title and id properties of the data object
//             const id = `${title}${data.id}`;
//             // Add a p element containing the text variable and a delete button to the inner HTML of the div element
//             div.innerHTML += `<p id="${id}">${text}<a onclick="deleteComment(${data.id},'${title}')"
//                                         class="text-danger ms-2">delete</a></p>`
//
//             const index = pictures.findIndex((c) => c.id === title)
//             if (index > -1) {
//                 pictures[index].comments.push(data);
//             }
//         })
// }
//
// // DELETE request - /user/:title/:id
// function deleteComment(id, idComment) {
//     const title = idComment;
//     // Make a DELETE request to the URL that includes the id and idComment in the path
//     fetch(`comment/${title}/${id}`, {
//         method: 'DELETE',
//         headers: { "Content-Type": "application/json" },
//     })
//         // When the response returns, check if it is not an error
//         .then(function (response) {
//             if (response.status !== 200) {
//                 // If it is an error, throw an error message
//                 throw response.statusText;
//             } else {
//                 // If it is not an error, find the element with the id "${id}${idComment}" and remove it
//                 const comment = document.getElementById(`${idComment}${id}`)
//                 comment.remove()
//             }
//             // Return the response as JSON
//             return response.json();
//         })
//         // If there is an error with the request, log it to the console
//         .catch(function (error) {
//             console.log(error);
//         })
// }
// function fetchMore() {
//     // Set the selectedDate to the current date
//     selectedDate.setDate(new Date().getDate());
//     // Set the currDate to 3 days before the current date
//     currDate.setDate(currDate.getDate() - 3);
//     // Call the getData function
//     getData();
// }
