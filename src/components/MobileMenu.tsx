import React, { useState, useEffect } from 'react';

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsAnimating(true);
    };

    return (
        <>
            <button
                onClick={toggleMenu}
                className="relative z-50 p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-300"
                aria-label="Toggle menu"
            >
                <div className="relative w-6 h-6">
          <span
              className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                  isOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'
              }`}
          />
                    <span
                        className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                            isOpen ? 'opacity-0' : 'translate-y-2.5'
                        }`}
                    />
                    <span
                        className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                            isOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
                        }`}
                    />
                </div>
            </button>

            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleMenu}
            />

            <div
                className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-zinc-900 p-6 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                onTransitionEnd={() => setIsAnimating(false)}
            >
                <nav className="mt-8">
                    <ul className="space-y-4">
                        {[
                            { href: '/news', label: 'News' },
                            { href: '/events', label: 'Events' },
                        ].map((item, index) => (
                            <li
                                key={item.href}
                                style={{
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen ? 'translateX(0)' : 'translateX(1rem)',
                                    transition: `all 0.3s ease-in-out ${index * 0.1}s`,
                                }}
                            >
                                <a
                                    href={item.href}
                                    className="block py-2 text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}