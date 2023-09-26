const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');

//criar uma variavel para guardar as tarefas digitada e depois colocar no html
// totalmentoe entrada para array
let tasks = [];  

function renderTaskOrHTML(verEscrito, done = false){
    

//adicionar a nova tarefa no html
const li = document.createElement('li');
//li.textContent = verEscrito // criando uma li com o que esta escrito

const input = document.createElement('input');//criando input
input.setAttribute('type', 'checkbox');//type="checkbox"
input.addEventListener('change', (evento)=>{
    const litotoggle = evento.target.parentElement;

    const spanTotoggle = litotoggle.querySelector('span');  
    const  done = evento.target.checked;
    if(done){
        spanTotoggle.style.textDecoration = "line-through ";
    }else{
        spanTotoggle.style.textDecoration = "none";
    }
    tasks = tasks.map(t => {
        if(t.title === spanTotoggle.textContent){
            return {
                title : t.title,
                done : !t.done,
            }
        }
        return t
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
   // console.log(tasks);
});
input.checked = done ;


const span = document.createElement('span');
span.textContent = verEscrito;

if(done){
span.style.textDecoration = "line-through ";
}
const button = document.createElement('button');
button.textContent = "Remover";
button.addEventListener('click', (evento)=>{

const liRemove = evento.target.parentElement;
const tituloRemove = liRemove.querySelector('span').textContent;

tasks = tasks.filter (t => t.title !==  tituloRemove); 

//console.log(evento.target.parentElement);
 todoListUl.removeChild(liRemove);
//console.log(tasks);

localStorage.setItem('tasks', JSON.stringify(tasks));
    });

li.appendChild(input);
li.appendChild(span);
li.appendChild(button);


todoListUl.appendChild(li);
}

window.onload = () =>{
    const taskslocalStorage = localStorage.getItem('tasks');
    if(!taskTitleInput ) 
    return
     tasks = JSON.parse(taskslocalStorage);
     tasks.forEach(t => {
        renderTaskOrHTML(t.title, t.done);
    
});    
     //console.log(taskslocalStorage);
 }




//agora vai ser um objeto  . vai ter o titulo e  (boleano:  true ou false  )
form.addEventListener('submit', (evento )=>{
    evento.preventDefault() // evita recarrega a pagina no submit


const verEscrito = taskTitleInput.value ;
//console.log(verEscrito);
if (verEscrito.length <  3) {
    alert ('sua tarefa tem que ser maior que 3 caracteres');
   return;
}

// adicionar a tarefa no array ---------------------primeira adicão da tarefa
tasks.push(
 {title: verEscrito,
  done: false,
 } );
//console.log(tasks);

localStorage.setItem('tasks', JSON.stringify(tasks));


renderTaskOrHTML(verEscrito);

taskTitleInput.value = '';

});

