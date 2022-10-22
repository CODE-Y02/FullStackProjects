// let API = "5266710aa43c47a185324357b7258ab5";
let API = "ae5907560a734e389aed11f7d2093408";

let appointments = []; // appointments Array

let globalID = null;

window.addEventListener("DOMContentLoaded", (e) => {
  getAllAppointments(e);
});

function getAllAppointments(e) {
  e.preventDefault();
  document.getElementById("userList").innerHTML = "";
  axios
    .get(`https://crudcrud.com/api/${API}/appointment`)
    .then((response) => {
      console.log("DCL", response);
      appointments = response.data;
      //now show on screen ;
      appointments.map((booking) => {
        // console.log(booking);
        showEachBookingOnScreen(booking);
      });
    })
    .catch((error) => console.log(error));
}

function saveToServer(event) {
  event.preventDefault();
  // console.log("submitted");
  let name = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  let obj = {
    name: name,
    email: email,
  };

  if (globalID) {
    //edit post    PUT REQUEST
    axios
      .put(`https://crudcrud.com/api/${API}/appointment/${globalID}`, obj)
      .then((response) => {
        console.log("postUpdated", response);
        showEachBookingOnScreen({ ...obj, id: globalID });
        // getAllAppointments()
        globalID = null;
      })
      .catch((error) => console.log(error));
  } else {
    axios
      .post(`https://crudcrud.com/api/${API}/appointment/`, obj)
      .then((response) => {
        console.log("added", response);
        showEachBookingOnScreen(response.data);
      })
      .catch((error) => console.log(error));
  }
}

function showEachBookingOnScreen(user) {
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

  let oldlist = document.getElementById("bookings");

  let newEle = `
  <li class="list-group-item"  id="${user.id}"> 
  Name: ${user.username}   Email: ${user.email}  Phone: ${user.phone}

  <button type="button" class="btn btn-danger" onclick="deleteBooking(event,'${user.id}')>Delete</button> 
  <button 
  type="button"
   class="btn btn-success"  
   onclick="editBooking(event,'${user.id}')">Edit</button>                    
     </li> `;

  oldlist.innerHTML = oldlist.innerHTML + newEle;
}

function removeFromScreen(uid) {
  document.getElementById(uid).remove();
}

function deleteBooking(e, uid) {
  e.preventDefault();
  // uid == _id
  axios
    .delete(`https://crudcrud.com/api/${API}/appointment/${uid}`)
    .then(() => {
      removeFromScreen(uid);
    })
    .catch((error) => console.log(error));
}

function editBooking(e, uid) {
  e.preventDefault();

  //   let hidden = document.getElementById("hidden");
  //   hidden.value = "";

  axios
    .get(`https://crudcrud.com/api/${API}/appointment/${uid}`)
    .then((response) => {
      document.getElementById("username").value = response.data.username;
      document.getElementById("email").value = response.data.email;
      document.getElementById("phone").value = response.data.phone;
      globalID = uid;
      removeFromScreen(uid);
    })
    .catch((error) => console.log("error in edit", error));
}
