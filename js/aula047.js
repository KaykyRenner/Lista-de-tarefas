const buttonAddTarefa = document.querySelector('.buttonAddTarefa')
const InputTarefa = document.querySelector('.InputTarefa')
const tarefas = document.querySelector('.tarefas')
function CreatLi(){
    const li = document.createElement('li') // criando um li
    return li
}
function AddLiEmUL(textInput){
    const li = CreatLi()
    tarefas.appendChild(li) // adicionando li em ul
    li.innerHTML += textInput
    clearTask() //chamando a fução que limpa o input, ou seja, sempre que clicar em "enviar" o input sera limpado
    CreatButtonDelet(li)
    SaveTask()
}
function CreatButtonDelet(li){ //função para criar butão de delete
    li.innerHTML += '          ' // para adicionar um espaço entre o texto e o butão de apagar
    const DeletButton = document.createElement('button');//criando o butão
    DeletButton.innerText = 'Apagar'; //adcionando o nome do butão
    li.appendChild(DeletButton)//colocando o butão dentro de li
    DeletButton.setAttribute('title', 'apagar esta tarefa')//adcionado um title ao butão
    DeletButton.setAttribute('class', 'Delet')//adicionando uma classe ao botão
}
function clearTask(){//função para limpar o input
    InputTarefa.value = ''//isso limpa
    InputTarefa.focus();
}
function SaveTask(){//funçao para salvar as tarefas
    const LiTask = tarefas.querySelectorAll('li')//selecionando todos os li dentro de ul
    const ListInTask = []//criando um array onde sera armazenado todos os li
    for(let task of LiTask ){//criando um for para colocar os li dentro do array
        let tasktext = task.innerText;
        tasktext = tasktext.replace('Apagar', '').trim()//apagando o nome "apagar que ficou dentro do array, ou seja, ficou tomar café Apagar. agora só tem tomar café"
        ListInTask.push(tasktext)//colocando as tarefas dentro do array ListInTask[]
    }
    const taskJason = JSON.stringify(ListInTask);
    localStorage.setItem('tarefas', taskJason);
}
function AddSavedTask(){//função para salvar as task na base de dados 
    const tarefas = localStorage.getItem('tarefas')
    const ListInTask = JSON.parse(tarefas)

    if (ListInTask){for(let tarefa of ListInTask){//todas as tarefas serão carregadas se o usuário fechar ou resetar a página
        AddLiEmUL(tarefa)}
    }
}
AddSavedTask()//chamando a função
InputTarefa.addEventListener('keypress', function(e){//adcionando o evento de clicar no enter e enviar o formulário "keypress"
    if(e.keyCode === 13){//codigo da tecla ENTER
        if (!InputTarefa.value) return;
        AddLiEmUL(InputTarefa.value)
    }
});
buttonAddTarefa.addEventListener('click', function(){
    if (!InputTarefa.value) return; //verificando se o usuário digitou algo
        AddLiEmUL(InputTarefa.value)//só envia se digitar
}
)
document.addEventListener('click',function(e){//criando um evento para saber em que lugar o usuário está clicando
    const el = e.target // "e" é resposável por saber onde está sendo clicado
    if (el.classList.contains('Delet')){//se o usuário clicar no delete que contém a class "Delet" ele vai ser removido
        el.parentElement.remove()//remove parente que tb remove ele
        SaveTask()

    }
})
