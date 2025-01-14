const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Character = require("../models/Character.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const SongsApi = new Api();

router.get("/songs", (req, res) => {
  SongsApi.getAdrienSongs()
    .then((response) => {
      res.render("songs", { song: response.data });
    })
    .catch((err) => console.log(err));
});

router.post("/add-favorite", isLoggedIn, (req, res) => {
  const query = ({ name, img } = req.body);
  const idToCheck = req.body.name;
  Character.find({ name: idToCheck }).then((charArray) => {
    //comprobar si ese apiId ya esta en db characters
    if (charArray.length === 0) {
      Character.create(query)
        .then((result) => {
          User.findByIdAndUpdate(req.user._id, {
            $push: { favorites: result._id },
          }).then(() => {
            res.redirect("/songs");
          });
        })
        .catch((err) => console.log(err));
    } else {
      User.findById(req.user._id)
        .then((user) => {
          if (!user.favorites.includes(charArray[0]._id)) {
            User.findByIdAndUpdate(req.user._id, {
              $push: { favorites: charArray[0]._id },
            }).then(() => {
              res.redirect("/songs");
            });
          } else {
            res.redirect("/songs");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

router.post("/delete-favorite", isLoggedIn, (req, res) => {
  const { id } = req.body;
  User.findByIdAndUpdate(req.user._id, { $pull: { favorites: id } })
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => console.log(err));
});

/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */

module.exports = router;
