import React from 'react';
import SideBar from '../SideBar/SideBar'
import TimeLine from '../Timeline/TimeLine'
import ChatBar from '../ChatBar/ChatBar'
const MainContent = ({theme}) => {
    return (
        <div class="container-fluid">
           <div class="row justify-content-evenly">
                <SideBar theme={theme} />
                <TimeLine theme={theme} />
                <ChatBar theme={theme} />
           </div>
        </div>
    );
};

export default MainContent;
