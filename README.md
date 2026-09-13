# overlooop

Local AI integration for social media with Google Sheets and Power Automate support.

## Features

✅ **Local AI Generation** - Uses Ollama for caption and content generation
✅ **Social Media Integration** - Instagram, Facebook, Twitter, LinkedIn
✅ **Google Sheets Sync** - Read/write data directly to Google Sheets
✅ **Power Automate Webhooks** - Integrate with Microsoft Power Automate
✅ **Content Analytics** - Track engagement across platforms

## Installation

```bash
npm install
```

## Setup

1. **Clone `.env.example` to `.env`**
```bash
cp .env.example .env
```

2. **Install Ollama** (for local AI)
```bash
curl https://ollama.ai/install.sh | sh
ollama pull llama2
ollama serve  # Start Ollama server on port 11434
```

3. **Configure Environment Variables**
   - Set up Google Sheets API credentials
   - Add social media API tokens
   - Configure Power Automate webhook URL

4. **Start the server**
```bash
npm run dev
```

## API Endpoints

### AI Generation
- `POST /api/generate-caption` - Generate social media captions
- `POST /api/generate-content` - Generate content
- `POST /api/analyze-text` - Analyze text for sentiment/themes

### Google Sheets
- `POST /api/sheets/append` - Append data to sheet
- `GET /api/sheets/read` - Read sheet data
- `POST /api/sheets/update` - Update sheet row

### Social Media
- `POST /api/social/post` - Create a post
- `POST /api/social/schedule` - Schedule a post
- `GET /api/social/analytics` - Get post analytics

### Power Automate
- `POST /api/webhook/power-automate` - Webhook receiver

## Usage Examples

### Generate Caption
```bash
curl -X POST http://localhost:3000/api/generate-caption \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "coffee shop",
    "tone": "casual",
    "platform": "Instagram",
    "hashtags": "coffee,cafe"
  }'
```

### Post to Social Media
```bash
curl -X POST http://localhost:3000/api/social/post \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "Instagram",
    "content": "Check out our new menu!",
    "caption": "☕ New drinks available now",
    "media": "https://example.com/image.jpg"
  }'
```

### Append to Google Sheets
```bash
curl -X POST http://localhost:3000/api/sheets/append \
  -H "Content-Type: application/json" \
  -d '{
    "sheetName": "Posts",
    "data": {
      "platform": "Instagram",
      "caption": "New post",
      "timestamp": "2024-01-01"
    }
  }'
```

## Power Automate Integration

Create a Flow in Power Automate with an HTTP Webhook pointing to:
```
https://your-domain.com/api/webhook/power-automate
```

Example payload:
```json
{
  "action": "generate",
  "data": {
    "topic": "product launch",
    "tone": "professional",
    "platform": "LinkedIn"
  }
}
```

## Project Structure

```
overloop/
├── src/
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── sheetsController.js
│   │   └── socialMediaController.js
│   └── services/
│       ├── ollamaService.js
│       ├── instagramService.js
│       ├── facebookService.js
│       └── twitterService.js
├── index.js
├── package.json
├── .env.example
└── README.md
```

## License

MIT
