
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Nav, Image, Navbar, Dropdown, Container, Button  } from '@themesberg/react-bootstrap';

import { Link, useHistory } from 'react-router-dom';
import { Routes } from "../routes";
import cogoToast from 'cogo-toast';
import userImg from "../assets/img/team/avatar-1.png";

const TopNavbar = (props) => {
  const history = useHistory();
  // Parse the JSON string to get the user object
  const user = JSON.parse(localStorage.getItem('user'));

  // check user instance availble 
  if(!user) {
    cogoToast.error("User does't login!",{
      position: 'top-right',
      hideAfter: 3,
    });
    history.push("/")
  }
  // logout user 
  const logOut = () =>{
    localStorage.removeItem('user');
    cogoToast.success("Logout Successfully!",{
      position: 'top-right',
      hideAfter: 3,
    });
    history.push("/")
  }
  

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <div className="d-flex justify-content-between w-100">

            <Navbar.Brand  className="brand-gradient-text" >
              Task
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
             {/* menu list and item  */}
             <Nav className="me-auto align-items-center">
                <Nav.Link as={Link} to={user && user.role==='admin'? Routes.AdminDashboard.path : Routes.UserDashboard.path}>Dashboard</Nav.Link>
              </Nav>
              {/* search, user profile, notification  */}
              <Nav className="align-items-center right">
              <div className="d-flex align-items-center custome-search">
                {user && user.role==="user" &&(
                  <Button type="submit" as={Link} to={Routes.PostPost.path} className="m-1 proposal-submitBtn mt-1 ">Add Post</Button>
                )}
              </div>
                <Dropdown as={Nav.Item} className=" user-profile-nav">
                  <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                    <div className="media d-flex align-items-center">
                      <Image src={userImg} className="user-avatar md-avatar rounded-circle" />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2" style={{right: "20px !important"}}>
                    
                    <Dropdown.Item onClick={logOut}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>

            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>

  );
};

export default TopNavbar