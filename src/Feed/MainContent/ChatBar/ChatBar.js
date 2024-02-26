import React from 'react';
import SponsoredSection from './SponsoredSection';
import ContactsHeader from './ContactsHeader';
import ContactItem from './ContactItem';

const Chatbar = ({ theme }) => {
  
  function generateRandomName(index) {

    const names = ["Alice", "Bob", "Charlie", "Diana", "Evan", "Fiona", "George", "Hannah", "Yosi", "Liat"];
    return names[index];

  }

  return (
    <div className="col-12 col-lg-3">
      <div className={`d-none d-xxl-block h-100 fixed-top end-0 overflow-hidden scrollbar ${theme === 'dark' ? 'text-white bg-black' : ''}`}
        style={{ maxWidth: "360px", width: "100%", zIndex: 4, paddingTop: "50px", left: "initial" }}>
        <div className="p-3 mt-4">
          <SponsoredSection theme={theme} />
          <hr className="m-0" />
          <ContactsHeader />
          {[...Array(10)].map((_, index) => (
            <ContactItem key={index} imageUrl={`https://source.unsplash.com/random/${index + 1}`} name={generateRandomName(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbar;
