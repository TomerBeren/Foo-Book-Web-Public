import React from 'react';

const ContactsHeader = () => {
  return (
    <div className="d-flex align-items-center justify-content-between my-3">
      <p className="text-muted fs-5 m-0">Contacts</p>
      <div className="text-muted">
        <i className="fas fa-video mx-2"></i>
        <i className="fas fa-search mx-2"></i>
        <i className="fas fa-ellipsis-h text-muted mx-2"></i>
      </div>
    </div>
  );
};

export default ContactsHeader;
