
exports.error404 = (req, res, next) => {
  res.status(404).render('storeViews/errorView', {
    pageTitle: 'Error', 
    path: '/store/404'
  });
};
