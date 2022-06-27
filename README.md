# SignalWire Relay Examples

This repository contains example Relay Consumer applications. 

## Relay NodeJS SDK Examples

- [Voice Forwarder](node/voice-forwarder/)
- [SMS Forwarder](node/sms-forwarder/)

## Prerequisites
To run this example you will need to first create a SignalWire account and a SignalWire Phone Number.

- [Create a SignalWire Space](https://developer.signalwire.com/apis/docs/signing-up-for-a-space)
- [Buy a SignalWire Phone Number](https://developer.signalwire.com/apis/docs/buying-a-phone-number)
- [Verify a Phone number through SignalWire](https://swz.signalwire.com/verified_caller_ids/new) (The number calls will be redirected to for rescheduling)
- A SignalWire Project ID and API Token are required to run this example. [Follow these intructions to create a new API Token.](https://docs.signalwire.com/topics/relay/#relay-documentation-security)

## Configuring the Example

After cloning or downloading this repository, create a file named  ```.env``` and open in a text editor to replace your credentials.
Ther is also a file called env.example with a template for this configuration file.

```
SIGNALWIRE_PROJECT_ID=your-project
SIGNALWIRE_TOKEN=your-token

CALLER_ID=a-number-from-your-sw-account
AGENT_NUMBER=any-phone-number
DEFAULT_DESTINATION==any-phone-number
REPORTING_URL=http://localhost:8080
```

## Running the Example

Ensure you have NodeJS and NPM installed on your machine before running.

1. Open a terminal and navigate to the root directory of this project.
2. Run ```npm install``` to install all the node modules.
3. Start the frontend and backend API by running the the command ```npm run start```
4. Open another terminal window or tab in the same directory.
5. Run the consumer using the command ```node consumer.js```

Both the frontend/backend and the consumer should now be running.

Navigate to http://localhost:8080 to view the example. 

