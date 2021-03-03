import React, { useState, useEffect } from 'react';

export default function Dropdown({ namesList, label, setterFunction }) {
  const [selectedItem, setSelectedItem] = useState();
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const handleMenu = () => showDropDown && setShowDropDown(false);
    window.addEventListener("click", handleMenu);
    return () => {
      window.removeEventListener("click", handleMenu);
    };
  }, [showDropDown]);

  function handleMenuClick () {

    if(namesList.length > 0) {
      setShowDropDown(true)
    }
  }

  function handleItemClick(e, name) {
    setShowDropDown(false);
    setSelectedItem(name);
    setterFunction(name);
  }
  const dropDownStyles = {
    textOverflow: "ellipsis",
    width: "250px",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }
  return (
    <div className="dropdown show">
      <div 
        onClick={handleMenuClick} 
        className="btn btn-outline-primary dropdown-toggle" 
        role="button" 
        aria-haspopup="true" 
        aria-expanded="false"
        style={dropDownStyles}
      >
        {selectedItem || label}
      </div>

      {showDropDown && <div className="dropdown-menu" style={{display: 'block', cursor: 'pointer'}} id="schools-menu">
        {namesList.map((name, idx) => <div key={idx} onClick={e => handleItemClick(e,name)} className="dropdown-item">{name}</div>)}
      </div>}
    </div>
  )
}
