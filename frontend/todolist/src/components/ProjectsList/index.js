import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import axios from 'axios'

import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import Tasks from '../Tasks';
import apiInstance from '../../services/api'
import {Container, Projects, ProjectItem} from './styles'
import Swal from 'sweetalert2'

function ProjectsList() {
  const { register, handleSubmit, watch, errors } = useForm();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter()
  
  
  const [isUpdate, setIsUpdate] = useState(false);
  const [projects, setProjects] = useState([]);

  function getProject(){
    
    apiInstance.get('/projects', { headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${user.token}` 
    }})
      .then(function (response) {
        setProjects(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function onSubmit(data, e){
    
    apiInstance.post('/projects', { name: data.name }, {headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${user.token}` 
    }})
      .then(function (response) {
        getProject();
        e.target.reset();
      })
      .catch(function (error) {
        console.log(error);
        e.target.reset();
      });
  };

  function onUpdate(data){
    Swal.fire({
      title: `Edit project name ${data.name}`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        console.log('a', data.project_id);
        apiInstance.put(`/projects/${data.project_id}`, { name }, {headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${user.token}` 
        }})
          .then(function (response) {
            getProject();
            setIsUpdate(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Changed project name',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
    
  };

  function onDelete(project_id){
    apiInstance.delete(`/projects/${project_id}`, {headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${user.token}` 
    }})
      .then(function (response) {
        getProject();
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  useEffect(() => {
    if(user.token === 'null'){
      router.push('/');
    }
    getProject();
  },[])
  return (
    <> 
     <Container>
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <input name="name"  type="text" placeholder="Project Name" ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
        
        <input type="submit" value="New Project"/>
    
      </form>
      </div>

      <Projects>
          {projects.map((project) => {
            return (
              <>
              <ProjectItem>
                <div id={project.id}>
                  {!isUpdate ? (<p>{project.name}</p>) : (
                     <div>
                     <form onSubmit={handleSubmit(onUpdate)} id={project.id}>
                       <input name="project_id" type="number" readOnly={true} value={project.id} hidden/>
                       <input name="name"  type="text" placeholder="Project Name" ref={register({ required: true })} />
                       {errors.email && <span>This field is required</span>}
                       
                       <input type="submit" value="New Project"/>
                   
                     </form>
                     </div>
                  ) }  
                  <Tasks project_id={project.id}></Tasks>
                  <button onClick={() => onDelete(project.id)}>Delete</button>
                  <button onClick={() => onUpdate({project_id: project.id, name: project.name })}>Update</button>

                </div>
              </ProjectItem>
              </>
            )
          })}
      </Projects>
     </Container>
      
    </>
  );
}

export default ProjectsList;