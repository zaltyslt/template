import React from 'react'
import {Form, Button, Icon, TextArea} from 'semantic-ui-react'

export function TitleInputForm({ order, showInfo, inputChange, handleCreateOrder }) {
  // const createBtnDisabled = menuDescription.trim() === '';
  return (
      <Form onSubmit={handleCreateOrder}>
        <Form.Group>

          <Form.Input
              name='clientName'
              placeholder='Client name'
              value={order.clientName}
              // value={clientName}
              onChange={inputChange}
          />

          <Button icon labelPosition='right' disabled={order.clientName.trim() === ''}>
            Place order<Icon name='add'/>
          </Button>
          {/*<Button*/}
          {/*    circular*/}
          {/*    color='blue'*/}
          {/*    size='small'*/}
          {/*    icon='eye'*/}
          {/*    onClick={showInfo}*/}
          {/*    // onClick={() => handleDeleteOrder(order.id)}*/}
          {/*/>*/}
        </Form.Group>

      </Form>
  );
}

