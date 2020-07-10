
import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    InputGroup,
    InputGroupAddon,
    Button,
    Input
} from 'reactstrap';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand>atvAudit</NavbarBrand>

                <Button color="info">Show Connected Devices</Button>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><Button color="primary">Connect</Button></InputGroupAddon>
                            <Input placeholder="IP Address or Device ID" size="50" />
                            <InputGroupAddon addonType="append"><Button color="danger">Start Audit</Button></InputGroupAddon>
                        </InputGroup>
                    </NavItem>
                </Nav>

            </Navbar>
        </div>
    );
}

export default NavBar;