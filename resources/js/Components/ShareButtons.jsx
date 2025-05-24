import { useState } from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
} from 'react-share';
import { LinkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function ShareButtons({ url, title, description, className = '' }) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy link');
            console.error('Copy failed:', err);
        }
    };

    const shareButtonProps = {
        url,
        title,
        className: 'transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full',
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <FacebookShareButton
                {...shareButtonProps}
                quote={description}
                hashtag="#ArchAlley"
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
                {...shareButtonProps}
                hashtags={['ArchAlley', 'Architecture']}
                via="ArchAlleyForum"
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton
                {...shareButtonProps}
                summary={description}
                source="ArchAlley Forum"
            >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <button
                onClick={handleCopyLink}
                className={`p-1.5 rounded-full transition-colors ${
                    copied
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Copy link"
            >
                {copied ? (
                    <CheckIcon className="h-5 w-5" />
                ) : (
                    <LinkIcon className="h-5 w-5" />
                )}
            </button>
        </div>
    );
} 