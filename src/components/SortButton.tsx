import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface SortButtonProps {
  label: string;
  currentSort: string;
  sortKey: string;
  onSort: (key: string) => void;
}

export function SortButton({ label, currentSort, sortKey, onSort }: SortButtonProps) {
  const isActive = currentSort.replace(/^-/, '') === sortKey;
  const isAscending = currentSort === sortKey;

  return (
    <button
      onClick={() => onSort(sortKey)}
      data-sort-key={sortKey}
      data-current-sort={isActive ? (isAscending ? sortKey : `-${sortKey}`) : ''}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-purple-600 text-white'
          : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
      }`}
    >
      {label}
      {isActive && (
        isAscending ? (
          <ArrowUpIcon className="w-4 h-4" />
        ) : (
          <ArrowDownIcon className="w-4 h-4" />
        )
      )}
    </button>
  );
}