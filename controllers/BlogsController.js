const viewPath = ('blogs');
const Blog = require('../models/blog');
const User = require('../models/user');
const user = require('../models/user');

exports.index = async (req, res) => {
    try {
      const blogs = await Blog
        .find()
        .populate('user')
        .sort({updatedAt: 'desc'});
  
      res.status(200).json(blogs);
    } catch (error) {
      res.status(400).json({message: 'There was an error fetching the blogs', error});
    }
  }

  exports.show = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id)
        .populate('user');
      
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({message: "There was an error fetching the blog"});
    }
  };
  
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
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({message: "there was an error creating the blog"});
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
        res.status(200).json({message: "Deleted"})
    }catch(error){
        req.flash('danger', 'We were unable to delete this blog for some reason, sorry!.');
        res.status(400).json({message: "We couldn't delete the blog for some reason"})        
    }
}