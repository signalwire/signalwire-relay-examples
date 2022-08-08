# Remote Announcements

This example runs a RELAY consumer that receives calls, allows a caller to record a message, and then plays the audio of that recording immediately on the host machine.

It can easily run on a Raspberry Pi with a speaker plugged into the 3.5mm audio jack or a USB speaker (which requires additional configuration to set as default audio device)

## Prerequisites

To run this example you will need to first create a SignalWire account and then configure a SignalWire Space with an inbound phone number. 

- [Create a SignalWire Space](https://developer.signalwire.com/apis/docs/signing-up-for-a-space)
- [Buy a SignalWire Phone Number](https://developer.signalwire.com/apis/docs/buying-a-phone-number)

## Configure SignalWire Phone Number to Forward Calls to a context

Once your account and **inbound phone number** is created, you need to edit the inbound phone number to forward calls to the context used by the Relay Consumer in this example, **speaker**. 

## API Credentials

To run the example a SignalWire Project ID and API Token are required.
[Follow these intructions to create a new API Token.](https://docs.signalwire.com/topics/relay/#relay-documentation-security)

## Running the consumer
1. Clone this repository and navigate to this folder.
```bash
git clone https://github.com/signalwire/signalwire-relay-examples.git
cd signalwire-relay-examples/node/remote-announcements
```
2. Create a file `.env` with your credentials and the verified phone number.
```
SIGNALWIRE_PROJECT_KEY=<Your project id>
SIGNALWIRE_TOKEN=<Your api token>
```
3. Install the node modules.
```bash
npm install
``` 
4. Run the example.
```bash
npm start
```