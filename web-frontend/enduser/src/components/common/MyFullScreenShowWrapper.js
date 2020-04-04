import React from 'react';
import ValidationUtils from '../../utils/validation';

const MyFullScreenShowWrapper = (props) => {
    let { informations, children } = props;
    if(ValidationUtils.isEmpty(informations)){
        informations = [];
    }

    return (
        <div id="fullscreen" style={{ 
            position: 'relative', 
            minHeight: '100vh', 
            width: '100%' ,
            height: 'auto',
            paddingTop: '40px',
            backgroundColor: '#4E4464',
            color: '#fff'
            // background: 'url("https://cafebiz.cafebizcdn.vn/thumb_w/600/2018/7/5/photo1530752949506-153075294950728877230.gif") no-repeat fixed center',
            // backgroundSize: '100% 100%'
            
        }}>
            {/* <Tooltip title="Toàn màn hình">
                <IconButton 
                    style={{ position: 'absolute', top: 20, right: 20 }}
                    aria-label="delete" onClick={() => setFullScreen(!isFullScreen)}>
                    <FullscreenIcon />
                </IconButton>
            </Tooltip> */}

            {informations.map(information => (
                <div  
                    className="text-bold"
                    style={{ fontSize: '1.2em', position: 'absolute', top: 20, left: 20 }} 
                    key={information.id}>{ information.name }: { information.value }</div>
                ))}
    
            <div className="container-fluid text-center py-5" style={{ height: '100%' }} >
                <div className="col-lg-8 col-md-10 mx-auto">
                    { children }
                </div>
            </div>
        </div>
    
    );
};


export default MyFullScreenShowWrapper;
