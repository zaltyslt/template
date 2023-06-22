import React, {useEffect, useState} from 'react';
import {Grid,} from 'semantic-ui-react';
import {MenuForm} from "../misc/MenuForm";
import {DishesTable} from "./DishTable";
import {PositionsList} from "../misc/PositionsList";

export function EditMenuTable({
                                  menuToEdit, handleUpdateMenu, messageText,
                                  dishes, dishTitle, dishDescription, handleDishInputs, handleCreateDish,
                                  buttons,
                              }) {
    const [menuId, setMenuId] = useState('');
    const [menuTitle, setMenuTitle] = useState('');
    const [menuPositions, setMenuPositions] = useState([]);
    const [dishesList, setDishesList] = useState([]);
    const [filteredDishesList, setFilteredDishesList] = useState([]);

    useEffect(() => {
        setMenuId(menuToEdit.id);
        setMenuPositions(menuToEdit.positions);
        setMenuTitle(menuToEdit.title);
        setDishesList(dishes);
        const filteredDishes = filterDishes();
        setFilteredDishesList(filteredDishes);

    }, []);
    const filterDishes = () => {
        return (dishes.filter(
            (dish) => !menuToEdit.positions.some(
                (position) => position.dish.id === dish.id
            )
        ));
    }
    const handleRemovePosition = (index) => {
        const tempDish = menuPositions[index].dish;
        const updatedPositions = [...menuPositions];
        menuPositions.splice(index, 1);
        setFilteredDishesList([...filteredDishesList, tempDish]);
    }
    const handleAddToMenu = (index) => {
        const newPosition = {id: null, dish: filteredDishesList[index], quantity: 1};
        const updPositions = [...menuPositions, newPosition];
        filteredDishesList.splice(index, 1);
        setMenuPositions(updPositions);
    }
    const handleMenuChanges = (e, {name, value}) => {
        if (name === 'menuDescription') {
            console.log('LOCAL description ' + value);
            setMenuTitle(value);

        } else if (name === 'remove') {
            console.log('remove from LOCAL menu ' + value);
            handleRemovePosition(value);
        } else if (name === 'add') {
            console.log('add to LOCAL menu ' + value);
            handleAddToMenu(value);
        } else if (typeof name === 'number' && (!isNaN(value))) {
            console.log('LOCAL Change dish ' + name + ' quantity ' + Number(value));
            const updatedPositions = [...menuPositions];
            const position = updatedPositions[name];
            const updatedPosition = {...position, quantity: Number(value)};
            updatedPositions[name] = updatedPosition;
            setMenuPositions(updatedPositions);
        }
    }
    const handleUpdateMenu1 = () => {
        handleUpdateMenu({id: menuId, title: menuTitle, positions: menuPositions,});
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
                            menuDescription={menuTitle}
                            handleMenuChanges={handleMenuChanges}
                            handleCreateMenu={handleUpdateMenu1}
                        />
                    </Grid.Column>

                </Grid.Row>
            </Grid>
            <PositionsList
                positions={menuPositions}
                handleMenuChanges={handleMenuChanges}
                options={{quantityInput: false, action: true}}
            />
            {message}
            <DishesTable
                // test={test}
                dishes={filteredDishesList}
                dishTitle={dishTitle}
                dishDescription={dishDescription}
                handleDishInputs={handleDishInputs}
                handleCreateDish={handleCreateDish}
                buttons={buttons}
                handleMenuChanges={handleMenuChanges}
            >

            </DishesTable>

        </>
    );
}

