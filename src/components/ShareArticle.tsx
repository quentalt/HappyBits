import React from 'react';
import { ClipboardIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface ShareArticleProps {
    title: string;
}

export function ShareArticle({ title }: ShareArticleProps) {
    const [copied, setCopied] = React.useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    return (
        <div className="bg-zinc-900 p-8 rounded-lg">
            <h3 className="text-2xl text-white font-bold mb-4">Share this article</h3>
            <div className="flex gap-4">
                <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 bg-fuchsia-600 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                    {copied ? (
                        <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                        <ClipboardIcon className="w-5 h-5" />
                    )}
                    <p className="text-white">Copy Link</p>
                </button>
            </div>
        </div>
    );
}