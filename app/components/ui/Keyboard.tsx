import React from 'react';

const keys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'],
  ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  [
    'caps lock',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    ';',
    "'",
    'return',
  ],
  ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
  ['space'],
];

export default function Keyboard() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="grid gap-0.5 bg-white p-2 rounded-lg shadow-lg w-[720px]">
        {keys.map((row, i) => (
          <div key={i} className="flex gap-0.5 justify-center">
            {row.map((key, j) => (
              <button
                key={`${i}-${j}`}
                className={`
                  bg-white text-black border border-gray-300 rounded
                  ${key === 'space' ? 'w-full' : 'w-10'}
                  ${['tab', 'caps lock', 'return', 'delete'].includes(key.toLowerCase()) ? 'w-16' : ''}
                  ${key === 'shift' ? 'w-20' : ''}
                  h-10 text-xs flex items-center justify-center uppercase
                `}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
