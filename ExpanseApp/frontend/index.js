// api -->https://crudcrud.com/api/b5cd782016874bb280a85b2ad8e26d82
const API_KEY = "d4022fbcf3834702b621f412eb4dbd1f";

//global id for editing
let editId = undefined;

// first get data from form
let form = document.getElementById("form");

//on dom loaded
window.addEventListener("DOMContentLoaded", getAll);

//On submit
form.addEventListener("submit", (e) => sendData(e));

//getAll

async function getAll(event) {
  event.preventDefault();
  try {
    let res = await axios.get(`http://localhost:3000/expenses`);

    //disolay all exp
    res.data.map((expense) => {
      showOnscreen(expense);
    });
  } catch (error) {
    console.log(error);
  }
}

// sendData --> post and put
async function sendData(e) {
  try {
    e.preventDefault();
    console.log("send data");
    let amount = document.getElementById("amount");
    let description = document.getElementById("description");
    let type = document.getElementById("ExpanaseType");

    let expenseObj = {
      amount: amount.value,
      description: description.value,
      type: type.value,
    };

    if (editId) {
      // console.log(editId);
      //edit // put request

      await axios.put(`http//localhost:3000/expenses/${editId}`, expenseObj);
      showOnscreen({ ...expenseObj, _id: editId });
      editId = undefined;
    } else {
      // try {
      //post
      let response = await axios.post(
        `http://localhost:3000/expenses`,
        expenseObj
      );
      showOnscreen(response.data);
    }
    amount.value = "";
    description.value = "";
    type.value = "other";
  } catch (error) {
    console.log(error);
  }
}

//show on screen
function showOnscreen(obj) {
  let ul = document.getElementById("listExpense");
  let newLi = `<li id="${obj._id}">  
  Expense Type : ${obj.type}   Amount : ${obj.amount}   Description : ${obj.description} <button onclick="editExp('${obj._id}')">Edit</button><button onclick="delExp('${obj._id}')">Delete</button>
  </li>
  `;

  ul.innerHTML = ul.innerHTML + newLi;
}

//remove from screen
function removeFromScreen(id) {
  document.getElementById(id).remove();
}

// DELETE
async function delExp(id) {
  //delete
  try {
    await axios.delete(`http://localhost:3000/expenses/${id}`);
    removeFromScreen(id);
  } catch (error) {
    console.log("delete", error);
  }
}

// EDIT
async function editExp(id) {
  try {
    //get expense
    let expenseObj = await axios.get(`http://localhost:3000/expenses/${id}`);
    console.log(expenseObj);

    //set global edit id
    editId = id;

    //now set data on form
    document.getElementById("amount").value = expenseObj.data.amount;
    document.getElementById("description").value = expenseObj.data.description;
    document.getElementById("ExpanaseType").value = expenseObj.data.type;

    //remove from screen
    removeFromScreen(id);
  } catch (error) {
    console.log("edit function", error);
  }
}
