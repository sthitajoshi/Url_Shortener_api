const shortid = require('shortid');
const URL = require('../models/url');  // Corrected path

async function generateShorturl(req, res) {
    const body = req.body;

    if (!body.url) {  // Ensure the property name matches the one used in the code
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortId = shortid.generate();
    try {
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,  // Ensure the property name matches the one used in the code
            visitHistory: [],
        });

        return res.json({ id: shortId });
    } catch (error) {
        console.error('Failed to generate short URL:', error);
        return res.status(500).json({ error: 'Failed to generate short URL' });
    }
}

async function handlegetAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (error) {
        console.error('Failed to retrieve analytics:', error);
        return res.status(500).json({ error: 'Failed to retrieve analytics' });
    }
}

module.exports = {
    generateShorturl,
    handlegetAnalytics,
};
