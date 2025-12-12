from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import random

app = Flask(__name__, static_folder='.')
CORS(app)

# Load questions from JSON
def load_questions():
    try:
        with open('questions.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data.get('questions', [])
    except FileNotFoundError:
        return []

# AI-powered question manipulation strategies
def manipulate_question(question_text):
    """Generate variations of the question by manipulating it"""
    variations = []
    
    # Strategy 1: Rephrase with synonyms
    variations.append({
        "type": "rephrased",
        "question": rephrase_question(question_text),
        "manipulation": "Rephrased with different wording"
    })
    
    # Strategy 2: Change difficulty level
    variations.append({
        "type": "simplified",
        "question": simplify_question(question_text),
        "manipulation": "Simplified version"
    })
    
    variations.append({
        "type": "advanced",
        "question": make_advanced(question_text),
        "manipulation": "More challenging version"
    })
    
    # Strategy 3: Change focus/perspective
    variations.append({
        "type": "perspective_shift",
        "question": shift_perspective(question_text),
        "manipulation": "Different perspective or context"
    })
    
    # Strategy 4: Multiple choice to open-ended or vice versa
    variations.append({
        "type": "format_change",
        "question": change_format(question_text),
        "manipulation": "Different question format"
    })
    
    return variations

def rephrase_question(text):
    """Rephrase the question with different wording"""
    # Simple rule-based rephrasing (in production, use GPT API)
    replacements = {
        "What is": "Define",
        "Explain": "Describe",
        "Calculate": "Determine",
        "Why": "For what reason",
        "How": "In what way",
        "State": "Identify",
        "List": "Enumerate"
    }
    
    result = text
    for old, new in replacements.items():
        if old in result:
            result = result.replace(old, new, 1)
            break
    
    return result if result != text else f"Reworded: {text}"

def simplify_question(text):
    """Create a simpler version"""
    return f"Basic version: {text.split('.')[0] if '.' in text else text[:100]}... (simplified with fundamental concepts)"

def make_advanced(text):
    """Create a more challenging version"""
    return f"{text}\n[Extended]: Now explain the underlying mechanisms and potential exceptions to this principle."

def shift_perspective(text):
    """Change the perspective or context"""
    contexts = [
        "in an industrial setting",
        "at the molecular level",
        "from an environmental perspective",
        "in a real-world application",
        "considering quantum mechanics"
    ]
    return f"{text}\n[Context shift]: Consider this {random.choice(contexts)}."

def change_format(text):
    """Change question format"""
    if "?" in text:
        return f"Multiple choice format: {text}\nA) Option 1\nB) Option 2\nC) Option 3\nD) Option 4"
    else:
        return f"Essay format: Discuss in detail: {text}"

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/questions', methods=['GET'])
def get_questions():
    """Get all original questions"""
    questions = load_questions()
    return jsonify({"success": True, "questions": questions})

@app.route('/api/generate', methods=['POST'])
def generate_variations():
    """Generate variations for a specific question"""
    data = request.json
    question_id = data.get('question_id')
    
    questions = load_questions()
    
    # Find the question
    question = next((q for q in questions if q['id'] == question_id), None)
    
    if not question:
        return jsonify({"success": False, "error": "Question not found"}), 404
    
    # Generate variations
    variations = manipulate_question(question['original_text'])
    
    return jsonify({
        "success": True,
        "original": question,
        "variations": variations
    })

@app.route('/api/bulk-generate', methods=['POST'])
def bulk_generate():
    """Generate variations for all questions"""
    questions = load_questions()
    
    results = []
    for question in questions:
        variations = manipulate_question(question['original_text'])
        results.append({
            "id": question['id'],
            "original": question['original_text'],
            "variations": variations
        })
    
    return jsonify({
        "success": True,
        "total": len(results),
        "results": results
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
