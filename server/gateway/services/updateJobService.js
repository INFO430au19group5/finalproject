const updateJobDetail = (id) => {

};

module.exports.updateJobDetail = async (req, res, next) => {
    try {
        res.json(await updateJobDetail(req.query.id));
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}