import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { connect } from "react-redux";
class User extends Component {

  render() {
    const { user } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
                  User Information:
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr key="username">
                      <td>{`Username :`}</td>
                      <td>
                        <strong>{user.username}</strong>
                      </td>
                    </tr>
                    <tr key="email">
                      <td>{`Email :`}</td>
                      <td>
                        <strong>{user.email}</strong>
                      </td>
                    </tr>
                    <tr key="registeredAt">
                      <td>{`Registered At :`}</td>
                      <td>
                        <strong>{user.createdAt}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user:state.auth.user,
});

export default connect(
  mapStateToProps)(User);