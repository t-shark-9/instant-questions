import PyPDF2
import json
import re

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    text = ""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def extract_questions(text):
    """Extract individual questions from text"""
    # Split by question numbers (handles various formats)
    questions = []
    
    # Pattern to match question numbers like "1.", "1)", "Q1", etc.
    lines = text.split('\n')
    current_question = ""
    
    for line in lines:
        # Check if line starts with a question number
        if re.match(r'^\s*\d+[\.\)]\s*', line) or re.match(r'^\s*[Qq]\d+', line):
            if current_question.strip():
                questions.append(current_question.strip())
            current_question = line
        else:
            current_question += " " + line
    
    # Add the last question
    if current_question.strip():
        questions.append(current_question.strip())
    
    return questions

def save_to_json(questions, output_path):
    """Save questions to JSON file"""
    data = {
        "questions": [{"id": i+1, "original_text": q} for i, q in enumerate(questions)]
    }
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def save_to_txt(text, output_path):
    """Save raw text to TXT file"""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(text)

if __name__ == "__main__":
    pdf_path = "Chemistry_paper_1__HL.pdf"
    
    # Extract text
    print("Extracting text from PDF...")
    text = extract_text_from_pdf(pdf_path)
    
    # Save raw text
    save_to_txt(text, "extracted_text.txt")
    print("Saved raw text to extracted_text.txt")
    
    # Extract questions
    print("Extracting questions...")
    questions = extract_questions(text)
    
    # Save questions to JSON
    save_to_json(questions, "questions.json")
    print(f"Extracted {len(questions)} questions and saved to questions.json")
    
    print("\nFirst 3 questions:")
    for i, q in enumerate(questions[:3], 1):
        print(f"\n--- Question {i} ---")
        print(q[:200] + "..." if len(q) > 200 else q)
