# AI Question Generator

This system converts PDF files to text and generates manipulated question variations.

## Setup Instructions

1. **Install Dependencies** (Already done ✓)
   ```bash
   pip install PyPDF2 flask flask-cors openai
   ```

2. **Convert PDF to Text**
   ```bash
   "/Users/tjarkschool/Desktop/instant question/.venv/bin/python" pdf_to_text.py
   ```
   This will:
   - Extract text from `Chemistry_paper_1__HL.pdf`
   - Save raw text to `extracted_text.txt`
   - Parse questions and save to `questions.json`

3. **Start the Flask Server**
   ```bash
   "/Users/tjarkschool/Desktop/instant question/.venv/bin/python" app.py
   ```
   Server runs on: http://localhost:5000

4. **Open the Web Interface**
   - Open `index.html` in your browser, or
   - Visit: http://localhost:5000

## Features

### PDF Conversion
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

### Web Interface Features
- Load and display all questions
- Generate variations for individual questions
- Bulk generate for all questions at once
- Export results to JSON or TXT
- Beautiful, responsive design
- Real-time statistics

## File Structure

```
.
├── Chemistry_paper_1__HL.pdf      # Source PDF
├── pdf_to_text.py                 # PDF extraction script
├── app.py                         # Flask backend server
├── index.html                     # Web interface
├── extracted_text.txt             # Raw extracted text
├── questions.json                 # Parsed questions
└── README.md                      # This file
```

## Usage Flow

1. Run `pdf_to_text.py` to extract questions from PDF
2. Start `app.py` to launch the backend server
3. Open the web interface in your browser
4. Click "Load Questions" to see all questions
5. Click "Generate All Variations" to create manipulated versions
6. Export results as needed

## API Endpoints

- `GET /api/questions` - Get all original questions
- `POST /api/generate` - Generate variations for one question
- `POST /api/bulk-generate` - Generate variations for all questions

## Customization

To add more manipulation strategies, edit the `manipulate_question()` function in `app.py`.

For real AI-powered generation using GPT, uncomment and configure the OpenAI integration.
