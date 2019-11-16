import axios from "axios";

const request = {
    getProduct: function(productId) {
        return axios.get(`/api/inventory/${productId}`);
    },
    getAllProducts: function() {
        return axios.get(`/api/products`);
    },
    getAllProductGroups: function() {
        return axios.get('/api/productgroups');
    },
    getInventory: function() {
        return axios.get('api/inventory');
    },
    getOrders: function() {
        return axios.get('api/orders');
    },
    getAllTransactionTypes: function() {
        return axios.get('/api/transactiontypes');
    },
    createProduct: function(productData) {
        return axios.post('/api/products', productData);
    },
    createOrder: function(orderData) {
        return axios.post('/api/transactions', orderData);
    },
    createGroup: function(groupName) {
        return axios.post('/api/productgroups', {
            group_name: groupName
        })
    },
    updateGroup: function(groupInfo) {
        return axios.put('/api/productgroups/' + groupInfo.group_id, {
            group_name: groupInfo.name
        });
    },
    login: function(email, password) {
        return axios.post('/api/users/login', {
            email: email,
            password: password
        });
    },
    registerUser: function(name, email, password) {
        return axios.post('/api/users', {
            name: name,
            email: email,
            password: password
        });
    }
}

export default request;