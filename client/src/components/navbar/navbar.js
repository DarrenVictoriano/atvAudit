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
import './nav.css'

const NavBar = (props) => {
    // Retirive ContentAPI
    const { app_info, shell_stream, is_loading } = useContext(AdbContext);
    const [appInfoData, setAppInfoData] = app_info;
    const [shellStream, setShellStream] = shell_stream;
    const [isLoading, setIsLoading] = is_loading;

    // enable button if IP exists
    const [isDisable, setIsDisable] = useState(true);

    // Input Text state for IP Adress
    const [ipAddress, setIpAddress] = useState("");

    const handleShowDevices = async (e) => {
        // I should probally clear the setShellStream
        // we set this to true to activate spinner
        setIsLoading(true);

        let streamList = await axios.get("/api/audit/startadb");

        // set the state value with the new data
        setShellStream(streamList.data.list);

        // we set it back to false
        // when we get the data back
        if (streamList) {
            setIsLoading(false)
        };
    }

    const handleConnectDevice = async (e) => {
        // I should probally clear the setShellStream
        let IP = ipAddress;

        // we set this to true to activate spinner
        setIsLoading(true);

        let streamList = await axios.post("/api/audit/connect", { "ip": IP });

        // set the state value with the new data
        setShellStream(streamList.data.list);

        // we set it back to false
        // when we get the data back
        if (streamList) {
            setIsLoading(false)
        };
    }

    const handleStartAudit = async (e) => {
        let IP = ipAddress;

        // we set this to true to activate spinner
        setIsLoading(true);

        let appInfo = await axios.post("/api/audit/start", { "ip": IP });

        // set the state value with the new data
        setAppInfoData(appInfo.data);

        // we set it back to false
        // when we get the data back
        if (appInfo) {
            setIsLoading(false)
        };
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
                <NavbarBrand><img alt="atvAuto" className="audit-img" src="/audit.png"></img>atvAudit</NavbarBrand>

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