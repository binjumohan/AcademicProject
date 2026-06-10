import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const MyBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [message, setMessage] = useState("");

  const BASE_URL = "http://localhost:5000";

  // ✅ Fetch Bookmarks
  const fetchBookmarks = async () => {
    try {
      const res = await API.get("/bookmarks");
      setBookmarks(res.data);
    } catch (err) {
      console.log(err);
      setMessage("❌ Failed to load bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  // ✅ Remove Bookmark
  const handleRemove = async (eventId) => {
    try {
      await API.delete(`/bookmarks/${eventId}`);

      setBookmarks(
        bookmarks.filter((b) => b.event._id !== eventId)
      );
    } catch (err) {
      console.log(err);
      setMessage("❌ Failed to remove bookmark");
    }
  };

  const role = localStorage.getItem("role");

  if (!role) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl text-yellow-400">
          ⚠️ Please login to view bookmarks
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto pt-16">

        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            📌 My Bookmarks
          </h1>

          <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
            {bookmarks.length} Saved Events
          </span>
        </div>

        {/* Message */}
        {message && (
          <p className="text-red-400 mb-6">{message}</p>
        )}

        {/* Empty State */}
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
              No bookmarks yet 😔
            </h2>
            <p className="text-gray-400">
              Start bookmarking your favorite events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks.map((item) => (
              <div
                key={item._id}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-yellow-500 shadow-lg hover:scale-105 transition duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={`${BASE_URL}${item.event.image}`}
                    alt={item.event.eventName}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
                    {item.event.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h2 className="text-2xl font-bold text-yellow-400 line-clamp-1">
                    {item.event.eventName}
                  </h2>

                  <p className="text-gray-300 text-sm line-clamp-2">
                    {item.event.description}
                  </p>

                  <div className="space-y-1 text-sm text-yellow-100">
                    <p>📍 {item.event.venue}</p>
                    <p>
                      📅 {new Date(item.event.date).toLocaleDateString("en-IN")}
                    </p>
                    <p>
                      ⏰ {item.event.timeFrom} - {item.event.timeTo}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Link
                      to={`/events/${item.event._id}`}
                      className="flex-1 text-center bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleRemove(item.event._id)}
                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookmarks;