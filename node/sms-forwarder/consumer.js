const { RelayConsumer } = require('@signalwire/node')
require('dotenv').config()

const projectId = process.env.SIGNALWIRE_PROJECT_KEY
const token = process.env.SIGNALWIRE_TOKEN
const toNumber = process.env.TO_NUMBER
const signalwireNumber = process.env.SIGNALWIRE_PHONE_NUMBER

const consumer = new RelayConsumer({
  project: projectId,
  token: token,
  contexts: ['sms-forwarder'],
  ready: async ({ client }) => {
    console.log('Consumer Ready!')
    if (process.env.ENABLE_DEBUG) { 
      client.__logger.setLevel(client.__logger.levels.DEBUG)
    }
  },
  onIncomingMessage: async (message) => {
    console.log('Received message', message.id, message.context)

    const sendResult = await consumer.client.messaging.send({
      context: 'office',
      from: signalwireNumber,
      to: toNumber,
      body: message.body
    })
  
    if (sendResult.successful) {
      console.log('Message ID: ', sendResult.messageId)
    } else {
      console.log(sendResult.errors)
    }
  }
})

consumer.run()