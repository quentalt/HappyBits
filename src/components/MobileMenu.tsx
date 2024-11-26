import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <>
            <button
                onClick={toggleMenu}
                className="relative z-50 p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <XMarkIcon className="w-6 h-6" />
                ) : (
                    <Bars3Icon className="w-6 h-6" />
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={toggleMenu}
                    />
                    <div className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-zinc-900 p-6 shadow-xl z-50">
                        <nav className="mt-8">
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="/news"
                                        className="block py-2 text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                        onClick={toggleMenu}
                                    >
                                        News
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/artists"
                                        className="block py-2 text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                        onClick={toggleMenu}
                                    >
                                        Artists
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/events"
                                        className="block py-2 text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                        onClick={toggleMenu}
                                    >
                                        Events
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </>
    );
}