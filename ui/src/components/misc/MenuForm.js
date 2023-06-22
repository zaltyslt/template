import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

export function MenuForm({ menuDescription, handleInputChange, handleMenuChanges, handleCreateMenu }) {
  const createBtnDisabled = menuDescription.trim() === '';
  return (
    <Form onSubmit={handleCreateMenu}>
      <Form.Group>
        <Form.Input
          name='menuDescription'
          placeholder='Enter new menu title'
          value={menuDescription}
          onChange={handleMenuChanges}
        />

        <Button icon labelPosition='right' disabled={createBtnDisabled}>
          Save<Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  );
}

