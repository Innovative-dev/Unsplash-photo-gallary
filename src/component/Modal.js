import React from 'react';

const modal = (props) => {
        const { show, close } = props;
    return (

        <div className="modal-wrapper"
            style={{
                transform: show ? 'translateY(0vh)' : 'translateY(-200vh)',
                disp: show ? '1' : '0'
            }}>

            <div className="modal-body" style={{opacity: show ? '1' : '0'}}>
            <button className="btn close" onClick={close}><img src='/img/close.svg'/></button>
            <div className="user-info">
            <img src='/img/big-hero.jpg' />
            <div>
            <h6>Benyy dyal</h6>
            <small>beny@gmail.com</small>
            </div>
        </div>
            <div className="img-wrapper">
            <img src='/img/big-hero.jpg' />
            </div>
            <div className="btn-wrapper">
                <button className="btn primary">Download</button>
            </div>
            </div>

        </div>

    )
}

export default modal;