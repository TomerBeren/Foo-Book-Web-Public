import React from 'react';
import UserProfileDropdown from './UserProfileDropdown';

const IconCircle = ({ iconClass }) => {
  const isCaret = iconClass.includes('caret');
  const commonProps = isCaret ? {
    type: "button",
    id: "secondMenu",
    'data-bs-toggle': "dropdown",
    'aria-expanded': "false",
    'data-bs-auto-close': "outside",
  } : {};

  return (
    <div>
      <div
        className={`d-flex align-items-center justify-content-center p-1 mx-2 rounded-circle bg-body-secondary ${isCaret ? 'dropdown-toggle' : ''}`}
        style={{ width: "38px", height: "38px", objectFit: "cover" }}
        {...commonProps}
      >
        <i className={iconClass}></i>
      </div>
      <UserProfileDropdown isCaret={isCaret} />
    </div>
  );
};

export default IconCircle;
