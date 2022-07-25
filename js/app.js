//go to components in getbootstrap.com then copy navbar code
//console.log("app.js");

//to shownotes ..
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        if (element.title == "")
            element.title = `[ Untitled ${index + 1} ]`;
        if (element.txt == "")
            element.txt = `[ Empty ]`;
        html += `
        <div class="noteCard my-2 mx-3 card" style="box-sizing:box;padding:2px;width:18rem;border-radius: 25px;">
        <div class="card-body" style="padding:18px;border:5px solid white;border-radius:25px;"><a id="${index}" onclick="edit(this.id)" style="float:right;clear:both;font-size:17px;color:white;background-color: rgb(4, 166, 241);" class="btn"><b>Edit</b></a>
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.txt}</p>
          <a id="${index}" onclick="deleteNote(this.id)" style="color:white;background-color:#f45555;" class="btn"><b>Delete Note</b></a>
          <font size="1" style="font-style:italic;float:right;clear:both;">${element.tim}</font>         
        </div>
        </div>`
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h3 style="color:white;"><i>Nothing to show!! add a Note ..</i></h3>`
    }
}
showNotes();

//if user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let str = new Date().toLocaleDateString('en-US', { day: "numeric", month: "short", hour: "numeric", minute: "numeric", hour12: true });
    let myobj = {
        title: addTitle.value,
        txt: addTxt.value,
        tim: str
    };
    notesObj.unshift(myobj);
    // notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    //    console.log(notesObj);
    showNotes();
});

//to search
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    //    console.log("Input event fired ..", inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        //console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});


function deleteNote(index) {
    //    console.log('i am deleting the note', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let dnotes = localStorage.getItem("deletednotes");
    if (dnotes == null) {
        dnotesObj = [];
    }
    else {
        dnotesObj = JSON.parse(dnotes);
    }
    dnotesObj.unshift(notesObj[index]);
    // dnotesObj.push(notesObj[index]);
    notesObj.splice(index, 1);   //will remove one element as mentioned from the index of that array..
    localStorage.setItem("deletednotes", JSON.stringify(dnotesObj));
    localStorage.setItem("notes", JSON.stringify(notesObj));    //now updating local storage..
    showNotes();
}

function edit(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    addTxt.value = notesObj[index].txt;
    addTitle.value = notesObj[index].title;
    // console.log(notesObj[index].txt);
    // console.log(notesObj[index].title);
    deleteNote(index);
}





//to delete notes ..
// function deleteNote(index) {
// //    console.log('i am deleting the note', index);
//     let notes = localStorage.getItem("notes");
//     if (notes == null) {
//         notesObj = [];
//     }
//     else {
//         notesObj = JSON.parse(notes);
//     }
//     notesObj.splice(index, 1);   //will remove one element as mentioned from the index of that array..
//     localStorage.setItem("notes", JSON.stringify(notesObj));    //now updating local storage..
//     showNotes();
// }
