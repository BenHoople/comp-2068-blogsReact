const viewPath = ('pages');

exports.home = (req, res) => {
    res.render(`${viewPath}/home`, {
        pageTitle: 'Good Bye'
    });
}

exports.about = (req, res) => {
    res.render(`${viewPath}/about`,{
        pageTitle: "I dont want to go"
    });
}

exports.contact = (req, res) => {
    res.render(`${viewPath}/contact`,{
        pageTitle: "Reach Me Here:"
    });
}