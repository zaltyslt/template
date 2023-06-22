import React, {useEffect, useState} from 'react';
import {Grid, Form, Button, Input, Table, Header, Segment} from 'semantic-ui-react';
export function PositionsList({positions, handleMenuChanges, options }) {

return (
        <Table compact striped selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}>Nr</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Title</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Description</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Quantity</Table.HeaderCell>
                    {options.action &&
                    <Table.HeaderCell width={4} textAlign={"center"}>Action</Table.HeaderCell>
                    }

                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    (positions === 0) ? (

                        <Table.Row key='no-dishes'>
                            <Table.Cell collapsing textAlign='center' colSpan='5'>No Dishes</Table.Cell>
                        </Table.Row>
                    ) : (
                        positions.map((position, index) => {
                            return (
                                <Table.Row key={index}>
                                    {/*<Table.Cell>{'Menu'}</Table.Cell>*/}
                                    <Table.Cell>{index+1}</Table.Cell>
                                    <Table.Cell>{position.dish.title}</Table.Cell>
                                    <Table.Cell>{position.dish.description}</Table.Cell>
                                    <Table.Cell>
                                        <Input style={{width: '60px'}}
                                            // action={{ icon: 'search' }}
                                               name={index}
                                            // placeholder='Search by Id or Description'
                                               value={position.quantity}
                                               onChange={handleMenuChanges}
                                               disabled={options.quantityInput || false}
                                        />
                                        {/*{position.quantity}*/}
                                    </Table.Cell>
                                    {options.action &&
                                        <Table.Cell collapsing textAlign={"center"}>
                                        <Button
                                            circular
                                            color='red'
                                            size='small'
                                            icon='trash'
                                            onClick={(event, data) => handleMenuChanges(event, {
                                                name: 'remove',
                                                value: index,
                                            })}
                                            // onClick={() => handleDeleteOrder(order.id)}
                                        />
                                    </Table.Cell>
                                    }
                                </Table.Row>
                            )
                        }))}
            </Table.Body>
        </Table>
    );
}


