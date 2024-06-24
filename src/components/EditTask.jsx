import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';


const EditTask = ({task, index, taskList, setTaskList}) => {

  const [editModal, setEditModal] = useState(false); 
   
  useEffect(()=>{
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription)
  },[])

  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const handleInput = (e) =>{
    const {name, value} = e.target; //same as const name= e.traget.name etc 
    if( name === "projectName") setProjectName(value)
    if (name ==="taskDescription") setTaskDescription(value)
  }
  const handleUpdate = e  => {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task); //getting the index of curren task
    taskList.splice(taskIndex, 1, {
      projectName: projectName,
      taskDescription: taskDescription,
      timestamp: task.timestamp,
      duration: task.duration


    });// removing that curren task
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload()
    setEditModal(false)
    
   console.log(taskList) }


  return (
    <>
    <button className='bg-gray-400 text-white text-sm uppercase fon-semibold py-1.5 px-3 rounded-lg'
    onClick={()=>setEditModal(true)}>✎Edit</button>

    {editModal?  (
        <>
        <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 ">
        <div className='w-9/12 max-w-lg bg-white  rounded-lg shadow-md relative flex flex-col' >
             <div className=' flex flex-row justify-between p-5 border-b border-slate-200 rounded-t '>
          <h3 className='text-3xl font-semibold '>Edit Task</h3>
          <button className='px-1 text-gray-400 float-right text-3xl leading-none font-semibold block'
          onClick={()=> setEditModal(false)}
          >X</button>
             </div>
      <form className='px-6 pt-6 pb-4'>
        <div>
        <label className='track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block'htmlFor='project-name'>Project name</label>
       <input className='w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white' id='project-name'
        name="projectName"
        value={projectName}
        onChange={handleInput} type="text" placeholder='Project Name' required>
       </input>
       </div>
       <div>
       <label className='track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block'htmlFor='task-description' >Task Description</label>
       <textarea className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white "
       id="task-description"
       name="taskDescription"
       value={taskDescription}  
       onChange={handleInput} 
       rows="5" placeholder='Task Description'/>
       </div>
      </form>
      <div className='flex justify-end p-6 border-t border-slate-200 rounded-b'>
        <button className='bg-blue-600 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-90' onClick={handleUpdate}>
          Update Task
          </button>
      </div>
      </div>
        </div>
        </>
    ): null}
    </>
  )
}

export default EditTask