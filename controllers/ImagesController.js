const viewPath = 'images';
const Image = require('../models/image');

exports.index = async(req, res) => {
    const images = await Image.find();
    res.render(`${viewPath}`,{
        pageTitle: `images`,
        images
    });
};

exports.new = async (req, res) => {
    res.render(`${viewPath}/new`,{
        pageTitle: `new Image`
    });
};

exports.create = async (req, res) => {
    console.log(req.file.mimetype);
    const encoded = req.file.buffer.toString('base64');
    await Image.create({
        fileName: req.file.originalname,
        data: encoded,
        mimeType: req.file.mimetype
    });
    res.redirect(`/images`);
};