import React from "react";
import { Link } from "react-router-dom";

const Event = ({
  id,
  eventName,
  description,
  venue,
  image,
  date,
  timeFrom,
  timeTo,
  eventCoordinator,
  category,
  price,
}) => {
  return (
   <div className="
  bg-slate-800 
  rounded-2xl 
  overflow-hidden 
  flex flex-col 
  h-full
  border border-yellow-500 
  hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]
  transition duration-300
">
  <img src={image} className="h-48 w-full object-cover" />

   {/* Content */}
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold text-yellow-400">
            {eventName}
          </h2>
  
          <p className="text-sm text-yellow-100 line-clamp-3">
            {description}
          </p>
  
          {/* Date */}
          <p className="text-sm">
            📅{" "}
            {new Date(date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
  
          {/* Price */}
          <p className="text-sm font-semibold text-yellow-300">
            {/* 💰 {price === 0 ? "Free" : `₹${price}`} */}
            <span>📍 {venue}</span>
          </p>
  
  
  
          {/* Footer */}
          <div className="pt-4 border-t border-yellow-700 flex justify-between items-center">
            <span className="text-sm text-yellow-400">
              👤 {eventCoordinator}
            </span>
  
            <Link to={`/events/${id}`}>
              <button
                className="px-4 py-2 rounded-lg bg-yellow-500 text-black
                font-semibold hover:bg-yellow-400 transition"
              >
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>

  );
};

export default Event;
