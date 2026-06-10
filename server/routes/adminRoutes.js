const express = require("express");
const upload = require("../middleware/upload"); 
const router = express.Router();


const {
  getAllUsers,
  deleteUser,
  getAllEvents,
  deleteEvent,
  updateEvent,
  addEvents,
  login

} = require("../controllers/adminController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//const upload = multer({ storage });

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware=require("../middleware/adminMiddleware")

//
router.post("/login",login);
//  USERS
router.get("/users", authMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

//  EVENTS

router.post("/events", authMiddleware, adminMiddleware,upload.single("image"),addEvents);
router.get("/events", authMiddleware, adminMiddleware, getAllEvents);
router.delete("/events/:id", authMiddleware, adminMiddleware, deleteEvent);
router.put("/events/:id", authMiddleware, adminMiddleware,upload.single("image"), updateEvent);

module.exports = router;