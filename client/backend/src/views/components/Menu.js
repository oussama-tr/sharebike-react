import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import routes from '../routes';

class Menu extends PureComponent {
    constructor(props) {
        super(props);

        this.routes = routes.filter(route => route.toMenu);
    }

    render() {
        const { linkComponent } = this.props;

        return this.routes.map(route => linkComponent(route));
    }
}

export default withRouter(Menu);