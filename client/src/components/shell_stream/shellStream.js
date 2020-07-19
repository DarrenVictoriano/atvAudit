import React, { useContext } from 'react';
import { AdbContext } from '../../providers/adbContext';

const ShellStream = (props) => {
    const [adbData] = useContext(AdbContext);

    return (
        <span>
            {/* TODO: convert all hooks into state!! */}
        </span>
    );
}

export default ShellStream;