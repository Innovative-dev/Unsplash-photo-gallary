import React from 'react';
import DateMap from '../helper/DateMap'

const Story = (props) => {
    const story = props.story;
    return (
        <div className="card shadow-sm py-2 px-3 mb-4">
            <h5 className="text-info">{story?.title}</h5>
            <div className="row m-0">
                <div className="col-lg-3 col-md-4 pl-0">
                    <div className="d-flex">
                        <h6 className="text-dark"><span className="text-muted">By: </span>{story?.by}</h6>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4">
                    <div className="d-flex">
                        <h6 className="text-dark"><span className="text-muted">Posted at </span>  {DateMap(story?.time)}</h6>
                    </div>
                </div>
            </div>
            <h6><span className="text-muted">Full URL:</span>
                <a className="text-primary ml-2" href={story?.url} target="_blank">{story?.url}</a>
            </h6>
        </div>
    )
};
export default Story;
