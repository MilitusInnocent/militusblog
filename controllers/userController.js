var User = require('../models/user');
var models = require("../models");

// Display user create form on GET.
exports.user_create_get = function(req, res, next) {
        // create user GET controller logic here 
        res.render('forms/user_form', { title: 'Create User',  layout: 'layouts/main'});
};

// Handle user create on POST.
exports.user_create_post = function(req, res, next) {
     // create a new post based on the fields in our post model
     // I have create two fields, but it can be more for your model
      models.User.create({
            username: req.body.username,
        }).then(function() {
            console.log("User created successfully");
           // check if there was an error during post creation
            res.redirect('/blog/users');
      });
};

// Display user delete form on GET.
exports.user_delete_get = function(req, res, next) {
        models.User.destroy({
                // find the user_id to delete from database
                where: {
                  id: req.params.user_id
                }
              }).then(function() {
               // If an user gets deleted successfully, we just redirect to users list
               // no need to render a page
                res.redirect('/blog/users');
                console.log("User deleted successfully");
              });
};

// Handle user delete on POST.
exports.user_delete_post = function(req, res, next) {
        models.User.destroy({
            // find the user_id to delete from database
            where: {
              id: req.params.user_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/blog/users');
            console.log("User deleted successfully");
          });
        res.redirect('/users');
};//for delete, you don't really need GET function since you are not communicating anything.

// Display user update form on GET.
exports.user_update_get = function(req, res, next) {
       // Find the post you want to update
       console.log("ID is " + req.params.user_id);
       models.User.findById(
               req.params.user_id
       ).then(function(user) {
              // renders a user form
              res.render('forms/user_form', { title: 'Update User', user: user, layout: 'layouts/main'});
              console.log("User update get successful");
         });
};

// Handle post update on POST.
exports.user_update_post = function(req, res, next) {
        console.log("ID is " + req.params.user_id);
        models.User.update(
        // Values to update
            {
                username: req.body.username,
            },
          { // Clause
                where: 
                {
                    id: req.params.user_id
                }
            }
        //   returning: true, where: {id: req.params.user_id} 
         ).then(function() { 
                // If an user gets updated successfully, we just redirect to users list
                // no need to render a page
                res.redirect("/blog/users");  
                console.log("User updated successfully");
          });
}; 

// Display list of all users.
//LIST ALL 
exports.user_list = function(req, res, next) {
        // GET controller logic to list all users
         models.User.findAll(
        ).then(function(users) {
        // renders a user list page
        console.log("rendering post list");
        res.render('pages/user_list', { title: 'User List', users: users, layout: 'layouts/main'} );
        console.log("Users list renders successfully");
        });
        // renders all users list
        //res.render('pages/user_list', { title: 'User List',  layout: 'layouts/list'} );
};

// Display detail page for a specific user.
exports.user_detail = function(req, res, next) {
        models.User.findById(
                req.params.user_id
        ).then(function(user) {
        // renders an inividual user details page
        console.log('database returns user ' + user.id);
        console.log('database returns user ' + user.username);
        res.render('pages/user_detail', { title: 'User Details', user: user, layout: 'layouts/main'} );
        console.log("user detai ls renders successfully");
        });
};

 