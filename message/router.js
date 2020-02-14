const express = require("express");
const Message = require("./model");
const Sse = require("json-sse");

const stream = new Sse(); // is going to be a list that we are going to send to.

const { Router } = express;

const router = Router();

// get on the stream
router.get("/stream", (request, response, next) => {
  stream.updateInit('test'); // prepare this data, so when the next client connects, you send it over the streams and immidiately connect the client.
  stream.init(request, response);
});

router.get("/message", async function(request, response) {
  try {
    const messages = await Message.findAll();
    response.send(messages);
  } catch (error) {
    next(error);
  }
});

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
