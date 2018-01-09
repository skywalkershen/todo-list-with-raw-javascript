var btn = document.querySelector('button');
var input = document.querySelector('input');
var todos = document.querySelector('.todos');
var done = document.querySelector('.done');

//global var for tracking the editting node
var editting = null;
document.body.addEventListener('click', editDone,false);

//add eventlistener for default items
var defaultItems = document.querySelectorAll('li');
for(var i =0; i < defaultItems.length; i++){
    defaultItems[i].querySelector('.close').addEventListener('click',removeItem,false);
    defaultItems[i].querySelector('.ok').addEventListener('click',toggleDone,false);
    defaultItems[i].children[0].addEventListener('click', edit, false);
}

//new element
btn.addEventListener('click', newItem, false);
input.addEventListener('keyup', enter(newItem), false);

function enter(callBack){
    return function(event){
        if(event.keyCode === 13){ //key == enter
           callBack();
        } 
    }
        
}

function newItem(){
    var content = document.querySelector('input').value;
    var newElem = document.createElement('li');
    var newClose = document.createElement('span');
    var newOk = document.createElement('span');
    var newText = document.createElement('span');

    newText.addEventListener('click', edit,false);
    newClose.className='close';
    newClose.innerHTML = 'X';
    newClose.addEventListener('click', removeItem, false);
    newOk.className = 'ok glyphicon glyphicon-ok';
    newOk.addEventListener('click', toggleDone,false);
    
    
    if(content){
        newText.innerHTML=content;
        todos.appendChild(newElem);
        document.querySelector('input').value = '';
        newElem.appendChild(newText);
        newElem.appendChild(newClose);
        newElem.appendChild(newOk);

    }else{
        alert('please input somthing');
    }
    
    
}

//delete elem
function removeItem(e){
    var item = e.target.parentNode;
    var parent = item.parentNode;
    parent.removeChild(item);
}

//toggle done
function toggleDone(e){
    var item = e.target.parentNode;
    var parent = item.parentNode;
    var target = parent.className === 'todos'? 
    document.querySelector('.done'):
    document.querySelector('.todos');

    //appendChild will move existing child to new location
    target.appendChild(item);
    $(e.target).toggleClass('blue');
    
}

//edit
function edit(e){
    e.stopPropagation();
    if(editting){
        editToggle(editting);
    }
    var item = e.target;
    editting = editToggle(item);

}




function editDone(event){
    event.stopPropagation();
    //if(event.target.tagName !== 'INPUT' && event.target.parentNode.tagName !== 'LI' && editting){
    if(editting && event.target !== editting){
        editToggle(editting);
        editting = null;
    }
}

function editDoneOnEnter(){
    editToggle(editting);
    editting = null;
} 

function editToggle(item){
    var parent = item.parentNode;
    var replaceTag = item.tagName==='SPAN'?'INPUT':'SPAN';
    var replacement = document.createElement(replaceTag);
    if(replaceTag === 'INPUT'){
        replacement.value = item.innerHTML; 
    }else{
        replacement.innerHTML = item.value;
    } 

    if(replacement.tagName === 'INPUT'){
        replacement.addEventListener('keyup', enter(editDoneOnEnter),false);
    }else{
        replacement.addEventListener('click', edit, false);
    }
    parent.insertBefore(replacement,item);
    parent.removeChild(item);
    return replacement;
}

