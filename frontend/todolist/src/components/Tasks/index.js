import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/UserContext';

import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import apiInstance from '../../services/api';

import * as S from './styles'
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2'
import { format } from 'date-fns'
import {FiTrash2, FiEdit} from 'react-icons/fi'

function Tasks({project_id}) {
  const { register, handleSubmit, watch, errors } = useForm();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter()

  const [tasks, setTasks] = useState([]);

  function getTasks(){
      apiInstance.get(`/projects/${project_id}/tasks`,{ headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${user.token}` 
      }})
        .then(function (response) {
          setTasks(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    
  };

  function onSubmit(data, e){  
    apiInstance.post(`/projects/${project_id}/tasks`, { description: data.description }, {headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${user.token}` 
    }})
      .then(function (response) {
        getTasks();
        e.target.reset();
      })
      .catch(function (error) {
        console.log(error);
        e.target.reset();
      });
  };

  function onUpdate(data){
    Swal.fire({
      title: `Edit task name ${data.description}`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
      preConfirm: (description) => {
        
        apiInstance.put(`/projects/${project_id}/tasks/${data.task_id}`, { description }, {headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${user.token}` 
        }})
          .then(function (response) {
            getTasks();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        getTasks()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Changed task name',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
    
  };

  function onDelete(task_id){
    apiInstance.delete(`/projects/${project_id}/tasks/${task_id}`, {headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${user.token}` 
    }})
      .then(function (response) {
        getTasks();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function completeTask({task_id, completed}){
    
    apiInstance.put(`/projects/${project_id}/tasks/${task_id}`, { completed: completed }, {headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${user.token}` 
    }})
      .then(function (response) {
        getTasks();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    
    if(user.token === "null"){
      router.push('/');
    }
    getTasks();
  },[])
  return (
    <>
    <div>
     <form onSubmit={handleSubmit(onSubmit)}>
      
      <S.InputForm name="description"  type="text" placeholder="New task" ref={register({ required: true })} />
      {errors.email && <span>This field is required</span>}
      
      <S.InputSubmit type="submit" value="New Task"/>
  
    </form>
    </div>
      <S.Tasks>
        {tasks.map((task) => {
          return (
            <>
            <S.TaskCheckItem id={task.id} >
              <ReactTooltip id="registerTip" place="top" effect="solid">
                {format(new Date(task.finished_at), 'dd/MM/yyyy HH:mm') || ''}
              </ReactTooltip>
              <S.TaskDescription>
                {task.completed ? (
                  <>
                    < label style={{textDecoration: "line-through"}} data-tip data-for="registerTip" onClick={(e) => completeTask({task_id: task.id, completed: !task.completed})}>{task.description} </label>
                  </>
                  ) 
                  : (<label style={{textDecoration: "none"}} data-tip data-for="registerTip" onClick={(e) => completeTask({task_id: task.id, completed: !task.completed})}>{task.description} </label>)}
                <FiTrash2 onClick={() => onDelete(task.id)} />
                {task.completed || <FiEdit onClick={() => onUpdate({task_id: task.id, description: task.description })}>Update</FiEdit>}
                 {!task.completed || <S.Tooltip>{format(new Date(task.finished_at), 'dd/MM/yyyy HH:mm:ss')}</S.Tooltip>}
              </S.TaskDescription>
            </S.TaskCheckItem>
            <S.TaskDescriptionLine></S.TaskDescriptionLine>

            </>
          )
        })}
      </S.Tasks>
    </>
  );
}

export default Tasks;