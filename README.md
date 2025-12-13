# IB Chemistry AI - Question Generator

A dual-stack application combining Python backend for PDF processing with a modern React frontend for question generation and manipulation.

## 🚀 Features

### PDF Conversion (Python Backend)
- Extracts text from PDF files
- Identifies individual questions automatically
- Saves in both TXT and JSON formats

### Question Manipulation (AI-Powered)
The system generates 5 types of variations for each question:

1. **Rephrased** - Different wording, same meaning
2. **Simplified** - Easier version with basic concepts
3. **Advanced** - More challenging with deeper analysis
4. **Perspective Shift** - Different context or viewpoint
5. **Format Change** - Convert between multiple choice, essay, etc.

### Modern React Frontend
- Built with Vite, TypeScript, React
- Styled with Tailwind CSS and shadcn-ui
- Beautiful, responsive design
- Real-time statistics and export features

## 📦 Setup Instructions

### Backend Setup (Python)

1. **Create and activate virtual environment:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On macOS/Linux
   ```

2. **Install Python Dependencies:**
   ```bash
   pip install PyPDF2 flask flask-cors openai
   ```

3. **Convert PDF to Text:**
   ```bash
   python pdf_to_text.py
   ```

4. **Start the Flask Server:**
   ```bash
   python app.py
   ```
   Server runs on: http://localhost:5000

### Frontend Setup (React)

1. **Install Node Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Frontend runs on: http://localhost:5173 (or check terminal output)

## 🏗️ Project Structure

```
.
├── src/                           # React frontend source
├── public/                        # Static assets
├── Chemistry_paper_1__HL.pdf      # Source PDF
├── pdf_to_text.py                 # PDF extraction script
├── app.py                         # Flask backend API
├── index.html                     # Vite entry point
├── extracted_text.txt             # Raw extracted text
├── questions.json                 # Parsed questions
├── package.json                   # Node dependencies
└── README.md                      # This file
```

## 🔧 Usage Flow

1. Run `pdf_to_text.py` to extract questions from PDF
2. Start Flask backend with `python app.py`
3. Start React frontend with `npm run dev`
4. Open the web interface in your browser
5. Load questions and generate variations
6. Export results as needed

## 🌐 API Endpoints

- `GET /api/questions` - Get all original questions
- `POST /api/generate` - Generate variations for one question
- `POST /api/bulk-generate` - Generate variations for all questions

## 🛠️ Technologies Used

**Backend:**
- Python 3.9+
- Flask
- PyPDF2

**Frontend:**
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 🚀 Deployment

For production deployment, consider:
- Backend: Deploy Flask API to services like Railway, Render, or Heroku
- Frontend: Deploy to Netlify, Vercel, or similar platforms
- Set appropriate CORS headers and environment variables

## 📝 Customization

To add more manipulation strategies, edit the `manipulate_question()` function in `app.py`.

For real AI-powered generation using GPT, configure OpenAI API keys in `.env` file.
