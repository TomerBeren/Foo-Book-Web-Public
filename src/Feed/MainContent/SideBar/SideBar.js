import React from 'react';
import SideBarItem from './SideBarItem';
import LogoutButton from './LogoutButton';
import defaultPic from '../../../defaultpic.png'
import freindPic from '../../../Photos/friend.png'
import memoryPic from '../../../Photos/memories.png'
import savedPic from '../../../Photos/saved.png'
import groupPic from '../../../Photos/groups.png'
import facebookPic from '../../../Photos/facebook.png'
import SeeMoreButton from './SeeMoreButton';
import MemoryItem from './MemoryItem';

const Sidebar = ({theme}) => {
    const sidebarItems = [
        { icon: defaultPic, label: 'Tomer', link: '#' },
        { icon: freindPic, label: 'Friends', link: '#' },
        { icon: memoryPic, label: 'Memories', link: '#' },
        { icon: savedPic, label: 'Saved', link: '#' },
        { icon: groupPic, label: 'Groups', link: '#' },
        { icon: facebookPic, label: 'Video', link: '#' },
    ];

    return (
        <div className="col-12 col-lg-3">
            <div className={`d-none d-xxl-block h-100 fixed-top overflow-hidden scrollbar ${theme === 'dark' ? 'text-white bg-black' : ''}`} style={{ maxWidth: '360px', width: '100%', zIndex: 4 }}>
                <ul className="navbar-nav mt-4 ms-3 d-flex flex-column pb-5 mb-5" style={{ paddingTop: '50px' }}>
                    {sidebarItems.map((item, index) => (
                        <SideBarItem key={index} icon={item.icon} label={item.label} link={item.link} />
                    ))}
                    <SeeMoreButton />
                    <hr class="m-0" />
                    <div class="d-flex align-items-center justify-content-between mt-2 text-muted">
                        <h4 class="m-0 text-muted">Your Shortcuts</h4>
                        <p class="m-0 text-primary me-3">Edit</p>
                    </div>
                    <MemoryItem src="https://source.unsplash.com/random/13" label="Memories" />
                    <MemoryItem src="https://source.unsplash.com/random/14" label="Memories" />
                    <MemoryItem src="https://source.unsplash.com/random/15" label="Memories" />
                    <MemoryItem src="https://source.unsplash.com/random/16" label="Memories" />
                    <MemoryItem src="https://source.unsplash.com/random/17" label="Memories" />


                    <LogoutButton />

                </ul>

            </div>

        </div>
    );
};

export default Sidebar;
