import React from 'react';
import { Link } from 'react-router-dom';
import StringUtils from '../../utils/string';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardText } from 'mdbreact';

const StoryCard = (props) => {
    const { story } = props;

    return (
        <MDBCard className="mb-4">
            <MDBCardImage 
                className="img-fluid" 
                src={story.image} waves />
            <MDBCardBody>
                
                <MDBCardText className="mt-4">
                    { StringUtils.truncate(story.intro, 40) }
                </MDBCardText>
                <Link 
                    to={`/stories/read/${story.id}`} 
                    className="btn btn-warning float-right ml-1" href="#">Doc truyen</Link>
                <Link 
                    to={`/stories/details/${story.id}`} 
                    className="btn btn-primary float-right">Chi tiet</Link>
            </MDBCardBody>
        </MDBCard>
    );
};


export default StoryCard;
