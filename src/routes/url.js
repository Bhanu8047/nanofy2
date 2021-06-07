const router = require('express').Router()
const { addUrl, getSlug, deleteData } = require('../controllers/url.controller')

router.post('/addUrl', addUrl)
router.get('/slug', getSlug)
router.delete('/allData', deleteData)

module.exports = router