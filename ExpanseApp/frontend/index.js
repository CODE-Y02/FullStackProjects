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
    let res = await axios.get(`https://crudcrud.com/api/${API_KEY}/expenses`);

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
    let desc = document.getElementById("desc");
    let type = document.getElementById("ExpanaseType");

    let expenseObj = {
      amount: amount.value,
      desc: desc.value,
      type: type.value,
    };

    if (editId) {
      // console.log(editId);
      //edit // put request

      await axios.put(
        `https://crudcrud.com/api/${API_KEY}/expenses/${editId}`,
        expenseObj
      );
      showOnscreen({ ...expenseObj, _id: editId });
      editId = undefined;
    } else {
      // try {
      //post
      let response = await axios.post(
        `https://crudcrud.com/api/${API_KEY}/expenses`,
        expenseObj
      );
      showOnscreen(response.data);
    }
    amount.value = "";
    desc.value = "";
    type.value = "other";
  } 
  catch (error) 
  {
    console.log(error);
  }
}

//show on screen
function showOnscreen(obj) {
  let ul = document.getElementById("listExpense");
  let newLi = `<li id="${obj._id}">  
  Expense Type : ${obj.type}   Amount : ${obj.amount}   Description : ${obj.desc} <button onclick="editExp('${obj._id}')">Edit</button><button onclick="delExp('${obj._id}')">Delete</button>
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
    await axios.delete(`https://crudcrud.com/api/${API_KEY}/expenses/${id}`);
    removeFromScreen(id);
  } catch (error) {
    console.log("delete", error);
  }
}

// EDIT
async function editExp(id) {
  try {
    //get expense
    let expenseObj = await axios.get(
      `https://crudcrud.com/api/${API_KEY}/expenses/${id}`
    );
    console.log(expenseObj);

    //set global edit id
    editId = id;

    //now set data on form
    document.getElementById("amount").value = expenseObj.data.amount;
    document.getElementById("desc").value = expenseObj.data.desc;
    document.getElementById("ExpanaseType").value = expenseObj.data.type;

    //remove from screen
    removeFromScreen(id);
  } catch (error) {
    console.log("edit function", error);
  }
}
