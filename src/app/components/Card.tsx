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
"use client";

import { useState } from "react";
import { ticket } from "../Types/ticket";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Card({
    comment = "Unknown comment",
    ticket_id = "Unknown ID",
    type = ["General"],
    organization = ["Unspecified Organization"],
    timestamp = new Date().toISOString(),
    state = "Pending",
    star = 0,
    photo = "https://storage.googleapis.com/traffy_public_bucket/attachment/2025-04/eed82b385f8a1b773414d066a0800ffe.jpg",
}: ticket) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);


    const statusColors: Record<string, string> = {
        "เสร็จสิ้น": "#4CAF50", // Green
        "กำลังดำเนินการ": "#FF9800", // Blue
        "รอรับเรื่อง": "#2196F3", // Orange
        "ส่งต่อ": "#FF5722", // Red
    };
    const fallbackPhoto =
        "https://storage.googleapis.com/traffy_public_bucket/attachment/2025-04/eed82b385f8a1b773414d066a0800ffe.jpg";

    return (
        <div className="bg-white shadow-md rounded-2xl p-4 space-y-10 max-w-70 mx-auto cursor-pointer">
            <a
                href={`https://fondue.traffy.in.th/?page=detail&ticketID=${ticket_id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2 className="text-xl font-bold text-gray-800">
                    {ticket_id}
                </h2>

                <div className="relative w-full h-48 bg-gray-100 mb-3 rounded-md overflow-hidden border">
                    {!imgLoaded && !imgError && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                            Loading image...
                        </div>
                    )}
                    <img
                        src={imgError ? fallbackPhoto : photo}
                        alt="Ticket Photo"
                        className={`w-full h-48 object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgError(true)}
                    />
                </div>

                <div className="text-sm text-gray-600 ">
                    <div className="text-wrap break-words">
                        <h3 className="font-medium ">{comment.length > 50 ? comment.slice(0, 50) + '...' : comment}</h3>
                    </div>
                    <h3 className="font-medium"><span className="font-bold">By :</span> {organization.join(", ")}</h3>
                    <h3 className="front-medium">{new Date(timestamp).toLocaleString()}</h3>
                    {
                        type.map(t => (
                            <div
                                style={{
                                    backgroundColor: "lightgray",
                                    color: "black",
                                    padding: "4px 8px",
                                    margin: "2px",
                                    borderRadius: "4px",
                                    fontSize: "14px",
                                    fontWeight: "light",
                                    display: "inline-flex",
                                    alignItems: "center",
                                }}
                            >
                                {t}
                            </div>
                        ))
                    }
                </div>

                <div className="text-sm text-gray-600">
                    <div
                        style={{
                            backgroundColor: statusColors[state],
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "light",
                            display: "inline-flex",
                            alignItems: "center",
                        }}
                    >
                        {state}
                    </div>
                </div>

                <div className="text-sm text-yellow-500">
                    {star > 0 ? "⭐".repeat(star) : "No rating"}
                </div>
            </a>
        </div>
    );
}
