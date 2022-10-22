let appointments = []; // appointments Array

window.addEventListener("DOMContentLoaded", (e) => {
  getAllAppointments(e);
});

function getAllAppointments(e) {
  e.preventDefault();
  document.getElementById("userList").innerHTML = "";
  axios
    .get(`http://localhost:3000/user`)
    .then((response) => {
      console.log("DCL", response);
      appointments = response.data || [];
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
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  let obj = {
    name: name,
    email: email,
    phone: phone,
  };

  let id = document.getElementById("hidden").value || undefined;

  if (id) {
    //edit post    PUT REQUEST
    axios
      .put(`http://localhost:3000/user/${id}`, obj)
      .then((response) => {
        console.log("postUpdated", response);
        showEachBookingOnScreen({ ...obj, id: id });

        // getAllAppointments()
      })
      .catch((error) => console.log(error));
  } else {
    axios
      .post(`http://localhost:3000/user`, obj)
      .then((response) => {
        console.log("added", response);
        showEachBookingOnScreen(response.data);
      })
      .catch((error) => console.log(error));
  }
}

function showEachBookingOnScreen(user) {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

  let oldlist = document.getElementById("userList");

  let newEle = `<li  id="${user.id}">
                  Name: ${user.name}   Email: ${user.email}   Phone: ${user.phone}

                  <button id="del" onclick="deleteBooking(event,'${user.id}')">Delete</button>
                  <button id="edit" onclick="editBooking(event,'${user.id}')">Edit</button>
              </li>`;

  oldlist.innerHTML = oldlist.innerHTML + newEle;
}

function removeFromScreen(uid) {
  document.getElementById(uid).remove();
}

function deleteBooking(e, uid) {
  console.log(uid);
  e.preventDefault();
  // uid == _id
  axios
    .delete(`http://localhost:3000/user/${uid}`)
    .then(() => {
      removeFromScreen(uid);
    })
    .catch((error) => console.log(error));
}

function editBooking(e, uid) {
  e.preventDefault();

  let hidden = document.getElementById("hidden");
  hidden.value = "";
  axios
    .get(`http://localhost:3000/user/${uid}`)
    .then((response) => {
      console.log("editing =======>>>>>>>>>>>  ", response);
      document.getElementById("name").value = response.data.name;
      document.getElementById("email").value = response.data.email;
      document.getElementById("phone").value = response.data.phone;
      hidden.value = uid;
      removeFromScreen(uid);
    })
    .catch((error) => console.log("error in edit", error));
}
