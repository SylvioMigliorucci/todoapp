import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import axios from 'axios'
import { baseURL } from '../../util';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
// import { Container } from './styles';

function Tasks({project_id}) {
  const { register, handleSubmit, watch, errors } = useForm();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter()

  const [tasks, setTasks] = useState([]);

  function getProject(){
    
    axios.get(`${baseURL}/projects/${project_id}/tasks`,{ headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${user.token}` 
    }})
      .then(function (response) {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function onSubmit(data){
    console.log('2',project_id);
    axios.post(`${baseURL}/projects/${project_id}/tasks`, { description: data.description }, {headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${user.token}` 
    }})
      .then(function (response) {
        console.log(response.data.token);
        // setUser(response.data);
        getProject();
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  useEffect(() => {
    
    if(!user){
      router.push('/');
    }
    getProject();
  },[])
  return (
    <>
    <div>
     <form onSubmit={handleSubmit(onSubmit)}>
      
      <input name="description"  type="text" placeholder="New task" ref={register({ required: true })} />
      {errors.email && <span>This field is required</span>}
      
      <input type="submit" value="New Task"/>
  
    </form>
    </div>
      <div>
        {tasks.map((task) => {
          return (
            <>
            <div id={task.id}>
              <p >{task.description}</p>
              <p> {task.completed}</p>
              <p> {task.finished_at}</p>
            </div>

            </>
          )
        })}
      </div>
      <div>

      </div>
    </>
  );
}

export default Tasks;