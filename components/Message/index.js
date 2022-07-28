import React from 'react'
import { Alert } from 'react-bootstrap'
import { Stack } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <Stack gap={2} className="col-md-5 mx-auto d-flex align-items-center justify-content-center text-center min-vh-50">
      <Alert className='text-center' style={{'min-width': '500px'}} variant={variant}>
          {children}
      </Alert>
    </Stack>
  )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message