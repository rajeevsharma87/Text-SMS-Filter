# Text-SMS-Filter

A Node.js/Express-based API for filtering SMS messages and categorizing them based on their content. This service intelligently classifies incoming text messages into categories like spam/junk, promotional offers, and transactional messages.

## Features

- **Smart SMS Classification**: Automatically categorizes incoming messages
- **Multi-Category Support**: 
  - Junk/Spam detection
  - Promotional offers identification
  - Transactional message recognition
- **iOS Integration**: Dedicated endpoint for iOS clients
- **RESTful API**: Easy-to-use JSON-based API

## Message Categories

### Junk/Spam
Messages containing keywords like:
- lottery
- free gift
- crypto
- congratulations you won
- won

### Promotional Offers
Messages containing keywords like:
- sale
- offer
- coupon
- use code
- good news

### Transactional
Messages containing keywords like:
- otp
- transaction
- bank
- payment
- low bal. alert
- recharge

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
node server.js
```

The server will run on `http://localhost:3000`

## API Endpoints

### Health Check

```
GET /
```

Returns: `Hello from Local Server!`

### iOS Text Filter

```
POST /api/v1/textspam/ios
```

**Request Body:**
```json
{
  "query": {
    "sender": "123456789",
    "message": {
      "text": "Your message content here"
    }
  }
}
```

**Response:**
```json
{
  "action": "allow" | "junk" | "promotion" | "transaction",
  "subAction": null | "promotionalOffers" | "transactionalOthers"
}
```

## Example Requests

### Spam Detection
```bash
curl -X POST http://localhost:3000/api/v1/textspam/ios \
  -H "Content-Type: application/json" \
  -d '{
    "query": {
      "sender": "1234567890",
      "message": {
        "text": "Congratulations you won a free gift!"
      }
    }
  }'
```

Response: `{"action":"junk","subAction":null}`

### Promotional Detection
```bash
curl -X POST http://localhost:3000/api/v1/textspam/ios \
  -H "Content-Type: application/json" \
  -d '{
    "query": {
      "sender": "1234567890",
      "message": {
        "text": "Sale! Use code SAVE20 for 20% off"
      }
    }
  }'
```

Response: `{"action":"promotion","subAction":"promotionalOffers"}`

## Technologies

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **JSON**: Data format

## License

MIT

## Author

Rajeev Sharma
