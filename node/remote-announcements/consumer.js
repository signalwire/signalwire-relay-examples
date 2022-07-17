require('dotenv').config();
let { Voice } = require('@signalwire/realtime-api')
let player = require('play-sound')(opts = {})
const request = require('request');
const fs = require('fs');



const projectId = process.env.SIGNALWIRE_PROJECT_ID
const token = process.env.SIGNALWIRE_TOKEN


const client = new Voice.Client({
  project: projectId,
  token: token,
  contexts: ["speaker"],
});

client.on("call.received", async (call) => {
  console.log("Got call", call.from, call.to);

  try {
    await call.answer();
    console.log("Inbound call answered");
  } catch (error) {
    console.error("Error answering inbound call", error);
  }

  const playback = await call.playTTS({ text: "Leave a message after the beep. Press the pound key to end." });
  await playback.waitForEnded();

  const beep = await call.playAudio({
    url: "https://www.mediacollege.com/downloads/sound-effects/star-trek/tos/tos-computer-01.mp3",
  });
  await beep.waitForEnded();

  const params = {
    stereo: false,
    format: 'wav',
    direction: 'both',
    initial_timeout: 0,
    end_silence_timeout: 0
  }
  const recordResult = await call.recordAudio(params)

  call.on('recording.ended', async ()=> {
    let { url } = recordResult
    await downloadFile(url, './message.wav')
    console.log('playing audio')
    player.play('./message.wav', function(err){
      if (err) throw err
    })
    
  })  

});

const downloadFile = (uri, filename) => new Promise((resolve, reject) => {
  request.head(uri, (err, res, body) => {
      console.log('\n', 'Downloading File');
      if (fs.existsSync(filename)) {
        fs.unlinkSync(filename);
      }
      request(uri)
          .on('error', error => {
              res.status(502).send(error.message)
              reject(error)
          })
          .pipe(fs.createWriteStream(filename))
          .on('finish', resolve);
  });
})


