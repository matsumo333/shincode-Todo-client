import React, { useState } from 'react'
import {TodoType} from "../types";
import { isNotFoundError } from 'next/dist/client/components/not-found';
import useSWR, { mutate } from 'swr';
import { useTodos } from '../hooks/useTodos';

type Todoprops={
  todo: TodoType;
};


const Todo = ({todo}:Todoprops) => {
  const[isEditing,setIsEditing]=useState<boolean>(false);
  const[editedTitle,setEditiedTitle]=useState<string>(todo.title);
  const{todos,isLoading,error,mutate}=useTodos();
  
  const handleEdit =async() =>{
    setIsEditing(!isEditing);
    if(isEditing){
      const response =await fetch(`http://localhost:8080/editTodo/${todo.id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ 
        title:editedTitle }),
           
        });
        if(response.ok){
          const editedTodo=await response.json();
          const updatedTodos=todos.map((todo:TodoType)=>
            todo.id ===editedTodo.id ? editedTodo:todo);
          mutate(updatedTodos);
             }
  }
};
  const handleDelete =async(id:number) =>{
   const response =await fetch(`http://localhost:8080/deleteTodo/${todo.id}`,
    {
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        });
        if(response.ok){
          const deletedTodo=await response.json();
          const updatedTodos=todos.filter((todo:Todotype)=>todo.id !==id);
          mutate(updatedTodos);
               }
    };
  
    const toggleTodoCompletion =async(id:number,isCompleted:boolean)=>{
      const response =await fetch(`http://localhost:8080/editTodo/${todo.id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ isCompleted: !isCompleted }),
        });
        if(response.ok){
          const editedTodo=await response.json();
          const updatedTodos=todos.map((todo:TodoType)=>
            todo.id ===editedTodo.id ? editedTodo:todo);
          mutate(updatedTodos);
             }
    }

  return (
    <div> <li className="py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="todo1"
          name="todo1"
          type="checkbox"
          // checked="{todo.isCompleted}"
          className="h-4 w-4 text-teal-600 focus:ring-teal-500
                border-gray-300 rounded"
                onChange={()=>{toggleTodoCompletion(todo.id,todo.isCompleted)}}
        />
        <label className="ml-3 block text-gray-900">
          {isEditing ? (
            <input type="text" className="border rounded py-1 py-2" 
            value={editedTitle}
            onChange={(e)=>setEditiedTitle(e.target.value)}
            />
          ):(
          <span className={`text-lg font-medium mr-2 ${todo.isCompleted ? "line-through" : ""}`}> {todo.title} </span>)}
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <button
        onClick={handleEdit}
          className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
        >
          {isEditing ? "Save" : "✒"}
        </button>
        <button
        onClick={() =>handleDelete(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
        >
          ✖
        </button>
      </div>
    </div>
  </li></div>
  )
}

export default Todo