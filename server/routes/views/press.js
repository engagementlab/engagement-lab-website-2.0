'use strict';
/**
 * Engagement Lab Website v2.x
 * Developed by Engagement Lab, 2015
 * ==============
 * News/blog page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class news
 * @author Johnny Richardson
 *
 * ==========
 */

const keystone = global.keystone;
var Resource = keystone.list('Resource');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'press';

    // Load current press content
    view.on('init', function(next) {

        // err if JSON parsing failed
        if(err) throw err;

        Resource.model.find({ type: 'article' }, {}, {
            sort: { date: -1 }
        }).exec(function(err, articleResult){

            locals.articles = articleResult;

            _.each(locals.articles, function(article) {
                article.blurb = article.summary;
                article.title = article.name;
            });

            next(err);
        });
        
    });

    // Render the view
    view.render('press');

};
