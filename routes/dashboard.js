
/*
 * GET dashboard page.
 */

exports.display = function(req, res){
  res.render('dashboard', { title: 'My Dashboard' });
};