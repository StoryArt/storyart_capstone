import React from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookShareCount,
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
        <FacebookShareCount url={shareUrl} >facebook share</FacebookShareCount>
    );
};


export default SocialShare;
