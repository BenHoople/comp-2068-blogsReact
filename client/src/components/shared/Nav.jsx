import React from 'react';
import { Link } from 'react-router-dom';
import {Fragment} from 'react';
function Nav ({user}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="#">Bloggins</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/about">about <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/contact">Contact <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" id="blogsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Blogs
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="blogsDropdown">
                            <Link to="/blogs" className="dropdown-item">Library</Link>
                            {user ? (
                                <Fragment>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/blogs/new" className="dropdown-item">New</Link>
                                </Fragment>
                                )
                                :null}
                            
                        </div>
                    </li>

                </ul>


                <ul className="navbar-nav">
                <li className="nav-item">
                    {user ? (
                        <i className=" fa fa-sign-out">
                        <Link to="/logout" className="nav-link">Logout</Link>
                    </i>
                    ) : (
                        <Fragment>
                            <i className=" fa fa-user-plus">
                                <Link to="/register" className="nav-link">Register</Link>
                            </i>
                            <i className=" fa fa-sign-in">
                                <Link to="/login" className="nav-link">Login</Link>
                            </i>
                        </Fragment>
                    )};    
                        

                </li>
            </ul> 
            </div>
    </nav>
    );
};



export default Nav;
/* -- sign in / sign out depending on current session
<ul class="navbar-nav">
    <li class="nav-item">
        <% if (authorized) { %>
        <i class=" fa fa-sign-out">
            <a href="/logout" class="nav-link">Logout</a>
        </i>
        <% } else { %>
        <i class=" fa fa-user-plus">
            <a href="/register" class="nav-link">Register</a>
        </i>
        <i class=" fa fa-sign-in">
            <a href="/login" class="nav-link">Login</a>
        </i>
        <% } %>
    </li>
</ul>   
*/

/* -- new blogs only available if you sign in
<li class="nav-item dropdown">
    <a href="#" class="nav-link dropdown-toggle" id="blogsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Blogs
    </a>
    <div class="dropdown-menu" aria-labelledby="blogsDropdown">
        <a href="/blogs" class="dropdown-item">Library</a>
        <div class="dropdown-divider"></div>
        <% if (authorized) { %>
            <a href="/blogs/new" class="dropdown-item">New</a>
        <% } %>
    </div>
</li>
*/