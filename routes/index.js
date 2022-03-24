var express = require('express');
var router = express.Router();
const Ajv = require("ajv");
const ajv = new Ajv();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JSON Validator', isValid: ' ' });
});

router.post('/', function(req, res, next) {
  try{
    const validate = ajv.compile(schemaSimple);
    const data = JSON.parse(req.body.validateJson);
    const valid = validate(data);
    //console.log(validate.errors);
    if(valid){
      res.render('index',{title: 'JSON Validator', isValid: 'JSON valid!'});
    }else{
      res.render('index',{title: 'JSON Validator', isValid: 'JSON not valid!'});
    }
  }catch (e){
    console.error(e)
  }
});

const schemaSimple = {
  type: "object", properties: {
    foo: {type: "integer"},
    bar: {type: "string"} },
  required: ["foo"],
  additionalProperties: false
}

const schemaSuperHeroe = {
  "type": "object",
  "properties": {
    "squadName": { "type": "string" },
    "homeTown": { "type": "string" },
    "formed": { "type": "integer" },
    "secretBase": { "type": "string" },
    "active": { "type": "boolean" },
    "members": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "age": { "type": "integer" },
            "secretIdentity": { "type": "string" },
            "powers": {
              "type": "array",
              "items": { "type": "string" },
              "minItems": 1
            }
          },
          "required": [ "name", "age", "secretIdentity", "powers" ]
        },
        {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "age": { "type": "integer" },
            "secretIdentity": { "type": "string" },
            "powers": {
              "type": "array",
              "items":
                  { "type": "string" },
              "minItems": 1
            }
          },
          "required": [ "name", "age", "secretIdentity", "powers" ]
        }
      ]
    }
  },
  "required": [
    "squadName",
    "homeTown",
    "formed",
    "secretBase",
    "active",
    "members"
  ]
}

module.exports = router;
