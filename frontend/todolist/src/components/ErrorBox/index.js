import React from 'react';
import Swal from 'sweetalert2'
// import { Container } from './styles';

function ErrorBox({msg}) {


  return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Something went wrong! ${msg}`,
      
    })
}

export default ErrorBox;