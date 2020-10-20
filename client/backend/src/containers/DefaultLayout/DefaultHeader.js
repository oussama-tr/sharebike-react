import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  UncontrolledDropdown
} from "reactstrap";
import PropTypes from 'prop-types';

import {
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";

import {connect} from "react-redux";
import { logoutUser } from "../../actions/authActions";

import logo from '../../assets/img/brand/logo-esprit.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
class DefaultHeader extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  render() {
    const {user} = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{src: logo, width: 89, height: 25, alt: "CoreUI Logo"}}
          minimized={{src: sygnet, width: 30, height: 30, alt: "CoreUI Logo"}}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
        <UncontrolledDropdown>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={user.avatar} className="img-avatar" alt={user.email} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account Settings</strong>
              </DropdownItem>
              <DropdownItem onClick={this.handleProfil}>
               <Link to={`/users/${this.props.user.id}`} style={{textDecoration: 'none'}} > <i className="fa fa-user" /> 
                Profile
                </Link>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench" /> Settings
              </DropdownItem>
              <DropdownItem onClick={this.onLogoutClick}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
            </AppHeaderDropdown>
            </UncontrolledDropdown>

        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;


const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {logoutUser}
)(DefaultHeader);