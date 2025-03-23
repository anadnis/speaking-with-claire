from flask import Flask, render_template, jsonify, request, send_file
import os
from gtts import gTTS
import tempfile
from dotenv import load_dotenv
import io


load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_speech', methods=['POST'])
def get_speech():
    try:
        text = request.json.get('text')
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        # Create a BytesIO object to store the audio
        audio_data = io.BytesIO()
        
        # Generate speech using gTTS
        tts = gTTS(text=text, lang='en-uk', slow=False)
        tts.write_to_fp(audio_data)
        
        # Reset the pointer to the beginning of the BytesIO object
        audio_data.seek(0)

        return send_file(
            audio_data,
            mimetype='audio/mp3',
            as_attachment=False
        )

    except Exception as e:
        print("Exception:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/get_exam_part/<int:part>')
def get_exam_part(part):
    return jsonify({'part': part})

if __name__ == '__main__':
    app.run(debug=True) 