const {new: _new, index, show, create, edit, update, delete: _delete} = require('../controllers/BlogsController');

function authorized (req, res, next) {
    if(!req.isAuthenticated()){
        return res.status(401).json({message: "you have to login! before doing that!"})
    }
    next();
}

module.exports = router => {
    router.get('/blogs', index);
    router.get('/blogs/new', authorized, _new);
    router.post('/blogs', authorized, create);
    router.post('/blogs/update', authorized, update);
    router.post('/blogs/delete', authorized, _delete);
    router.get('/blogs/:id/edit', authorized, edit);
    router.get('/blogs/:id', show);
}
