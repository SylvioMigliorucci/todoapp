import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/UserContext';
import axios from 'axios'

import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import Tasks from '../Tasks';
import apiInstance from '../../services/api'
import * as S from './styles'
import Swal from 'sweetalert2'
import {FiTrash2, FiEdit} from 'react-icons/fi'
import ErrorBox from '../ErrorBox';


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
        console.log(error?.response?.data?.error);
        ErrorBox({msg: error?.response?.data?.error});
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
        console.log(error?.response?.data?.error);
        ErrorBox({msg: error?.response?.data?.error});
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
        
        apiInstance.put(`/projects/${data.project_id}`, { name }, {headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${user.token}` 
        }})
          .then(function (response) {
            getProject();
            setIsUpdate(false);
          })
          .catch(function (error) {
            console.log(error?.response?.data?.error);
            ErrorBox({msg: error?.response?.data?.error});
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
        console.log(error?.response?.data?.error);
        ErrorBox({msg: error?.response?.data?.error});
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
     <S.Container>
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <S.InputForm name="name"  type="text" placeholder="Project Name" ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
        
        <S.InputSubmit type="submit" value="New Project"/>
    
      </form>
      </div>

      <S.Projects>
          {projects.map((project) => {
            return (
              <>
              <S.ProjectItem>
                <div id={project.id}>
                  <S.ProjectTitle>{project.name}
                  <FiTrash2 onClick={() => onDelete(project.id)}>Delete</FiTrash2>
                  <FiEdit onClick={() => onUpdate({project_id: project.id, name: project.name })}>Update</FiEdit>
                  <S.ProjectTitleLine /></S.ProjectTitle>
                  <Tasks project_id={project.id}></Tasks>
                     
                </div>
              </S.ProjectItem>
              </>
            )
          })}
      </S.Projects>
     </S.Container>
      
    </>
  );
}

export default ProjectsList;