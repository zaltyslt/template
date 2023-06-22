import React, {useContext, useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import {AuthContext} from '../context/AuthContext'
import {authApi} from '../misc/AuthApi'
import {AdminTab} from './AdminTab'
import {handleLogError} from '../misc/Helpers'


export function AdminPage() {
    // static contextType = AuthContext
    const Auth = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [orderDescription, setOrderDescription] = useState('');
    const [menuDescription, setMenuDescription] = useState('');
    const [orderTextSearch, setOrderTextSearch] = useState('');
    const [menuTextSearch, setMenuTextSearch] = useState('');
    const [usernameSearch, setUserNameSearch] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [isOrdersLoading, setIsOrdersLoading] = useState(false);
    const [isOrderEdited, setIsOrderEdited] = useState(false);
    const [orderToEdit, setOrderToEdit] = useState(undefined);


    const [isMenusLoading, setIsMenusLoading] = useState(false);
    const [isMenuEdited, setIsMenuEdited] = useState(false);
    const [menus, setMenus] = useState([]);

    const [messageText, setMessageText] = useState(undefined);
    const [menuToEdit, setMenuToEdit] = useState(undefined); //sets corresponding array cell

    const [dishes, setDishes] = useState([]);
    const [dishTitle, setDishTitle] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [dishQuantity, setDishQuantity] = useState('');
    const [isDishesLoading, setIsDishesLoading] = useState(false);


    useEffect(() => {
        const user = Auth.getUser();
        const isAdmin = user.data.rol[0] === 'ADMIN';
        setIsAdmin(isAdmin);

        handleGetUsers();
        handleGetOrders();
        handleGetMenus();
        handleGetDishes();
    }, [Auth]);


    const handleInputChange = (e
                               , {name, value}
    ) => {
        console.log(name + ' ' + value);
        if (name === 'usernameSearch') {
            setUserNameSearch(value);
        } else if (name === 'orderTextSearch') {
            setOrderTextSearch(value);
        } else if (name === 'menuTextSearch') {
           setMenuTextSearch(value);
        }else if (name === 'orderDescription') {
            setOrderDescription(value);
        } else if (name === 'menuDescription') {
            setMenuDescription(value);
        }else if (name === 'orderTextAria') {
            setMenuDescription(value);
        }
    }
    const handleDishInputs = (e, {name, value}) => {
        console.log(name + ' ' + value);
        if (name === 'dishTitle') {
            setDishTitle(value);
        } else if (name === 'dishDescription') {
            setDishDescription(value);
        } else if (name === 'dishQuantity ') {
            setDishQuantity(value);
        }
    }

    const handleGetUsers = () => {

        const user = Auth.getUser();

        setIsUsersLoading(true);
        authApi.getUsers(user)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                handleLogError(error);
            })
            .finally(() => {
                setIsUsersLoading(false);
            })
    }

    const handleGetDishes = () => {

        const user = Auth.getUser();

        setIsDishesLoading(true);
        authApi.getDishes(user)
            .then(response => {
                setDishes(response.data);
            })
            .catch(error => {
                handleLogError(error);
            })
            .finally(() => {
                setIsDishesLoading(false);
            })
    }
    const handleCreateDish = () => {
        const user = Auth.getUser();

        // let { orderDescription } = this.state
        let dishTitleLocal = dishTitle.trim()
        if (!dishTitleLocal) {
            return;
        }

        const dish = {id: null, title: dishTitle, description: dishDescription,};

        authApi.createDish(user, dish)
            .then(() => {
                handleGetDishes();
                setDishTitle('');
                setDishDescription('');
            })
            .catch(error => {
                handleLogError(error);
            })
    }
    const handleDeleteUser = (username) => {
        // const Auth = this.context
        const user = Auth.getUser()

        authApi.deleteUser(user, username)
            .then(() => {
                handleGetUsers();
            })
            .catch(error => {
                handleLogError(error);
            })
    }

    const handleSearchUser = () => {
        const user = Auth.getUser();

        const username = usernameSearch;
        authApi.getUsers(user, username)
            .then(response => {
                const data = response.data;
                const users = data instanceof Array ? data : [data];
                setUsers(users);
            })
            .catch(error => {
                handleLogError(error)
                setUsers([]);
            })
    }

    const handleGetOrders = () => {

        const user = Auth.getUser()

        setIsOrdersLoading(true);
        authApi.getOrders(user)
            .then(response => {
                console.log(response.data);
                setOrders(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                setIsOrdersLoading(false);
            })
    }
//oorder
    const handleEditOrder = (order) => {
        console.log(order);
       if(order === undefined && isOrderEdited){
          console.log('bac');
           setOrderToEdit(undefined);
       }

        if (!isOrderEdited) {
            setOrderToEdit(order);
        } else {
            setOrderToEdit(undefined);
        }
        setIsOrderEdited(!isOrderEdited);
    }
    const handleUpdateOrder = (order) => {
        console.log(order);
        const user = Auth.getUser()
        setIsOrdersLoading(true);
        authApi.updateOrder(user, order)
            .then(response => {
                console.log(response.data);

                // setOrders(response.data)
                handleGetOrders();
                setIsOrderEdited(false);
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                setIsOrdersLoading(false);
            })
    }
    const handleDeleteOrder = (isbn) => {

        const user = Auth.getUser()

        console.log(isbn);

        authApi.deleteOrder(user, isbn)
            .then(() => {
                handleGetOrders()
            })
            .catch(error => {
                handleLogError(error)
            })
    }

    const handleCreateOrder = () => {
        const user = Auth.getUser();
        console.log(user.data.name);
        // let { orderDescription } = this.state
        let orderDescriptionLocal = orderDescription.trim()
        if (!orderDescriptionLocal) {
            return;
        }
        // private String description;
        // private String userName;
        // private List<Position> positions;
        const order = {
            clientName: user.data.name,
            description: orderDescription,
            validated: undefined,
            orderPositions: [],
        };

        authApi.createOrder(user, order)
            .then(() => {
                handleGetOrders();
                setOrderDescription('');
            })
            .catch(error => {
                handleLogError(error);
            })
    }

    const handleSearchOrder = () => {

        const user = Auth.getUser();

        const text = orderTextSearch;
        authApi.getOrders(user, text)
            .then(response => {
                const orders = response.data;
                setOrders(orders);
            })
            .catch(error => {
                handleLogError(error);
                setOrders([]);
            })
    }
// mmenu
    const handleGetMenus = () => {
        const user = Auth.getUser();
console.log('search menu ' + menuTextSearch);
        setIsMenusLoading(true);
        const text = menuTextSearch;
        authApi.getMenus(user,text)
            .then(response => {
                setMenus(response.data);
               console.log(response.data);
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                setIsMenusLoading(false);
            })
    }
    const handleCreateMenu = () => {
        console.log('menuDescription');

        const user = Auth.getUser();
        setIsMenusLoading(true);
        const menu = {id: null, title: menuDescription, positions: [],}
        authApi.createMenu(user, menu)
            .then(response => {
                setMenus(response.data);
                // console.log(response.data);
                setMenuDescription('');
            })
            .catch(error => {
                handleLogError(error);
            })
            .finally(() => {
                setIsMenusLoading(false);
            })
    }
    const handleDeleteMenu = (menuId) => {
        console.log(menuId);
        const user = Auth.getUser();
        setIsMenusLoading(true);

        authApi.deleteMenu(user, menuId)
            .then(response => {
                console.log('delete OK');
                setMenus(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                handleLogError(error)
            })
            .finally(() => {
                console.log('delete finally');
                setIsMenusLoading(false);
            })
    }
    const handleEditMenu = (menuId) => {
        console.log(menuId);
        // console.log(menus[menuId]);
        // console.log(isMenuEdited);

        if (!isMenuEdited) {
            setMenuDescription(menus[menuId].title);
            setMenuToEdit(menus[menuId]);
        } else {
            setMenuDescription('');
            setMenuToEdit(undefined);
        }
        setIsMenuEdited(!isMenuEdited);
    }

    const handleUpdateMenu = (menu) => {
        console.log(menu);
        const user = Auth.getUser();
        setIsMenusLoading(true);

        authApi.createMenu(user, menu)
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                setIsMenuEdited(false)
                setIsMenusLoading(false);
            })

    }
    const handleMenuChanges = (e, {name, value}) => {

        console.log(name + ' ' + value);
        // console.log(typeof name);
        // console.log(!isNaN(value));

        if (name === 'menuDescription') {
            setMenuDescription(value);

        } else if (name === 'remove') {
            // console.log('remove from menu '  + value);
        } else if (name === 'add') {
            // console.log('add to menu '  + value);
        } else if (typeof name === 'number' && (!isNaN(value))) {
            console.log('Change dish ' + name + ' quantity ' + Number(value));
            const positionsAll = menuToEdit.positions;
            const positionOld = menuToEdit.positions[name];
            positionsAll[name] = {...positionOld, quantity: Number(value)};

            setMenuToEdit({
                id: menuToEdit.id,
                title: menuToEdit.title,
                positions: positionsAll,
            });
        }
    }




    if (!isAdmin) {
        return <Navigate to='/'/>
    } else {

        return (
            <Container>
                <AdminTab
                    isUsersLoading={isUsersLoading}
                    users={users}
                    usernameSearch={usernameSearch}
                    handleDeleteUser={handleDeleteUser}
                    handleSearchUser={handleSearchUser}

                    isOrdersLoading={isOrdersLoading}
                    orders={orders}
                    orderDescription={orderDescription}
                    orderTextSearch={orderTextSearch}
                    handleCreateOrder={handleCreateOrder}
                    handleEditOrder={handleEditOrder}
                    orderToEdit={orderToEdit}
                    handleUpdateOrder={handleUpdateOrder}
                    handleDeleteOrder={handleDeleteOrder}
                    handleSearchOrder={handleSearchOrder}
                    handleInputChange={handleInputChange}
                    isOrderEdited={isOrderEdited}

                    isMenusLoading={isMenusLoading}
                    isMenuEdited={isMenuEdited}
                    menus={menus}
                    menuDescription={menuDescription}
                    menuTextSearch={menuTextSearch}
                    messageText={messageText}
                    handleEditMenu={handleEditMenu}
                    handleCreateMenu={handleCreateMenu}
                    handleDeleteMenu={handleDeleteMenu}
                    handleUpdateMenu={handleUpdateMenu}
                    handleMenuChanges={handleMenuChanges}
                    menuToEdit={menuToEdit}
                    handleGetMenus={handleGetMenus}

                    dishes={dishes}
                    isDishesLoading={isDishesLoading}
                    dishTitle={dishTitle}
                    dishDescription={dishDescription}
                    handleGetDishes={handleGetDishes}
                    handleDishInputs={handleDishInputs}
                    handleCreateDish={handleCreateDish}

                />
            </Container>
        );
    }

}

