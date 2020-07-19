import React, { useContext } from 'react';
import { AdbContext } from '../../providers/adbContext';

const ShellStream = (props) => {
    const { shell_stream } = useContext(AdbContext);
    const [shellStream] = shell_stream;

    return (
        <span>
            {/* TODO: convert all hooks into state!! */}
            {shellStream.map(i => (<p className="m-0">{i}</p>))}
        </span>
    );
}

export default ShellStream;