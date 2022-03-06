
const { RelayConsumer } = require('@signalwire/node')
require('dotenv').config()

const projectId = process.env.SIGNALWIRE_PROJECT_KEY
const token = process.env.SIGNALWIRE_TOKEN
const verifiedNumber = process.env.VERIFIED_NUMBER

const consumer = new RelayConsumer({
  project: projectId,
  token: token,
  contexts: ['voice-forwarder'],
  ready: async ({ client }) => {
    console.log('Consumer Ready!')
    if (process.env.ENABLE_DEBUG) { 
      client.__logger.setLevel(client.__logger.levels.DEBUG)
    }
  },
  onIncomingCall: async (call) => {
    const { successful } = await call.answer()
    if (!successful) { return }

    await call.playTTS({ text: 'Please wait on the line while we connect you.' })

    const connectResult = await call.connect({ type: 'phone', to: verifiedNumber, timeout: 30 })
      
    if (connectResult.successful) {
        console.log('Connected to remote number!')
        call.on('answered', (call) => {
            console.log('Answered!')
        }).on('ended', (call) => {
            console.log('Call ended')
        })
    }
  }
})

consumer.run()