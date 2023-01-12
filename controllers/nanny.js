const User = require('../models/user');


exports.getAllNannies = (req, res) => {
    console.log("HELLO NNIES");
    const projection = { _id: 0, name: 1, email:1, phone:1, location:1, experience:1 };
    User.find({role: 2})
    .exec((err, nannies) => {
      if (err) {
        console.log("getNANNIES")
        return res.send(400).json({
          error: 'NO Nannies near you.',
        });
      }
      res.json(nannies);
    });

}

exports.nannyHome= () => {
    return "This is Nanny Home".json()
}