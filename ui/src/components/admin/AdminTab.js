import React from 'react';
import {Tab} from 'semantic-ui-react';
import {UserTable} from './UserTable';
import {OrderTable} from './OrderTable';
import {EditOrderTable} from './EditOrderTable';
import {MenuTable} from "./MenuTable";
import {EditMenuTable} from "./EditMenuTable";
import {DishesTable} from "./DishTable";
import {BackButton} from "../misc/BackButton";

export function AdminTab(props) {
    const {handleInputChange} = props;
    const {isUsersLoading, users, usernameSearch, handleDeleteUser, handleSearchUser,} = props;
    const {
        isOrdersLoading,
        orders,
        orderDescription,
        orderTextSearch,
        handleCreateOrder,
        handleEditOrder,
        handleUpdateOrder,
        orderToEdit,
        handleDeleteOrder,
        handleSearchOrder,
        isOrderEdited,
    } = props;
    const {
        isMenusLoading,
        menus,
        menuDescription,
        menuTextSearch,
        messageText,
        handleEditMenu,
        isMenuEdited,
        menuToEdit,
        handleCreateMenu,
        handleDeleteMenu,
        handleMenuChanges,
        handleUpdateMenu,
        handleGetMenus,
    } = props;
    const {
        dishes,
        isDishesLoading,
        dishTitle,
        dishDescription,
        handleDishInputs,
        handleGetDishes,
        handleCreateDish,
    } = props;

    const panes = [
        {
            menuItem: {key: 'users', icon: 'users', content: 'Users'},
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <UserTable
                        users={users}
                        usernameSearch={usernameSearch}
                        handleInputChange={handleInputChange}
                        handleDeleteUser={handleDeleteUser}
                        handleSearchUser={handleSearchUser}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: {key: 'orders', icon: 'laptop', content: 'Orders'},

            render: () => (
                !isOrderEdited ? (
                    <Tab.Pane loading={isOrdersLoading}>
                        <OrderTable
                            orders={orders}
                            orderDescription={orderDescription}
                            orderTextSearch={orderTextSearch}
                            handleInputChange={handleInputChange}
                            handleCreateOrder={handleCreateOrder}
                            handleEditOrder={handleEditOrder}
                            orderToEdit={orderToEdit}
                            handleDeleteOrder={handleDeleteOrder}
                            handleSearchOrder={handleSearchOrder}
                            handleUpdateOrder={handleUpdateOrder}

                        />
                    </Tab.Pane>) : (
                    <Tab.Pane loading={isOrdersLoading}>
                        <EditOrderTable
                            isOrderEdited={isOrderEdited}
                            orderToEdit={orderToEdit}
                            handleEditOrder={handleEditOrder}
                            handleUpdateOrder={handleUpdateOrder}
                        />

                    </Tab.Pane>
                )
            )
        },
        {
            menuItem: {key: 'menus', icon: 'th list', content: 'Menus'},
            render: () => (
                !isMenuEdited ? (
                    <Tab.Pane loading={isMenusLoading}>
                        <MenuTable
                            menus={menus}
                            menuDescription={menuDescription}
                            menuTextSearch={menuTextSearch}
                            handleInputChange={handleInputChange}
                            handleMenuChanges={handleMenuChanges}
                            messageText={messageText}
                            handleCreateMenu={handleCreateMenu}
                            handleDeleteMenu={handleDeleteMenu}
                            handleEditMenu={handleEditMenu}
                            handleUpdateMenu={handleUpdateMenu}
                            handleGetMenus={handleGetMenus}
                        />

                    </Tab.Pane>
                ) : (
                    <Tab.Pane loading={isMenusLoading}>
                        <EditMenuTable
                            menus={menus}
                            menuDescription={menuDescription}
                            menuTextSearch={menuTextSearch}
                            handleInputChange={handleInputChange}
                            messageText={messageText}
                            // handleEditMenu={handleEditMenu}
                            menuToEdit={menuToEdit}
                            handleUpdateMenu={handleUpdateMenu}

                            handleMenuChanges={handleMenuChanges}
                            dishes={dishes}
                            isDishesLoading={isDishesLoading}
                            dishTitle={dishTitle}
                            dishDescription={dishDescription}
                            handleGetDishes={handleGetDishes}
                            // orderTextSearch={orderTextSearch}
                            handleDishInputs={handleDishInputs}
                            handleCreateDish={handleCreateDish}
                            buttons={{delete: false, up: true}}

                        />
                        <BackButton
                            handleGoBack={handleEditMenu}
                        />
                    </Tab.Pane>
                )
            )
        }
        ,
        {
            menuItem: {key: 'dish', icon: 'food', content: 'Dishes'},
            render: () => (
                <Tab.Pane
                    // loading={isOrdersLoading}
                >
                    <DishesTable
                        dishes={dishes}
                        isDishesLoading={isDishesLoading}
                        dishTitle={dishTitle}
                        dishDescription={dishDescription}
                        handleGetDishes={handleGetDishes}
                        // orderTextSearch={orderTextSearch}
                        handleDishInputs={handleDishInputs}
                        handleCreateDish={handleCreateDish}
                        buttons={{action: false, delete: false, up: false}}
                        // handleDeleteOrder={handleDeleteOrder}
                        // handleSearchOrder={handleSearchOrder}
                    />
                </Tab.Pane>
            )
        }
    ]

    return (
        <Tab menu={{attached: 'top'}} panes={panes}/>
    )
}

