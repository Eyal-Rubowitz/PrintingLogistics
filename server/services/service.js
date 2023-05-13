// This Layer of Service contains the buisness logic of the app
// which located between the Router Layer and the Data Access Layer.

const dataAccess = require('../data_Access_Layer/data-access');

service = async (query) => {
    console.log('hello service!!')
    console.log('service query: ', query);
    try {
        const itemsQuery = await dataAccess(query);
        return itemsQuery;
    } catch (err) {
        return null;
    }
}

module.exports = service;