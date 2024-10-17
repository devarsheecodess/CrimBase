from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import base64
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB config
client = MongoClient('mongodb://localhost:27017/')
db = client['CrimBase']
faces_collection = db['faces']

# Initialize OpenCV's LBPH face recognizer
recognizer = cv2.face.LBPHFaceRecognizer_create()

# Global mappings for UUID labels to integers
label_to_int = {}
int_to_label = {}

def load_trained_model():
    """Load the trained model and face labels from the database."""
    face_data = []
    labels = []

    if faces_collection.count_documents({}) == 0:
        print("No faces found in the database. Please add face data.")
        return face_data, labels

    for face in faces_collection.find():
        try:
            # Convert the base64 string to image
            nparr = np.frombuffer(base64.b64decode(face['photo'].split(",")[1]), np.uint8)  # Split to handle prefix
            image = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)

            # Append image and label
            face_data.append(image)
            labels.append(face['id'])  # Keep the UUID string
        except Exception as e:
            print(f"Error loading face data: {e}")

    return face_data, labels

def encode_face(input_image):
    """Prepare the input face for recognition."""
    gray_image = cv2.cvtColor(input_image, cv2.COLOR_BGR2GRAY)
    resized_image = cv2.resize(gray_image, (200, 200))
    return resized_image

def train_recognizer(face_data, labels):
    """Train the recognizer with the loaded face data and labels."""
    global label_to_int, int_to_label

    if len(face_data) > 0 and len(labels) > 0:
        # Map UUID string labels to integers
        label_to_int = {label: idx for idx, label in enumerate(labels)}
        int_to_label = {idx: label for label, idx in label_to_int.items()}

        # Convert string labels to integers
        int_labels = [label_to_int[label] for label in labels]

        # Train the recognizer with the mapped integer labels
        recognizer.train(face_data, np.array(int_labels, dtype=np.int32))
        print("Model trained with faces from the database.")
    else:
        print("No face data or labels available for training.")

def decode_base64_and_match_face(encoded_image):
    """Decode the base64 image and match it with trained faces."""
    global int_to_label

    try:
        # Decode the base64 image and ensure proper padding
        padded_encoded_image = encoded_image + '=' * (4 - len(encoded_image) % 4)
        nparr = np.frombuffer(base64.b64decode(padded_encoded_image), np.uint8)
        input_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Prepare the input face
        input_face = encode_face(input_image)

        # Perform recognition on the input face
        label, confidence = recognizer.predict(input_face)

        # Check if a match was found with low confidence
        if confidence < 80:  # Adjust threshold as needed (experiment with this value)
            matched_label = int_to_label.get(label)
            print(f"Match found: {matched_label} with confidence {confidence}")
            return matched_label

    except Exception as e:
        print(f"Error in face matching: {e}")

    return None  # No match found

@app.route('/match-face', methods=['POST'])
def match_face():
    """Endpoint for matching the face from the uploaded image."""
    data = request.get_json()
    if 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400

    # Load trained model once when starting the app
    if not hasattr(app, 'model_trained'):
        face_data, labels = load_trained_model()
        train_recognizer(face_data, labels)
        app.model_trained = True

    # Call the matching logic
    matched_id = decode_base64_and_match_face(data['image'])

    if matched_id is not None:
        return jsonify({'id': matched_id}), 200
    else:
        return jsonify({'error': 'No match found'}), 404

if __name__ == '__main__':
    app.run(debug=True)