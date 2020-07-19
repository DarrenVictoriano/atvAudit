import React, { useState, useContext } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    InputGroup,
    InputGroupAddon,
    Button,
    Input
} from 'reactstrap';
import { AdbContext } from '../../providers/adbContext';
import axios from 'axios';

const NavBar = (props) => {
    // Context API, this serves as my global state
    const [adbData, setAdbData] = useContext(AdbContext);

    // this is for mobile view only
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // Input Text state for IP Adress
    const [ipAddress, setIpAddress] = useState("");

    const handleShowDevices = async (e) => {

        let data = await axios.get("/api/audit/startadb");
        setAdbData({ "data": data.data.split("\n") });
        console.log(data.data.split("\n"));
    }

    const handleConnectDevice = (e) => {
        let IP = ipAddress;

    }

    const handleStartAudit = (e) => {
        let IP = ipAddress;
    }

    const handleInputChange = (e) => {
        setIpAddress(e.target.value);
    }

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand>atvAudit</NavbarBrand>

                <Button color="info" onClick={handleShowDevices}>Show Connected Devices</Button>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><Button color="primary"
                                onClick={handleConnectDevice}>Connect</Button></InputGroupAddon>

                            <Input placeholder="IP Address or Device ID" size="50"
                                value={ipAddress} onChange={handleInputChange} />

                            <InputGroupAddon addonType="append"><Button color="danger"
                                onClick={handleStartAudit}>Start Audit</Button></InputGroupAddon>
                        </InputGroup>
                    </NavItem>
                </Nav>

            </Navbar>
        </div >
    );
}

export default NavBar;