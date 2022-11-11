


const list = document.getElementById('Messages');


function clearList (){
    for ( const element of list.children )
        element.remove();
}

function logMessage ( message ){
    
    const element = document.createElement('div');
    element.innerText = message;
    list.appendChild(element);
}

clearList();
