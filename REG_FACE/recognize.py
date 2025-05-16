import os
import cv2
import pickle
import numpy as np
from datetime import datetime
from spoof_test import test
import logging

logging.basicConfig(filename='recognition.log', level=logging.INFO)


def recognize():
    log_dir = "log"
    flagged_dir = os.path.join(log_dir, "flagged")
    unknown_dir = os.path.join(log_dir,"unknown")
    os.makedirs(log_dir, exist_ok=True)
    os.makedirs(flagged_dir, exist_ok=True)
    os.makedirs(unknown_dir,exist_ok=True)


    # Load models
    print("Loading models...")
    face_detector = cv2.dnn.readNetFromCaffe("model/deploy.prototxt", "model/res10_300x300_ssd_iter_140000.caffemodel")
    face_recognizer = cv2.dnn.readNetFromTorch("model/openface_nn4.small2.v1.t7")

    recognizer = pickle.loads(open("recognizer.pickle", "rb").read())
    le = pickle.loads(open("le.pickle", "rb").read())

    # Open webcam
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()

    if not ret:
        print("❌ Failed to grab frame")
        cap.release()
        cv2.destroyAllWindows()
        return {"message": "Error: Failed to grab frame", "username": "unknown"}

    # Anti-spoofing check
    label = test(image=frame, model_dir="resources/anti_spoof_models", device_id=0)

    if label == 1:
        message = "✅ Real face detected"
        print(message)

        THRESHOLD = 0.90
        detected_name = "unknown"

        # Perform recognition once
        (h, w) = frame.shape[:2]
        image_blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0), False,
                                           False)
        face_detector.setInput(image_blob)
        face_detections = face_detector.forward()

        for i in range(face_detections.shape[2]):
            confidence = face_detections[0, 0, i, 2]
            if confidence > 0.6:
                box = face_detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")

                if startX < 0 or startY < 0 or endX > w or endY > h:
                    continue

                face = frame[startY:endY, startX:endX]
                if face.shape[0] == 0 or face.shape[1] == 0:
                    continue

                face_blob = cv2.dnn.blobFromImage(face, 1.0 / 255, (96, 96), (0, 0, 0), True, False)
                face_recognizer.setInput(face_blob)
                vec = face_recognizer.forward()

                preds = recognizer.predict_proba(vec)[0]
                max_prob = max(preds)
                j = np.argmax(preds)

                if max_prob >= THRESHOLD:
                    detected_name = le.classes_[j]
                else:
                    detected_name = "unknown"
                    message = "Failed to authenticate"

                text = f"{detected_name}: {max_prob * 100:.2f}%"
                cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)
                cv2.putText(frame, text, (startX, startY - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                logging.info(f"Recognized: {detected_name} at {timestamp}")

                # Save log image
                if detected_name != "unknown":
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    log_path = os.path.join(log_dir, f"{detected_name}_{timestamp}.jpg")
                    cv2.imwrite(log_path, frame)
                else:
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    log_path = os.path.join(unknown_dir, f"{detected_name}_{timestamp}.jpg")
                    cv2.imwrite(log_path, frame)

                break  # Exit loop after recognizing one user

        cap.release()
        cv2.destroyAllWindows()

        return {"message": message, "username": detected_name}

    else:
        message = "⚠️ Spoofing attempt detected!"
        print(message)

        # Save flagged image
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        flagged_path = os.path.join(flagged_dir, f"flagged_{timestamp}.jpg")
        cv2.imwrite(flagged_path, frame)

        cap.release()
        cv2.destroyAllWindows()

        return {"message": message, "username": "unknown"}

