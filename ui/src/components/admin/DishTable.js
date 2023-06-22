import React from 'react';
import {Grid, Form, Button, Input, Table} from 'semantic-ui-react';
import {DishCreateForm} from "../misc/DishCreateForm";
import {UpButton} from "../misc/UpButton";

export function DishesTable({
                                dishes,
                                dishTitle,
                                dishDescription,
                                handleDishInputs,
                                handleCreateDish,
                                buttons,
                                handleMenuChanges
                            }) {
    let dishesList;
    console.log(dishes);
    if (dishes.length === 0) {
        dishesList = (
            <Table.Row key='no-dish'>
                <Table.Cell collapsing textAlign='center' colSpan='5'>No dishes</Table.Cell>
            </Table.Row>
        )
    } else {
        dishesList = dishes.map((dish, index) => {
            return (
                <Table.Row key={dish.id}>
                    <Table.Cell>{dish.id}</Table.Cell>
                    <Table.Cell>{dish.title}</Table.Cell>
                    <Table.Cell>{dish.description}</Table.Cell>
                    {(buttons.delete || buttons.up) && (
                        <>
                            <Table.Cell collapsing>
                                {buttons.delete && <Button
                                    circular
                                    color='red'
                                    size='small'
                                    icon='trash'
                                    onClick={{}
                                        // () => handleDeleteDish(dish.id)
                                    }
                                />}
                                {buttons.up && <UpButton
                                    handleMenuChanges={handleMenuChanges}
                                    dishId={index}
                                />}
                            </Table.Cell>
                        </>
                    )}
                    {/*<Table.Cell>{dish.quantity}</Table.Cell>*/}
                </Table.Row>
            )
        })
    }

    return (
        <>

            <Grid stackable divided>
                <Grid.Row columns='3'>
                    <Grid.Column width='16'>
                        <DishCreateForm
                            dishTitle={dishTitle}
                            dishDescription={dishDescription}
                            handleDishInputs={handleDishInputs}
                            handleCreateDish={handleCreateDish}

                        >
                        </DishCreateForm>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        {(buttons.delete || buttons.up) && (
                            <>
                                {/*<Table.HeaderCell width={2} />*/}
                                <Table.HeaderCell width={4}>Action</Table.HeaderCell>
                            </>
                        )}

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dishesList}
                </Table.Body>
            </Table>
        </>
    );
}

