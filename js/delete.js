//console.log('hello');
function showNotes() {
    let notes = localStorage.getItem("deletednotes");
    if (notes == null) {
        deletednotesObj = [];
    }
    else {
        deletednotesObj = JSON.parse(notes);
    }
    let html = "";
    deletednotesObj.forEach(function (element, index) {
        let title,txt;
        if(element.title == "")
            element.title = `[ Untitled ${index+1} ]`;
        if(element.txt == "")
            element.txt = `[ Empty ]`;
        html += `
        <div class="noteCard my-2 mx-3 card" style="padding:2px;width:18rem;border-radius: 25px;">
        <div class="card-body" style="padding:18px;border:5px solid white;border-radius:25px;"><a id="${index}" onclick="restore(this.id)" style="float:right;clear:both;font-size:17px;color:white;background-color: rgb(4, 166, 241);" class="btn"><b>Restore</b></a>
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.txt}</p>
          <a id="${index}" onclick="deleteNoteP(this.id)" style="font-size:17px;color:white;background-color:#f45555;" class="btn"><b>Delete Permanently</b></a>
          <font size="1" style="font-style:italic;float:right;">${element.tim}</font>         
        </div>
        </div>`
    });

    let notesElm = document.getElementById('deletednotes');
    if (deletednotesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h3 style="color:white;"><i>Trash is Empty ..</i></h3>`
    }
}
showNotes();

//to delete the note in permanenly folder..
function deleteNoteP(index) {
//    console.log('i am deleting the note', index);
    let notes = localStorage.getItem("deletednotes");
    if (notes == null) {
        dnotesObj = [];
    }
    else {
        dnotesObj = JSON.parse(notes);
    }
    dnotesObj.splice(index, 1);   //will remove one element as mentioned from the index of that array..
    localStorage.setItem("deletednotes", JSON.stringify(dnotesObj));    //now updating local storage..
    showNotes();
}

//restoring the notes ..
function restore(index) {
    console.log("clicked");
    let dnotes = localStorage.getItem("deletednotes");
    if(dnotes == null){
        dnotesObj=[];
    }
    else{
        dnotesObj = JSON.parse(dnotes);
    }
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj=[];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.unshift(dnotesObj[index]);
    deleteNoteP(index);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    localStorage.setItem("dnotes",JSON.stringify(dnotesObj));
    showNotes();
}

//to search
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
//    console.log("Input event fired ..", inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element) {
            let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
            //console.log(cardTxt);
            if(cardTxt.includes(inputVal)){
                element.style.display = "block";
            }
            else{
                element.style.display = "none";
            }
        });
});
