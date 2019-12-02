const getJobDetailsById = (id) => {

};

const getJobDetailsByName = (name) => {

};

const getJobDetail = () => {

}

module.exports.getJobDetails = async (req, res, next) => {
    try {
        res.json(await getJobDetailsById());
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}


module.exports.getJobDetailsById = async (req, res, next) => {
    try {
        res.json(await getJobDetailsById(req.query.id));
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

module.exports.getJobDetailsByName = async (req, res, next) => {
    try {
        res.json(await getJobDetailsById(req.query.name));
    } catch (error) {
        res.status(500).json(error)
    }
}