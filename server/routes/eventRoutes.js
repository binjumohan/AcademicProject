const router = require("express").Router();
const {
  createEvent,
  getEvents,
  deleteEvent,
  getEventById
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { addBookmark } = require("../controllers/bookmarkController");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", authMiddleware, createEvent);
router.delete("/:id", authMiddleware, deleteEvent);
router.post("/", authMiddleware, adminMiddleware, createEvent);
router.delete("/:id", authMiddleware, adminMiddleware, deleteEvent);
router.post("/:eventId", authMiddleware, addBookmark);
module.exports = router;