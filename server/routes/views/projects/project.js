/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Research projects directory view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @module research
 * @class project
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone;
var Project = keystone.list('Project');
var Resource = keystone.list('Resource');
var _ = require('underscore');
var cloudinary = require('cloudinary');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'research';
    locals.key = 'project';

    // Load the current project
    view.on('init', function(next) {
        /* 
            This query gets a project by the key or custom url (if defined) in the
            URL and populates resources from its model 
        */
        var projectQuery = Project.model.findOne({
            'enabled': true,
            $or:[ {'key': req.params.project_key}, {'customUrl': req.params.project_key} ]
        })
        .populate('videos articles blogs files principalInvestigator');

        // Setup the locals to be used inside view
        projectQuery.exec(function(err, result) {
            
            if (result === null)
                 res.status(404).send(keystone.wrapHTMLError('Cannot find project', 'Sorry, but it looks like the project you were looking for does not exist! Try <a href="http://elab.emerson.edu/projects">going back</a> to the directory.'));

            // "Articles" are both external articles and blogs, because why the fuck not?
            var projectArticles = result.articles.concat(result.blogs);

            _.map(projectArticles, function(article) {

                // Set image (if no override, use embedly-provided image as fallback)
                var hasOverride = article.imageOverride.url !== undefined && article.imageOverride.url.length > 0;
                
                article.image = hasOverride ? 
                                cloudinary.url(article.imageOverride.public_id, {width: 350, height: 233}) :
                                article.data.thumbnailUrl;

                return article;

            });

            projectArticles = _.sortBy(projectArticles, function(a) { 
                var dt = new Date(a.date); 
                return -dt; 
            });

            locals.projectArticles = projectArticles;

            // Format dates
            locals.projectDates = result._.startDate.format('MMMM Do YYYY - ') +
                                  ((result.endDate === undefined || result.endDate === null) ?
                                  'Current' : result._.endDate.format('MMMM Do YYYY'));

            // Format images into {caption, img}
            locals.projectImageObjects = [];
            _.each(result.projectImageCaptions, function(str, i) {
                locals.projectImageObjects.push( {caption: str, img: result.projectImages[i]} );
            });

            // Determine project tabs to be active by default (images are first if defined)
            if(result.projectImages.length === 0) {

                locals.videosTabFirst = ( result.videos.length > 0 ); 
                locals.filesTabFirst = ( !locals.videosTabFirst && result.files.length > 0 ); 
                locals.customTabsFirst = ( !locals.videosTabFirst && !locals.filesTabFirst );

            }
            else
                locals.projectImagesLength = result.projectImages.length;

            if(result.customTabs.html !== undefined && result.customTabs.html.length > 0) {
            
                // Get custom tab header and content 
                // First, map out headers via a match
                var tabHeaders = result.customTabs.html.match(/<h1[^>]*>(.*?)<\/h1>/g)
                                 .map(function(val) {
                                    return val.replace(/<\/?h1[^>]*>/g,'');
                                 });
                // Then get contents by replacing headers with '|sep|' (to avoid remove legit content) and splitting
                var tabContents = result.customTabs.html.replace(/<h1[^>]*>(.*?)<\/h1>/g, '|sep|').split('|sep|');
                // First index is empty
                tabContents.shift(); 
                
                locals.projectCustomTabs = { headers: tabHeaders, content: tabContents };

            }

            locals.projectMeta = {
                title: result.name, 
                description: String(result.overview.md).substr(0, 120), 
                image: result.image
            }

            // Project data not re-formatted above
            locals.project = result;
            next(err);
        });
    });

    // Render the view
    view.render('projects/project');

};