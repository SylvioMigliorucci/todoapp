import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import axios from 'axios'
import { baseURL } from '../../util';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import Tasks from '../Tasks';
// import { Container } from './styles';

function ProjectsList() {
  const { register, handleSubmit, watch, errors } = useForm();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter()

  const [projects, setProjects] = useState([]);

  function getProject(){
    
    axios.get(baseURL + '/projects',{ headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${user.token}` 
    }})
      .then(function (response) {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function onSubmit(data){
    
    axios.post(baseURL + '/projects', { name: data.name }, {headers: {
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

  function onDelete(project_id){
    axios.delete(`${baseURL}/projects/${project_id}/tasks`, { name: data.name }, {headers: {
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
  }


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
      
      <input name="name"  type="text" placeholder="Project Name" ref={register({ required: true })} />
      {errors.email && <span>This field is required</span>}
      
      <input type="submit" value="New Project"/>
  
    </form>
    </div>
      <div>
        {projects.map((project) => {
          return (
            <>
              <div id={project.id}>
                <p >{project.name}</p>
                <Tasks project_id={project.id}></Tasks>

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

export default ProjectsList;