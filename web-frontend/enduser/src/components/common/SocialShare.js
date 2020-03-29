import React from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookShareCount,
    FacebookIcon,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    EmailIcon,
    
  } from "react-share";

const SocialShare = (props) => {
    const { shareUrl } = props;

    return (
        // <FacebookShareCount size={32} round={true} url={shareUrl} >facebook share</FacebookShareCount>
        <>
            <FacebookShareButton url={'https://shoppingfoods.netlify.com/'} quote={''}>
                <FacebookIcon round={true} size={30}/>
            </FacebookShareButton>
            <EmailShareButton url={'http://localhost:3001'}>
                <EmailIcon round={true} size={30}/>
            </EmailShareButton>
        </>
    );
};


export default SocialShare;
