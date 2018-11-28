/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015-2018
 * ==============
 * TV model API controller.
 *
 * Help: https://gist.github.com/JedWatson/9741171
 *
 * @class tv
 * @author Johnny Richardson
 *
 * ==========
 */
const async = require('async')
	  keystone = global.keystone;

var TV = keystone.list('TV');

/**
 * Get all TV Content
 */
exports.get = function(req, res) {

    let tvQuery = TV.model.find({}, 'currentBlurb slideshowImages.public_id displayVideo videoId');

    tvQuery.exec((err, result) => {

    	if (err) return res.apiError('database error', err);
			
			// Set CORS
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
			res.apiResponse(result);

    });
};
