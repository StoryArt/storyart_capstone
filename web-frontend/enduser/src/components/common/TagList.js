import React from 'react';

const TagList = (props) => {
    const { tags } = props;

    const getBadgeClassname = (index) => {
        if(index % 3 == 0) return 'badge-primary';
        else if(index % 3 === 1) return 'badge-danger';
        return 'badge-warning';
    }

    return (
        <>
            {tags.map((tag, index) => (
                // <div 
                //     key={tag.id} 
                //     className={`badge badge-secondary  mr-2`}>{tag.title}</div>
                <span key={tag.id}>{tag.title}{index != (tags.length - 1) ? ', ' : ''} </span>
            ))}
        </>
    );
};

export default TagList;
