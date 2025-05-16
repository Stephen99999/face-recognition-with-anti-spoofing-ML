import threading
import time
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import os
import reg
import recognize  # Import your recognize.py module

app = Flask(__name__)
CORS(app)  # Allow React frontend to communicate with Flask

LOG_DIR = "log"
FLAGGED_DIR = os.path.join(LOG_DIR, "flagged")
UNKNOWN_DIR = os.path.join(LOG_DIR, "unknown")

# Ensure directories exist
os.makedirs(LOG_DIR, exist_ok=True)
os.makedirs(FLAGGED_DIR, exist_ok=True)
os.makedirs(UNKNOWN_DIR, exist_ok=True)

# Global variable to track acknowledgment from frontend
frontend_acknowledged = False


@app.route('/api/recognize', methods=['GET'])
def recognize_face():
    global frontend_acknowledged
    frontend_acknowledged = False  # Reset acknowledgment flag

    try:
        result = recognize.recognize()  # Call the recognize function

        if isinstance(result, dict):  # Ensure we are handling a dictionary
            message = result.get("message", "No message")
            detected_name = result.get("username", "unknown")

            if detected_name != "unknown":
                # Send response to frontend
                response = jsonify({"success": True, "username": detected_name, "message": message})

                # Start a background thread to check for acknowledgment
                def wait_for_ack():
                    global frontend_acknowledged
                    timeout = 10  # Maximum wait time (seconds)
                    start_time = time.time()

                    while not frontend_acknowledged:
                        if time.time() - start_time > timeout:
                            print("⚠️ No acknowledgment received from frontend, releasing resources.")
                            break  # Prevent indefinite waiting
                        time.sleep(0.5)

                    print("✅ Frontend acknowledged response. Proceeding with cleanup.")

                threading.Thread(target=wait_for_ack, daemon=True).start()

                return response

            else:
                return jsonify({"success": False, "message": "User not recognized. Try registering."})

        else:
            return jsonify({"success": False, "message": "Unexpected response from recognition system."})

    except Exception as e:
        return jsonify({"success": False, "message": f"Error: {str(e)}"})


# New API to receive acknowledgment from frontend
@app.route('/api/acknowledge', methods=['POST'])
def acknowledge():
    global frontend_acknowledged
    frontend_acknowledged = True  # Mark that frontend received the response
    return jsonify({"success": True, "message": "Acknowledgment received."})


@app.route('/api/register', methods=['POST'])
def register_face():
    try:
        data = request.get_json()
        name = data.get("name")  # Get name from request
        if not name:
            return jsonify({"message": "❌ Error: Name is required!"}), 400
        result = reg.register(name)  # Call register function

        return jsonify({"success": True, "message": result})
    except Exception as e:
        return jsonify({"success": False, "message": f"Error: {str(e)}"})


@app.route('/api/logs', methods=['GET'])
def get_log_images():
    """Returns images in logs and flagged folders, optionally filtered by time range."""
    start = request.args.get("start_time")
    end = request.args.get("end_time")

    def filter_by_time(file_path):
        file_time = os.path.getmtime(file_path)
        return (not start or file_time >= float(start)) and (not end or file_time <= float(end))

    log_images = [
        f for f in os.listdir(LOG_DIR)
        if f.endswith(('.jpg', '.png')) and filter_by_time(os.path.join(LOG_DIR, f))
    ]
    flagged_images = [
        f for f in os.listdir(FLAGGED_DIR)
        if f.endswith(('.jpg', '.png')) and filter_by_time(os.path.join(FLAGGED_DIR, f))
    ]
    unknown_images = [
        f for f in os.listdir(UNKNOWN_DIR)
        if f.endswith(('.jpg', '.png')) and filter_by_time(os.path.join(UNKNOWN_DIR, f))
    ]
    return jsonify({"log": log_images, "flagged": flagged_images, "unknown": unknown_images})


@app.route('/api/logs/<filename>', methods=['GET'])
def get_log_image(filename):
    """Serves image files from the log folder."""
    return send_from_directory(LOG_DIR, filename)


@app.route('/api/logs/unknown/<filename>', methods=['GET'])
def get_unknown_image(filename):
    """image from unknown folder"""
    return send_from_directory(UNKNOWN_DIR, filename)


@app.route('/api/logs/flagged/<filename>', methods=['GET'])
def get_flagged_image(filename):
    """Serves image files from the flagged folder."""
    return send_from_directory(FLAGGED_DIR, filename)
@app.route('/api/delete-image', methods=['POST'])
def delete_image():
    data = request.get_json()
    filename = data.get("filename")
    folder = data.get("folder")  # Expected: "log", "flagged", or "unknown"

    if not filename or not folder:
        return jsonify({"success": False, "message": "Filename and folder required"}), 400

    folder_map = {
        "log": LOG_DIR,
        "flagged": FLAGGED_DIR,
        "unknown": UNKNOWN_DIR
    }

    if folder not in folder_map:
        return jsonify({"success": False, "message": "Invalid folder"}), 400

    filepath = os.path.join(folder_map[folder], filename)

    try:
        if os.path.exists(filepath):
            os.remove(filepath)
            return jsonify({"success": True, "message": f"{filename} deleted successfully."})
        else:
            return jsonify({"success": False, "message": "File does not exist"}), 404
    except Exception as e:
        return jsonify({"success": False, "message": f"Error deleting file: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
