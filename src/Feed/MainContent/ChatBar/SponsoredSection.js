import React from 'react';
import SponsorItem from './SponsorItem';

const SponsoredSection = ({theme}) => {
  return (
    <>
      <h5 className="text-muted">Sponsored</h5>
      {/* Repeat SponsorItem for each sponsor */}
      <SponsorItem theme={theme} imageUrl="https://source.unsplash.com/random/1" siteName="Meow.com" />
      <SponsorItem theme={theme} imageUrl="https://source.unsplash.com/random/12" siteName="Meow.com" />
    </>
  );
};

export default SponsoredSection;
