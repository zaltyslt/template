import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

export function DishCreateForm({ dishTitle, dishDescription, dishQuantity, handleDishInputs, handleCreateDish }) {
  const createBtnDisabled = dishTitle.trim() === '' || dishDescription.trim() === '';
  return (
    <Form onSubmit={handleCreateDish}>
      <Form.Group>
        <Form.Input
          name='dishTitle'
          placeholder='Title'
          value={dishTitle}
          onChange={handleDishInputs}
        />
        <Form.Input
            name='dishDescription'
            placeholder='Description *'
            value={dishDescription}
            onChange={handleDishInputs}
        />
        {/*<Form.Input*/}
        {/*    name='dishQuantity'*/}
        {/*    placeholder='Quantity'*/}
        {/*    value={dishQuantity}*/}
        {/*    onChange={handleDishInputs}*/}
        {/*/>*/}
        <Button icon labelPosition='right' disabled={createBtnDisabled}>
          Create<Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  );
}

