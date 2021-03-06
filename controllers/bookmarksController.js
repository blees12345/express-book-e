const express = require('express');
// instantiate a router -- this will hold all the logic
// for the URLs + methods for this resource
const router = express.Router();
// import Bookmark model
const Bookmark = require('../models/Bookmark');

// localhost:8000/api/bookmarks
// GET: Index route
router.get('/', (req, res) => {
	// find all the bookmarks in the db
	Bookmark.find({}).then((bookmarks) => {
		// send them back as json
		return res.json(bookmarks);
	});
});

// localhost:8000/api/bookmarks/:id
// GET: Show route
router.get('/:id', (req, res) => {
	Bookmark.findById(req.params.id, (err, bookmark) => {
		if (err) {
			return res.sendStatus(404);
		} else {
			return res.json(bookmark);
		}
	});
});

// localhost:8000/api/bookmarks
// POST: Create route
router.post('/', (req, res) => {
	Bookmark.create(req.body, (err, bookmark) => {
		if (err) {
			return res.sendStatus(400);
		} else {
			// send back 201 created status and the newly created bookmark
			return res.status(201).json(bookmark);
		}
	});
});

router.put('/:id',async (req, res) => {
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body,{new:true})
    return res.json(bookmark)
;
});

// localhost:8000/api/bookmarks/:id
// DELETE: Remove route
router.delete('/:id', async (req, res) => {
	const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);

	return res.json(deletedBookmark);
});
//put:update route

// Export this router object so that it is accessible when we require the file elsewhere
module.exports = router;
