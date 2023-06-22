import React from 'react'
import {Grid, Form, Button, Input, Table} from 'semantic-ui-react';
import {useNavigate} from 'react-router-dom';

export function BackButton({handleGoBack}) {
    const navigate = useNavigate();
    return (
        <Grid stackable divided>
            <Grid.Row columns='2'>
                <Grid.Column>
                    <Button
                        circular
                        color='blue'
                        size='small'
                        icon='arrow circle left icon'
                        onClick={handleGoBack}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

