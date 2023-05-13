const service = require("../server/services/service");

controller = async (req, res) => {
    console.log('hello rout controller');
    await console.log('req.params.query: ', req.params.query)
    const storeItemQuery = await service(req.params.query);
    (!storeItemQuery) ? res.sendStatus(404) : res.json({ storeItemQuery });
}

module.exports = controller;