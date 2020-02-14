const express = require("express");
const Message = require("./model");
const Sse = require("json-sse");

const { Router } = express;

const stream = new Sse();

const router = Router();

// get on the stream
router.get("/stream", async (request, response, next) => {
  try {
    const messages = await Message.findAll();
    console.log("messages test:", messages);

    const json = JSON.stringify(messages);

    stream.updateInit(json);
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});

router.get("/message", async function(request, response, next) {
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

    const json = JSON.stringify(message);
    stream.send(json);

    response.send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
