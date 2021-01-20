var bookMarkName = document.getElementById("name");
var bookMarkUrl = document.getElementById("url");
var btnAdd = document.getElementById("submit");
var update = document.getElementById("edit");
var bookMarkes;
var alertName = document.getElementById("alertName");
var alertURL = document.getElementById("alertURL");
var sitesInputs = document.getElementsByClassName("form-control");
var alertAdd = document.getElementById("alertAdd");
var alertUpdate = document.getElementById("alertUpdate");
var search = document.getElementById("search");
var bookMarkContent = document.getElementById("book-Mark-Content");

if(localStorage.getItem("myBookMark") == null){
    bookMarkes =[];
}
else{
    bookMarkes = JSON.parse(localStorage.getItem("myBookMark"));
    displayData();
}

// hide Update Button
hideBtn(update); 

btnAdd.onclick = function(){ 
    if(checkUrlName() && checkSiteName()){
        addSite();
        displayData();
        resetForm();
        alertAdd.classList.add("d-none");
    }
    else{
        alertAdd.classList.remove("d-none");
        alertAdd.innerHTML = "Not added ! please check all inputs are correct";
    }
}
function addSite(){
    var bookMark = {
        name : bookMarkName.value.trim(),
        url : bookMarkUrl.value.trim()
    }
    bookMarkes.push(bookMark);
    localStorage.setItem("myBookMark",JSON.stringify(bookMarkes));
}

function resetForm(){
    for(var i = 0; i < sitesInputs.length; i++){
        sitesInputs[i].value = "";
        sitesInputs[i].classList.remove("is-valid");
    }
}

function displayData(){
   
    var divs = "";
    for(var i = 0; i < bookMarkes.length; i++){
        divs += `
        <div class="book-mark-content-item p-3 mb-3">
            <div class="row">
            <div class="col-lg-4">
                <span class="bookmark-item-text pl-3">${bookMarkes[i].name}</span>
            </div>
            <div class="col-lg-8">
                <button class="btn btn-primary border-0 p-2 text-white rounded" id = 'link' onclick = 'visit(${i})')>visit</button>
                <button class="btn btn-danger border-0 p-2 text-white rounded" onclick = 'deleteItem(${i})'>delete</button>
                <button class="btn btn-success border-0 p-2 text-white rounded" onclick = 'showData(${i})'>update</button>
            </div>
            </div>
      </div>`
    }
    bookMarkContent.innerHTML = divs;
}

function deleteItem(Index){
    bookMarkes.splice(Index , 1);
    localStorage.setItem("myBookMark",JSON.stringify(bookMarkes));
    displayData();
}

function visit(Index){
    window.open(`https://${bookMarkes[Index].url}`, '_blank'); 
}

function showData(Index){
    bookMarkName.value = bookMarkes[Index].name;
    bookMarkUrl.value = bookMarkes[Index].url;
    var Id = Index;
    showBtn(update);
    hideBtn(btnAdd);
    update.setAttribute("onclick" , `Edit(${Id})`);
}

function Edit(Index){
    if(checkUrlName() && checkSiteName()){
        bookMarkes[Index].name = bookMarkName.value;
        bookMarkes[Index].url = bookMarkUrl.value;
        localStorage.setItem("myBookMark",JSON.stringify(bookMarkes));
        showBtn(btnAdd);
        hideBtn(update);
        displayData();
        resetForm();
        alertUpdate.classList.add("d-none");
    }
    else{
        alertUpdate.classList.remove("d-none");
        alertUpdate.innerHTML = "Not Uptated ! please check all inputs are correct";
    }
}

function showBtn(btn){
    btn.style.display = "block";
}

function hideBtn(btn){
    btn.style.display = "none";
}

bookMarkName.oninput = function(){
    checkSiteName();
}

function checkSiteName(){
    var regexName = /^[a-zA-Z]+(\s*[a-zA-Z]+)*$/;
    if(regexName.test(bookMarkName.value.trim())){
        bookMarkName.classList.add("is-valid");
        alertName.classList.add("d-none");
        bookMarkName.classList.remove("is-invalid");
        return true;
    }
    else{
        bookMarkName.classList.remove("is-valid");
        alertName.classList.remove("d-none");
        bookMarkName.classList.add("is-invalid");
        bookMarkName.value.trim() == "" ? alertName.innerHTML = "fill Site Name" : alertName.innerHTML = "Enter Site Name Characters only";
        return false;
    }
}

bookMarkUrl.oninput = function(){
    checkUrlName();
}

function checkUrlName(){
    var regexURL = /^www\.[a-z]+\.com$/;
    if(regexURL.test(bookMarkUrl.value.trim())){
        bookMarkUrl.classList.add("is-valid");
        alertURL.classList.add("d-none");
        bookMarkUrl.classList.remove("is-invalid");
        return true;
    }
    else{
        bookMarkUrl.classList.remove("is-valid");
        alertURL.classList.remove("d-none");
        bookMarkUrl.classList.add("is-invalid");
        bookMarkUrl.value.trim() == "" ? alertURL.innerHTML = "fill Site Name" : alertURL.innerHTML = "Enter Site URL Format www.yourdomain.com";
        return false;
    }
}

search.oninput = function(){
    searchSite(this.value);
}

function searchSite(value){
    var divs = "";
    for(var i = 0; i < bookMarkes.length; i++){
        if(  bookMarkes[i].name.toLowerCase().includes(value.toLowerCase()) ){
            divs += `
                <div class="book-mark-content-item p-3 mb-3">
                    <div class="row">
                    <div class="col-lg-4">
                        <span class="bookmark-item-text pl-3">${bookMarkes[i].name}</span>
                    </div>
                    <div class="col-lg-8">
                        <button class="btn btn-primary border-0 p-2 text-white rounded" id = 'link' onclick = 'visit(${i})')>visit</button>
                        <button class="btn btn-danger border-0 p-2 text-white rounded" onclick = 'deleteItem(${i})'>delete</button>
                        <button class="btn btn-success border-0 p-2 text-white rounded" onclick = 'showData(${i})'>update</button>
                    </div>
                    </div>
                </div>`
        }
    }
    bookMarkContent.innerHTML = divs;
}