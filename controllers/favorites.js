const
  User = require('../models/User.js')

module.exports = {
  index: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      // console.log(user.local.favorite)
      res.render('pages/favorites', {user: user})
    })
  },

  create: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return console.log(err)
      user.local.favorite.push(req.body)
      user.save((err) => {
        if(err) return console.log(err)
        res.json(user)
      })
    })
  },

  show: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return console.log(err)
      var favoritesArray = user.local.favorite
      var selectedFavorite = ""
      for( i = favoritesArray.length - 1; i>=0; i--) {
        if(favoritesArray[i]._id == req.params.favId) {
          favoritesArray[i].name = req.body.name
          selectedFavorite = favoritesArray[i]
        }
      }
      res.render('pages/results', {favorite: selectedFavorite})
    })
  },

  update: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) console.log(err)
      var favoritesArray = user.local.favorite
      var updatedFavorite = ""
      for( i = favoritesArray.length - 1; i>=0; i--) {
        if(favoritesArray[i]._id == req.params.favId) {
          favoritesArray[i].name = req.body.name
          updatedFavorite = favoritesArray[i]
        }
      }
      user.save((err) => {
        if(err) return console.log(err)
        res.json({success: true, updatedTask: updatedFavorite.name})
      })
    })
  },

  destroy: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) console.log(err)
      var favoritesArray = user.local.favorite
      for( i = favoritesArray.length - 1; i>=0; i--) {
        if(favoritesArray[i]._id == req.params.favId) favoritesArray.splice(i,1)
      }
      user.save((err) => {
        if(err) return console.log(err)
        res.json(user)
      })
    })
  }

}
