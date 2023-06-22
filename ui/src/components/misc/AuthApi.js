import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const authApi = {
  authenticate,
  signup,
  getUsers,
  deleteUser,
  getDishes,
  createDish,
  getOrders,
  deleteOrder,
  createOrder,
  updateOrder,
  getMenus,
  createMenu,
  deleteMenu,

  getUserMe
}

function numberOfUsers() {
  console.log('ateina');
  return instance.get('/public/numberOfUsers');

}
function authenticate(username, password) {
  return instance.post('/auth/authenticate', { username, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function signup(user) {
  return instance.post('/auth/signup', user, {
    headers: { 'Content-type': 'application/json' }
  })
}


function numberOfOrders() {
  return instance.get('/public/numberOfOrders')
}

function getUsers(user, username) {
  const url = username ? `/api/users/${username}` : '/api/users'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getOrders(user, text) {
  const url = text ? `/api/orders?text=${text}` : '/api/orders'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function getDishes(user, text) {
  const url = text ? `/api/dishes?text=${text}` : '/api/dishes'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}
function createDish(user, dish) {
  return instance.post('/api/dishes/create', dish, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  });
}

function createMenu(user, menu) {
  return instance.post('/api/menus/create', menu, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  });
}
function deleteMenu(user, menuId) {
  console.log(menuId);
  return instance.delete(`/api/menus/delete?id=${menuId}`, {
    headers: {
      // 'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  });
}
// function updateMenu(user, menu) {
//   console.log(menu);
//   return instance.post(`/api/menus`,menu, {
//     headers: {
//       'Content-type': 'application/json',
//       'Authorization': bearerAuth(user)
//     }
//   });
// }

function getMenus(user, text) {
  const url = text ? `/api/menus?text=${text}` : '/api/menus';
  return instance.get(url, user &&{headers: { 'Authorization': bearerAuth(user) } });

}

function deleteOrder(user, orderId) {
  return instance.delete(`/api/orders/${orderId}`, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

function createOrder(user, order) {
  // return instance.post('/api/orders', order, {
    return instance.post('/api/orders', order, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function updateOrder(user, order) {
    return instance.post('/api/orders/update', order, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  });

}

function getUserMe(user) {
  return instance.get('/api/users/me', {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  // If token is expired, redirect user to login
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}

