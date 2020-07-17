const viewPath = ('blogs');
const Blog = require('../models/blog');
const User = require('../models/user');
const user = require('../models/user');

exports.index = async (req, res) => {
    try{
        const blogs = await Blog.find().populate('user').sort({updatedAt: 'desc'});
        res.render(`${viewPath}/library`, {
            pageTitle: 'Library',
            blogs: blogs
        });
    }catch(err){
        req.flash('danger', 'We were unable to display the archive for some reason.');
        console.error(err);
        res.redirect('/');
    }
}
exports.show = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        .populate('user');
        res.render(`${viewPath}/show`, {
        pageTitle: blog.title,
        blog: blog
    });
    }catch(err){
        req.flash('danger', 'We were unable to display the blog for some reason.');
        console.error(err);
        res.redirect('/');
    }
}
exports.new = (req,res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Blog'
    });
}
exports.create = async (req, res) => {
    try {
    const { user: email } = await req.session.passport;
    const user = await User.findOne({email: email});
    const blog = await Blog.create({user: user._id, ...req.body});
    req.flash('success', 'You have a created a blog!')
    res.redirect(`/blogs/${blog.id}`);
  } catch (err) {
    req.flash('danger', `we ran into an issue, heres what it was: ${err}`)
    req.session.formData = req.body;
    res.redirect('blogs/new');
  }
}
exports.edit = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render(`${viewPath}/edit`, {
        pageTitle: blog.title,
        formData: blog
    });
    }catch(err){
        req.flash('danger', 'We were unable to edit this blog for some reason, sorry!.');
        console.error(err);
        res.redirect('/');
    }
    //res.send(`edit a blog!`);
}
exports.update = async (req, res) => {
    try{
        let blog = await Blog.findById(req.body.id);
        if(!blog) throw new Error("Blog couldn't be found");
        
        const attributes = {user: user._id, ...req.body};
        await Blog.validate(req.body);
        await Blog.findByIdAndUpdate(req.body.id, req.body);
        
        res.flash('success', 'The blog was updated!');
        res.redirect(`/blogs/${req.body.id}`);
    }catch(error){
        req.flash('danger', 'We were unable to update this blog for some reason, sorry!.');
        console.error(error);
        res.redirect(`/blogs/${req.body.id}/edit`);
    }
}
exports.delete = async (req, res) => {
    try{
        await Blog.deleteOne({_id: req.body.id});
        req.flash('success', `${req.body.title} was deleted`);
        res.redirect(`/blogs`);
    }catch(error){
        req.flash('danger', 'We were unable to delete this blog for some reason, sorry!.');
        console.error(error);
        res.redirect(`/blogs/${req.body.id}/edit`);
    }
}