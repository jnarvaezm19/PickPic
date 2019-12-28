import React from 'react';
import './style.css';

function PickPicPages(props){
    return(
        <div className="App">
            <nav>
              <div className="nav-wrapper grey darken-3 center">
                <a href="#" className="brand-logo">PickPic</a>
              </div>
            </nav>
            <div className="principal">
                {props.children}
            </div>
        </div>
    );
}

export default PickPicPages;