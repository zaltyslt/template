import React from 'react'
import {Grid, Form, Button, Input, Table} from 'semantic-ui-react';

export function UpButton({handleMenuChanges, dishId}) {

    return (
        <Button
            circular
            color='orange'
            size='small'
            icon='hand point up'
            onClick={(event) => handleMenuChanges(event, {name: 'add', value: dishId})}
        />
    );
}

