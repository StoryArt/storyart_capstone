import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layouts/main-layout/MainLayout';
import StoryCard from '../../../components/common/StoryCard';
import MySpinner from '../../../components/common/MySpinner';
import StoryService from '../../../services/story.service';
import {  Button } from '@material-ui/core';


const HomePage = () => {

    const [trendStories, setTrendStories] = useState([]);
    const [trendStoriesLoading, setTrendStoriesLoading] = useState(false);

    const [suggestedStoriesByRating, setsuggestedStoriesByRating] = useState([]);
    const [suggestedStoriesByRatingLoading, setsuggestedStoriesByRatingLoading] = useState(false);

    const [suggestedStoriesByHistory, setsuggestedStoriesByHistory] = useState([]);
    const [suggestedStoriesByHistoryLoading, setsuggestedStoriesByHistoryLoading] = useState(false);

    const [pageNoRating, setPageNoRating] = useState(1);
    const [pageNoHistory, setPageNoHistory] = useState(1);
    useEffect(() => {
        getTrendStories();
        getsuggestedStoriesByRating();
        getsuggestedStoriesByHistory();
    }, []);
    // useEffect(() => {
        
    // }, []);
//s no k nhay vao ham khi debug nhi :v 
// bo tay ><

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

    const getsuggestedStoriesByRating = async () => {
        setsuggestedStoriesByRatingLoading(true);
        try {
            
            var array = [...suggestedStoriesByRating]
            //check xem array hien tai co data chua, co' thi load next page
            if (array.length > 1) {
                
                setPageNoRating(pageNoRating + 1);
                const pageNumber = pageNoRating + 1;
                const res = await StoryService.getSuggestStoryByRating(pageNumber);
                console.log(res);
                res.data.content.forEach(element => {
                    setsuggestedStoriesByRating(story => [...story, element]);
                });
            }else{
                const res = await StoryService.getSuggestStoryByRating(1);
                console.log(res);
                setsuggestedStoriesByRating(res.data.content);
            }
            console.log(suggestedStoriesByRating);


        } catch (error) {
            console.log(error);
          
        }
        setsuggestedStoriesByRatingLoading(false);
        
    }

    const getsuggestedStoriesByHistory = async () => {
        setsuggestedStoriesByHistoryLoading(true);
        try {
            
            var array = [...suggestedStoriesByHistory]
            //check xem array hien tai co data chua, co' thi load next page
            if (array.length > 1) {
                
                setPageNoHistory(pageNoHistory + 1);
                const pageNumber = pageNoHistory + 1;
                const res = await StoryService.getSuggestStoryByHistory(pageNumber);
                console.log(res);
                res.data.content.forEach(element => {
                    setsuggestedStoriesByHistory(story => [...story, element]);
                });
            }else{
                const res = await StoryService.getSuggestStoryByHistory(1);
                console.log(res);
                setsuggestedStoriesByHistory(res.data.content);
            }
            console.log(suggestedStoriesByHistory);


        } catch (error) {
            console.log(error);
          
        }
        setsuggestedStoriesByHistoryLoading(false);
        
    }

    return (
        <MainLayout>
            <div className="container-fluid">
<<<<<<< HEAD
                <h4 className="text-bold">Gợi ý cho bạn theo Đánh giá</h4>
                <hr style={{ border: '1px solid #ccc' }} />
                {!suggestedStoriesByRatingLoading && (
                     <div className="row">
                        {suggestedStoriesByRating.map(story => (
                            <div className="col-sm-3 px-2">
                                <StoryCard story={story} />
                            </div>
                        ))}
                    </div>
                )}
                 <Button size="small" color="secondary" onClick={e => getsuggestedStoriesByRating()}>
          Thêm Truyện
          </Button>
                {suggestedStoriesByRatingLoading && <MySpinner/>}

                <h4 className="text-bold">Gợi ý cho bạn theo Lịch Sử</h4>
=======
                <h4 className="text-bold">Gợi ý cho bạn</h4>
>>>>>>> 8cda2314fa393dc565ba97d5a524415d82d33900
                <hr style={{ border: '1px solid #ccc' }} />
                {!suggestedStoriesByHistoryLoading && (
                     <div className="row">
                        {suggestedStoriesByHistory.map(story => (
                            <div className="col-sm-3 px-2">
                                <StoryCard story={story} />
                            </div>
                        ))}
                    </div>
                )}
                 <Button size="small" color="secondary" onClick={e => getsuggestedStoriesByHistory()}>
          Thêm Truyện
          </Button>
                {suggestedStoriesByHistoryLoading && <MySpinner/>}


<<<<<<< HEAD
                <h4 className="text-bold mt-5">Truyện đang thịnh hành</h4>
=======
                <h4 className="text-bold mt-5">Danh sách thịnh hành</h4>
>>>>>>> 8cda2314fa393dc565ba97d5a524415d82d33900
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
