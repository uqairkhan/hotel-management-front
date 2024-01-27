// src/components/InputDropdown.jsx
import React, { useState } from 'react';

const InputDropdown = ({label="",marginBottom="mb-1",options=[],onChange,placeHolder="",required=false,padding="p-3"}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if(placeHolder==option)
    onChange("")
    else
    onChange(option)
    setIsOpen(false);
  };

  return (
    <>
 {label&&<label for="default-search" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
    <div className={`relative block ${marginBottom}`}>
      <input
      placeholder={placeHolder}
        type="text"
        readOnly
        value={selectedOption}
        required={required}
        onClick={() => setIsOpen(!isOpen)}
        className={`block w-full ${padding} text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300`}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
  </svg>

      </div>
      {isOpen && (
        <div className="z-10 origin-top-right w-full absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                role="menuitem"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default InputDropdown;
