const express = require("express");
const Message = require("./model");

const { Router } = express;

const router = Router();

router.post("/message", async function(request, response, next) {
  try {
    const { body } = request;
    const { text } = body;
    const entity = { text };
    const message = await Message.create(entity);

    console.log(response.dataValues);
    response.send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
