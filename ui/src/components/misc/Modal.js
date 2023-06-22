import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export function ModalSimple({ open, onClose }) {
    return (
        <Modal
            basic
            open={open}
            onClose={onClose}
            size='small'
        >
            <Header icon>
                <Icon name='calendar check outline' />
                Order created
            </Header>
            <Modal.Content>
                <p style={{ textAlign: 'center' }}>
                    Your order created successfully and soon will be processed.
                </p>
            </Modal.Content>
            <Modal.Actions>
                {/*<Button basic color='red' inverted onClick={onClose}>*/}
                {/*    <Icon name='remove' /> No*/}
                {/*</Button>*/}
                <Button color='green' inverted onClick={onClose}>
                    <Icon name='checkmark' /> OK
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
