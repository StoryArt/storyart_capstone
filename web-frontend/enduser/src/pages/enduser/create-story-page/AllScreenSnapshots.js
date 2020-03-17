import React from 'react';
import { Tooltip } from '@material-ui/core';

const AllScreenSnapshots = (props) => {
    const { screens, setCurrentScreen, currentScreen } = props;

    return (
        <div>
             {screens.map((screen, index) => (
                <Tooltip 
                    title={screen.title.length == 0 ? "Chua co tieu de" : screen.title} 
                    key={screen.id}>
                    <button 
                        style={{ width: '35px', height: '35px', padding: '0px', borderRadius: '5px' }}
                        onClick={() => setCurrentScreen(index)}
                        className={`btn ${currentScreen == index ? 'btn-success' : 'btn-secondary'}`} 
                        >{index + 1}</button>
                </Tooltip>
            ))}
        </div>
    );
};


export default AllScreenSnapshots;
