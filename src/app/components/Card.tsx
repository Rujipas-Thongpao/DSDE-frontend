/*
- ticket_id: A unique identifier for each ticket or case.
- type: The category or type of issue reported in the ticket [multiple labels].
- organization: The organization or department handling the ticket.
comment: complaints or feedback provided by users regarding public services.
- photo: A link to photos that support the issue.
photo_after: A link to a photo taken after the issue has been addressed.
coords: Coordinates (latitude and longitude).
- address: The physical address.
subdistrict: The sub district in which the issue was reported.
district: The district in which the issue was reported.
province: The province in which the issue was reported.
- timestamp: The date and time when the ticket was created.
- state: The current state or status of the ticket.
- star: A numerical rating (0-5).
count_reopen: The number of times the ticket was reopened.
ast_activity: The date and time of the last activity on the ticket.

*/
'use client';

import { useState } from 'react';
import { ticket } from '../Types/ticket';

type CardProps = {
    ticket_id?: string;
    type?: string[];
    organization?: string;
    timestamp?: string;
    state?: string;
    star?: number;
    photo?: string;
};

export default function Card({
    ticket_id = 'Unknown ID',
    type = ['General'],
    organization = 'Unspecified Organization',
    timestamp = new Date().toISOString(),
    state = 'Pending',
    star = 0,
    photo = 'https://storage.googleapis.com/traffy_public_bucket/attachment/2025-04/eed82b385f8a1b773414d066a0800ffe.jpg',
}: ticket) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    const fallbackPhoto = 'https://storage.googleapis.com/traffy_public_bucket/attachment/2025-04/eed82b385f8a1b773414d066a0800ffe.jpg';

    return (
        <div className="bg-white shadow-md rounded-2xl p-4 space-y-3 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-800">Ticket ID: {ticket_id}</h2>

            <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden border">
                {!imgLoaded && !imgError && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                        Loading image...
                    </div>
                )}
                <img
                    src={imgError ? fallbackPhoto : photo}
                    alt="Ticket Photo"
                    className={`w-full h-48 object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                />
            </div>

            <div className="text-sm text-gray-600">
                <span className="font-medium">Type:</span> {type.join(', ')}
            </div>

            <div className="text-sm text-gray-600">
                <span className="font-medium">Organization:</span> {organization}
            </div>

            <div className="text-sm text-gray-600">
                <span className="font-medium">Timestamp:</span>{' '}
                {new Date(timestamp).toLocaleString()}
            </div>

            <div className="text-sm text-gray-600">
                <span className="font-medium">State:</span> {state}
            </div>

            <div className="text-sm text-yellow-500">
                <span className="font-medium">Rating:</span>{' '}
                {star > 0 ? '⭐'.repeat(star) : 'No rating'}
            </div>
        </div>
    );
}
