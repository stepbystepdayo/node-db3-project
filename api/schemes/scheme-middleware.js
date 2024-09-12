const Scheme = require("./scheme-model");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const id = req.body.scheme_id;
  Scheme.findById(id).then((scheme) => {
    if (!Scheme) {
      res.status(404).json({
        message: "scheme with scheme_id <actual id> not found",
      });
    } else {
      next();
    }
  });
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const schemeName = req.body.scheme_name;
  if (schemeName === undefined) {
    res.status(404).json({
      message: "invalid scheme_name",
    });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const step = req.body;
  if (
    typeof step.instructions === "string" ||
    step.instructions instanceof String
  ) {
    res.status(400).json({
      message: "invalid step",
    });
  } else if (step.step_number !== "number" || step.step_number < 1) {
    res.status(400).json({
      message: "invalid step",
    });
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
