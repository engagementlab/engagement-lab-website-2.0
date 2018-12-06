'use strict';
/**
 * Engagement Lab Website v2.x
 * Developed by Engagement Lab, 2015
 * ==============
 * People view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class team
 * @author Johnny Richardson
 *
 * ==========
 */
const keystone = global.keystone;
var Person = keystone.list('Person');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'people';

    // Load all team members and sort/categorize them 
    view.on('init', function(next) {

        var q = Person.model.find({}).sort([
            ['sortOrder', 'ascending']
        ]).populate('cohortYear');

        var categorize = function(val, cat) {
            return val.filter(function(item) {
                return item.category == cat;
            });
        };
        var cohort = function(val, cat) {
            return val.filter(function(item) {
                if (!item || !item.cohortYear[cat])
                    return;
                else 
                    return item.cohortYear[cat] == true;
            });
        };
        
        // Setup the locals to be used inside view
        q.exec(function(err, result) {

            locals.leadership = categorize(result, 'faculty leadership');
            locals.staff  = categorize(result, 'staff');
            locals.fellows = categorize(result, 'faculty fellows');
            locals.board = categorize(result, 'advisory board');
            locals.labassistants = categorize(result, 'lab assistants');
            locals.cmap = categorize(result, 'CMAP');

            locals.currentCohort = cohort(locals.cmap, 'current');
            locals.prevCohort = cohort(locals.cmap, 'previous');

            if (locals.currentCohort.length > 0)
                locals.currentYear = locals.currentCohort[0].cohortYear.name;

            if (locals.prevCohort.length > 0)
                locals.prevYear = locals.prevCohort[0].cohortYear.name;

            next(err);
        });

    });

    // Render the view
    view.render('people');

};
