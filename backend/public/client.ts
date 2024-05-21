//client.ts

import {ITodo} from "../src/model/ITodo";

window.onload = () => {
    fetch('http://localhost:3000/todos')
        .then(response => {
            const data= response;
            console.log("Response:", data);
            return data.json();
        })
        .then(data => {
            const todos:ITodo[] = data as ITodo[];
            const todosDiv = document.querySelector("#todos");
            for (let i = 0; i < todos.length; i++) {

                todosDiv!.innerHTML += ` <p id=${i}>Todo: [${todos[i].category}] ${todos[i].name} - 
                                            ${todos[i].description}</p>`
            }
        })
}
