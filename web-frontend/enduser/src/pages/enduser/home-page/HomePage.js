import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layouts/main-layout/MainLayout';
import StoryCard from '../../../components/common/StoryCard';
import MySpinner from '../../../components/common/MySpinner';
import StoryService from '../../../services/story.service';


const HomePage = () => {

    const [trendStories, setTrendStories] = useState([]);
    const [trendStoriesLoading, setTrendStoriesLoading] = useState(false);
    const [suggestedStories, setSuggestedStories] = useState([]);
    const [suggestedStoriesLoading, setSuggestedStoriesLoading] = useState(false);

    useEffect(() => {
        getSuggestedStories();
        getTrendStories();
    }, []);

    const getTrendStories = async () => {
        setTrendStoriesLoading(true);
        try {
            const res = await StoryService.getTrendStories(12);
            console.log(res);
            setTrendStories(res.data);

        } catch (error) {
            console.log(error);
        }
        setTrendStoriesLoading(false);
    }

    const getSuggestedStories = async () => {

    }

    return (
        <MainLayout>
            <div className="container-fluid">
                <h4 className="text-bold">Gợi ý cho bạn</h4>
                <hr style={{ border: '1px solid #ccc' }} />
                {!suggestedStoriesLoading && (
                     <div className="row">
                        {suggestedStories.map(story => (
                            <div className="col-sm-3 px-2">
                                <StoryCard story={story} />
                            </div>
                        ))}
                    </div>
                )}
                {suggestedStoriesLoading && <MySpinner/>}


                <h4 className="text-bold mt-5">Danh sách thịnh hành</h4>
                <hr style={{ border: '1px solid #ccc' }} />
                {!trendStoriesLoading && (
                    <div className="row">
                        {trendStories.map(story => (
                            <div className="col-sm-3 px-2" key={story.id}>
                                <StoryCard story={story} />
                            </div>
                        ))}
                    </div>
                )}
                {trendStoriesLoading && <MySpinner/>}

           </div>
        </MainLayout>
    );
};


export default HomePage;
