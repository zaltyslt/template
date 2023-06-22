import React from 'react';
import {Grid, Form, Button, Input, Table} from 'semantic-ui-react';
import {MenuForm} from "../misc/MenuForm";
import {PositionsList} from "../misc/PositionsList";


export function MenuTable({
                              menus, menuDescription, menuTextSearch, handleCreateMenu, handleDeleteMenu,
                              handleInputChange, handleMenuChanges, messageText, handleEditMenu, handleGetMenus,

                          }) {
    let menusList;
    if (menus.length === 0) {
        menusList = (
            <Table.Row key='no-menus'>
                <Table.Cell collapsing textAlign='center' colSpan='5'>No Menus</Table.Cell>
            </Table.Row>
        )
    } else {

        menusList = menus.map((menu, index) => {
            return (
                <Table.Row key={index}>
                    {/*<Table.Cell>{'Menu'}</Table.Cell>*/}
                    <Table.Cell>{menu.id}</Table.Cell>
                    <Table.Cell>{menu.title}</Table.Cell>
                    {/*<Table.Cell>{menu.createdAt}</Table.Cell>*/}
                    {/*<Table.Cell>{menu.code}</Table.Cell>*/}
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='green'
                            size='small'
                            icon='edit'
                            onClick={() => handleEditMenu(index)}
                            // onClick={() => handleDeleteOrder(order.id)}
                        />
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteMenu(menu.id)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })
    }
    let message = (
        <p style={{fontWeight: 'bold', visibility: messageText ? 'visible' : 'hidden'}}>
            {messageText}
        </p>
    );
    return (
        <>
            <Grid stackable divided>
                <Grid.Row columns='2'>

                    <Grid.Column>
                        <MenuForm
                            menuDescription={menuDescription}
                            handleMenuChanges={handleMenuChanges}
                            handleInputChange={handleInputChange}
                            handleCreateMenu={handleCreateMenu}
                            handleDeleteMenu={handleDeleteMenu}
                        />
                    </Grid.Column>
                    <Grid.Column width='5'>
                        <Form onSubmit={handleGetMenus}>
                            <Input
                                action={{icon: 'search'}}
                                name='menuTextSearch'
                                placeholder='Search by Title'
                                value={menuTextSearch}
                                // onChange={handleInputChange}
                                onChange={handleInputChange}
                            />
                        </Form>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={6}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Actions</Table.HeaderCell>
                        {/*<Table.HeaderCell width={4}>Created At</Table.HeaderCell>*/}
                        {/*<Table.HeaderCell width={1}/>*/}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {menusList}
                </Table.Body>
            </Table>
            {message}
        </>
    );
}

