require('dotenv').config();
let { Voice } = require('@signalwire/realtime-api')

const projectId = process.env.SIGNALWIRE_PROJECT_ID
const token = process.env.SIGNALWIRE_TOKEN


const client = new Voice.Client({
  project: projectId,
  token: token,
  contexts: ["phonetap"],
});

client.on("call.received", async (call) => {
  console.log("Got call", call.from, call.to);

  try {
    await call.answer();
    console.log("Inbound call answered");

    await call.playTTS({ text: "Hello! This is a test call." });
  } catch (error) {
    console.error("Error answering inbound call", error);
  }

  const tap = await call.tapAudio({
    direction: "both",
    device: {
      type: "ws",
      uri: "wss://",
    },
  });
  
  await tap.stop();
});

