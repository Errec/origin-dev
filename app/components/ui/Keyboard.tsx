import clsx from 'clsx';
import {
  ArrowLeftRight,
  ArrowUp,
  ChevronsUpDown,
  CornerDownLeft,
  Delete,
} from 'lucide-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface KeyboardProps {
  className?: string;
  style?: React.CSSProperties;
}

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

const Keyboard: React.FC<KeyboardProps> = ({ className, style }) => {
  const renderKey = (key: string) => {
    const iconSize = 14;
    switch (key) {
      case 'delete':
        return (
          <>
            <span className="sm:hidden">
              <Delete size={iconSize} />
            </span>
            <span className="hidden sm:inline">delete</span>
          </>
        );
      case 'tab':
        return (
          <>
            <span className="sm:hidden">
              <ArrowLeftRight size={iconSize} />
            </span>
            <span className="hidden sm:inline">tab</span>
          </>
        );
      case 'caps lock':
        return (
          <>
            <span className="sm:hidden">
              <ChevronsUpDown size={iconSize} />
            </span>
            <span className="hidden sm:inline">caps lock</span>
          </>
        );
      case 'return':
        return (
          <>
            <span className="sm:hidden">
              <CornerDownLeft size={iconSize} />
            </span>
            <span className="hidden sm:inline">return</span>
          </>
        );
      case 'shift':
        return (
          <>
            <span className="sm:hidden">
              <ArrowUp size={iconSize} />
            </span>
            <span className="hidden sm:inline">shift</span>
          </>
        );
      default:
        return key;
    }
  };

  return (
    <div
      className={twMerge(
        clsx('p-4 flex items-center justify-center', className)
      )}
      style={style}
    >
      <div className="grid gap-0.5 p-2 rounded-lg border-2 border-white">
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
                {renderKey(key)}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
