const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/Mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses = (req, res, next) => {
        // res.json(res.locals._sort)
        let courseQuery = Course.find({})

        // if (req.query.hasOwnProperty('_sort')) {
        //     courseQuery = courseQuery.sort({
        //         [req.query.column]: req.body.type
        //     });
        // }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedDocument]) => {
                res.render('me/stored-courses', {
                    deletedDocument,
                    courses: multipleMongooseToObject(courses),
                })
            })
            .catch(next)
    };

    // [GET] /me/trash/courses
    trashCourses = (req, res, next) => {
        Course.findDeleted({})
            .then((courses) => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses),
            }))
            .catch(next);
    };
}

module.exports = new MeController();
