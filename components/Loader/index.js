import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { Stack } from 'react-bootstrap';

const Loader = () => {
  return (
    <Stack gap={2} className="col-md-5 mx-auto d-flex align-items-center justify-content-center text-center min-vh-50">
        <Spinner animation="border" role="status">
        </Spinner> 
        <span className="">Loading...</span>
    </Stack>
  )
}

export default Loader