import React from 'react';
import './Sidebar.css'
import {NavLink} from "react-router-dom";

const renderCategories = (categories, fetchProducts) => {
    return categories.map(category => (
        <div key={category._id}>
            <NavLink className='btn btn-link pretty-link' onClick={() => fetchProducts(category._id)} to="/">{category.title}</NavLink>
        </div>
    ))
};

const Sidebar = ({categories, fetchProducts}) => {
    return (
        <div className='sidebar'>
            <div className="card">
                <article className="card-group-item">
                    <header className="card-header">
                        <h6 className="title">Categories</h6>
                    </header>
                    <div>
                        {categories && renderCategories(categories, fetchProducts)}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default Sidebar;