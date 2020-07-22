
import React from 'react';
import DateMap from '../helper/DateMap'

const ImgCard = (props) => {
    const { thumb, userName, userImg, openModalHandler } = props;
    return (
        <div className="card-wrapper" onClick={openModalHandler}>
            <div className="card" style={{ backgroundImage: "url(" + thumb + ")", }}>
                <div className="mask">
                    <div className="user-info">
                        {userImg && <img src={userImg} />}
                        {userName && <h6>Imaged by <span className="primary-color">{userName}</span></h6>}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ImgCard;
