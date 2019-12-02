const deleteJobDetailsById = (id) {

}

module.exports.deleteJobDetailsById = async (req, res, next) => {
    try {
        res.json(await deleteJobDetailsById(req.query.id));
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}