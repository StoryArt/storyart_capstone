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
  } from "react-share";

const SocialShare = (props) => {
    const { shareUrl } = props;

    return (
        // <FacebookShareCount size={32} round={true} url={shareUrl} >facebook share</FacebookShareCount>
        <FacebookShareCount/>
    );
};


export default SocialShare;
