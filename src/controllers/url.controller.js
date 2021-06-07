const Url = require('../models/url')

module.exports.addUrl = async(req, res, next) => {
    const url = new Url(req.body)
    const slug = await Url.findOne({slug: req.body.slug})
    if(slug) return res.status(400).json({
        success: false,
        resCode: 400,
        _message: 'slug already exists.',
    })
    try {
        await url.save()
        res.status(201).json({
            success: true,
            resCode: 201,
            _message: 'successfully nanofied your url.',
            url: url.slug
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getSlug = async(req, res, next) => {
    const { slug } = req.params
    try {
        const url = await Url.findOne({slug: slug})
        if(!url) return res.render('404')
        res.redirect(url.url)
    } catch (error) {
        next(error)
    }
}

module.exports.deleteData = async (req, res, next) => {
    try {
        const query = await Url.deleteMany({})
        return query.n > 0
         ? res.status(200).json({
            success: true,
            resCode: 200,
            _message: 'sucessfully deleted allData',
         })
         : res.status(400).json({
             success: false,
             resCode: 400,
             _message: 'could not delete.',
         })
    } catch (error) {
        next(error)
    }
}