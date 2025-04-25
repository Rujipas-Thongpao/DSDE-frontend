"use client";
import Image from "next/image";
import Form from "next/form";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { ticket } from "./Types/ticket";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Typewriter from "./components/Typewriter";

const tickets_mock = [
  {
    ticket_id: "TCK001",
    type: ["Garbage"],
    organization: "Environment Dept.",
    timestamp: "2025-04-12T10:00:00Z",
    state: "Open",
    star: 2,
    photo:
      "https://storage.googleapis.com/traffy_public_bucket/attachment/2025-04/eed82b385f8a1b773414d066a0800ffe.jpg",
  },
  {
    ticket_id: "TCK002",
    type: ["Streetlight"],
    organization: "City Electric",
    timestamp: "2025-04-10T16:45:00Z",
    state: "Resolved",
    star: 5,
    photo: "https://via.placeholder.com/300x200?text=Streetlight",
  },
  {
    ticket_id: "TCK003",
    type: ["Streetlight"],
    organization: "City Electric",
    timestamp: "2025-04-10T16:45:00Z",
    state: "Resolved",
    star: 5,
    photo: "https://via.placeholder.com/300x200?text=Streetlight",
  },
  {
    ticket_id: "TCK004",
    type: ["Flooding"],
    organization: "Disaster Response",
    timestamp: "2025-04-11T08:15:00Z",
    state: "In Progress",
    star: 3,
    photo: "idk,man",
  },
  {
    ticket_id: "TCK005",
    type: ["Flooding"],
    organization: "Disaster Response",
    timestamp: "2025-04-11T08:15:00Z",
    state: "In Progress",
    star: 3,
    photo: "idk,man",
  },
];

const summarize_mock =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis dignissim lectus. Proin placerat nisi mauris, non faucibus orci euismod eget. In pulvinar ante sed lacinia molestie. Vestibulum risus magna, tempor eu ultrices vel, cursus at magna. Nullam sed purus ac lacus malesuada congue nec ut lectus. Maecenas eleifend convallis velit sed maximus. Curabitur aliquet sem ac erat volutpat iaculis. Pellentesque semper diam quis gravida consequat. Nullam nec sem at nisl sagittis pretium. Nam aliquet cursus blandit. Nam viverra odio mi, eget faucibus leo lobortis vitae. Aenean ac sem risus. Aenean elit mi, maximus et ante eget, sagittis consequat quam.";
export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [summarize, setSummarize] = useState("");
  const [tickets, setTickets] = useState<ticket[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    console.log(textInput);
    e.preventDefault();
    setLoading(true);
    setSummarize("");
    setTickets([]);
    try {
      console.log("fetching data...");
      const res1 = await axios.post("http://localhost:8000/query/content", {
        query: textInput,
      });
      const res2 = await axios.post("http://localhost:8000/query/data", {
        query: textInput,
      });

      setSummarize(res1.data.content);
      setTickets(res2.data.data);
    } catch (error) {
      setSummarize(summarize_mock);
      setTickets(tickets_mock);
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex justify-center min-h-screen bg-white text-green-900 p-6">
      {/* Chat Box  */}
      <div className="max-w-7xl w-full">
        <form onSubmit={onSubmit} className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-green-1000">
              Traffy Summary
            </h1>
            <input
              name="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="block w-full sm:w-[70%] p-4 text-gray-900 border border-green-500 rounded-lg bg-gray-50 text-base focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your text"
            />
            <button
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        {/* Summary  */}
        <div id="result-summarize w-full" className="mb-6">
          {loading && (
            <div className="flex justify-center items-center my-20">
              <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {summarize && (
            <h1 className="text-lg font text-green-800 space-y-4">
              {/* <ReactMarkdown>
                {summarize}
              </ReactMarkdown> */}
              <Typewriter text={summarize}/>
            </h1>
          )}
        </div>

        {/* Ticket Grid  */}
        {/* {loading && (
          <div className="flex justify-center items-center my-6">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )} */}
        <div
          id="result-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6"
        >
          {tickets.map((ticket) => (
            <Card key={ticket.ticket_id} {...ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
