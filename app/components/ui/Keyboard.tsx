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
  ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'return'],
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
            <span className="hidden sm:inline">Del</span>
          </>
        );
      case 'tab':
        return (
          <>
            <span className="sm:hidden">
              <ArrowLeftRight size={iconSize} />
            </span>
            <span className="hidden sm:inline">Tab</span>
          </>
        );
      case 'caps':
        return (
          <>
            <span className="sm:hidden">
              <ChevronsUpDown size={iconSize} />
            </span>
            <span className="hidden sm:inline">Caps</span>
          </>
        );
      case 'return':
        return (
          <>
            <span className="sm:hidden">
              <CornerDownLeft size={iconSize} />
            </span>
            <span className="hidden sm:inline">Ret</span>
          </>
        );
      case 'shift':
        return (
          <>
            <span className="sm:hidden">
              <ArrowUp size={iconSize} />
            </span>
            <span className="hidden sm:inline">Shift</span>
          </>
        );
      default:
        return key;
    }
  };

  return (
    <div
      className={twMerge(
        clsx('p-1 sm:p-2 flex items-center justify-center', className)
      )}
      style={style}
    >
      <div className="grid gap-0.5 p-1 sm:p-2 rounded-lg border-2 border-white">
        {keys.map((row, i) => (
          <div key={i} className="flex gap-0.5 justify-center">
            {row.map((key, j) => (
              <button
                key={`${i}-${j}`}
                className={`
                  bg-white text-black border border-gray-300 rounded
                  ${key === 'space' ? 'w-64' : 'w-8'}
                  ${['tab', 'caps', 'return', 'delete'].includes(key.toLowerCase()) ? 'w-12' : ''}
                  ${key === 'shift' ? 'w-16' : ''}
                  h-8
                  text-[8px] sm:text-[10px] md:text-xs 
                  flex items-center justify-center uppercase
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
