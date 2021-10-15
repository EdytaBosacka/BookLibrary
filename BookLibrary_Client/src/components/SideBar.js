import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import{
	ProSidebar,
	Menu,
	MenuItem,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from "react-pro-sidebar";

import {BsBook, BsHouse, BsFillPersonLinesFill} from "react-icons/bs";
import {BiSearchAlt} from "react-icons/bi";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideBar.css";


const SideBar = () => {
	
	const location = useLocation();
	const { pathname } = location;
	const splitLocation = pathname.split("/");
	
    const [menuCollapse, setMenuCollapse] = useState(false)
   
   //function that changes menucollapse state from false to true and from true to false
	const menuIconClick = () => {

    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  
	
  
return (
    
      <div id="sidebar">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRight/>
              ) : (
                <FiArrowLeft/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle">
			  <MenuItem active={splitLocation[1] === "" ? true : false} icon={<BsHouse />}>
				<Link to="/" className="link"> Home </Link>
              </MenuItem>
              <MenuItem active={splitLocation[1] === "books" ? true : false} icon={<BsBook />}>
				<Link to="/books" className="link"> Books </Link>
			  </MenuItem>
              <MenuItem active={splitLocation[1] === "isbn" ? true : false} icon={<BiSearchAlt />}>
				<Link to="/isbn" className="link"> Search by ISBN </Link>
			  </MenuItem>
              <MenuItem active={splitLocation[1] === "authors" ? true : false} icon={<BsFillPersonLinesFill />}>
				<Link to="/authors" className="link"> Authors </Link>
			  </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    
  );
};

export default SideBar;