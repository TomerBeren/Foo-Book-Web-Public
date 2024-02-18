// Stories.js
import React from 'react';
import Story from './Story';
import defaultPic from '../../../defaultpic.png'

const storiesData = [
    { image: defaultPic, label: 'Create Story', isMain: true },
    { image: 'https://source.unsplash.com/random/18', label: 'Story 2' },
    { image: 'https://source.unsplash.com/random/19', label: 'Story 3' },
    { image: 'https://source.unsplash.com/random/20', label: 'Story 4' },
    { image: 'https://source.unsplash.com/random/21', label: 'Story 5' },
    { image: 'https://source.unsplash.com/random/22', label: 'Story 6' },
];

const Stories = ({ theme }) => {
    return (
        <div className="d-flex justify-content-between position-relative mt-5">
            {storiesData.map((story, index) => (
                <Story theme={theme} key={index} image={story.image} label={story.label} isMain={story.isMain} />
            ))}
            <div className="position-absolute top-50 start-100 translate-middle pointer d-none d-lg-block">
                <i className={`fas fa-arrow-right p-3 border rounded-circle ${theme === 'dark' ? 'text-white bg-dark' : 'text-muted bg-white'}`}></i>
            </div>
        </div>
    );
};

export default Stories;
