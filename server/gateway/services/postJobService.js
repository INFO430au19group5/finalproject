const postJobDetail = (body) => {

};

module.exports.postJobDetail = async (req, res, next) => {
    try {
        res.json(await postJobDetail(req.body));
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}
