require('dotenv').config();
let { Voice } = require('@signalwire/realtime-api')



const projectId = process.env.SIGNALWIRE_PROJECT_ID
const token = process.env.SIGNALWIRE_TOKEN
const verifiedNumber = process.env.VERIFIED_NUMBER


const client = new Voice.Client({
  project: projectId,
  token: token,
  contexts: ["ivr"],
});

client.on("call.received", async (call) => {
  console.log("Got call", call.from, call.to);

  try {
    await call.answer();
    console.log("Inbound call answered");
  } catch (error) {
    console.error("Error answering inbound call", error);
  }


  const playlist = new Voice.Playlist({ volume: 1.0 })
  .add(
    Voice.Playlist.Audio({
      url: "https://www.mediacollege.com/downloads/sound-effects/star-trek/tos/tos-computer-05.mp3"
    })
  )
  .add(
    Voice.Playlist.TTS({
      text: "Thank you for calling the offices of Doctor Zhivago.",
    })
  )
  .add(Voice.Playlist.Silence({ duration: 1 }))
  .add(
    Voice.Playlist.TTS({
      text: "To hear our hours and location press 1. To make an appointment press 2. To speak with a representative press 0. To hear all options again press 3",
    })
  );

  
  promptCallOptions(call, playlist)

});


const promptCallOptions = async (call, playlist) => {
  const prompt = await call.prompt({
    playlist: playlist,
    digits: {
      max: 1,
      digitTimeout: 2
    },
  });
  const { digits } = await prompt.waitForResult();

  switch(digits) {
    case "1":
      const playback = await call.playTTS({ text: "Located at Scottsdale road and Acoma one mile south of bell road. We are open weekdays til 8 and saturdays til 9." });
      await playback.waitForEnded();
      call.hangup()
      break;
    case "2":
      call.on("prompt.ended", (p) => {
        console.log(prompt.ended, p.id, p.text);
        call.hangup()
      });
      
      const prompt = await call.prompt({
        playlist: new Voice.Playlist().add(
          Voice.Playlist.TTS({ text: "Please say your name and number, reason for calling, and requested time of appointment." })
        ),
        speech: {
          endSilenceTimeout: 1,
          speechTimeout: 60,
          language: "en-US"
        },
      });
      break;
    case "3":
      promptCallOptions(call, playlist)
      break;
    case "0":
      const peer = await call.connectPhone({
        from: verifiedNumber,
        to: call.from,
        timeout: 30,
      });
      break;
    default:
      // code block
  }
}