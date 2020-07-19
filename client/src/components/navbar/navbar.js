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
    // Retirive ContentAPI
    const { app_info, shell_stream, is_loading } = useContext(AdbContext);
    const [appInfoData, setAppInfoData] = app_info;
    const [shellStream, setShellStream] = shell_stream;
    const [isLoading, setIsLoading] = is_loading;

    // this is for mobile view only
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // enable button if IP exists
    const [isDisable, setIsDisable] = useState(true);

    // Input Text state for IP Adress
    const [ipAddress, setIpAddress] = useState("");

    const handleShowDevices = async (e) => {
        // I should probally clear the setShellStream
        let streamList = await axios.get("/api/audit/startadb");
        setShellStream(streamList.data.list);
    }

    const handleConnectDevice = async (e) => {
        // I should probally clear the setShellStream
        let IP = ipAddress;

        let streamList = await axios.post("/api/audit/connect", { "ip": IP });
        setShellStream(streamList.data.list);
    }

    const handleStartAudit = async (e) => {
        let IP = ipAddress;
        setIsLoading(true);

        let appInfo = await axios.post("/api/audit/start", { "ip": IP });
        setAppInfoData(appInfo.data);
        console.log(appInfo.data.currentData["android"]);
        if (appInfo) { setIsLoading(false) };
    }

    const handleInputChange = (e) => {
        if (e.target.value) {
            setIsDisable(false);
        } else {
            setIsDisable(true)
        }
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
                                disabled={isDisable}
                                onClick={handleConnectDevice}>Connect</Button></InputGroupAddon>

                            <Input placeholder="IP Address or Device ID" size="50"
                                value={ipAddress} onChange={handleInputChange} />

                            <InputGroupAddon addonType="append"><Button color="danger"
                                disabled={isDisable}
                                onClick={handleStartAudit}>Start Audit</Button></InputGroupAddon>
                        </InputGroup>
                    </NavItem>
                </Nav>

            </Navbar>
        </div >
    );
}

export default NavBar;