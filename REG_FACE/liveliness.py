import os

model_path = "Anti_Spoofing/resources/detection_model/deploy.prototxt"
if not os.path.exists(model_path):
    print("Model file is missing!")
else:
    print("Model file found.")


# import cv2
# import pickle
# import numpy as np
# import dlib
# import time
# import mediapipe as mp
# from scipy.spatial import distance as dist
# from imutils import face_utils
#
#
# # ============================
# # Liveness Detection Functions
# # ============================
#
# def eye_aspect_ratio(eye):
#     A = dist.euclidean(eye[1], eye[5])
#     B = dist.euclidean(eye[2], eye[4])
#     C = dist.euclidean(eye[0], eye[3])
#     return (A + B) / (2.0 * C)
#
#
# def mouth_aspect_ratio(mouth):
#     A = dist.euclidean(mouth[3], mouth[9])
#     C = dist.euclidean(mouth[0], mouth[6])
#     return A / C
#
#
# def check_liveness(cap, detector, predictor, face_mesh, duration=10):
#     blink_count = 0
#     mouth_count = 0
#     depth_frames = 0
#     start_time = time.time()
#
#     print("⚠️ **Liveness check: Blink and move your mouth quickly!** ⚠️")
#
#     while time.time() - start_time <= duration:
#         ret, frame = cap.read()
#         if not ret:
#             continue
#
#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         faces = detector(gray)
#
#         for face in faces:
#             landmarks = predictor(gray, face)
#             landmarks = face_utils.shape_to_np(landmarks)
#             (lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
#             (rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
#             (mStart, mEnd) = face_utils.FACIAL_LANDMARKS_IDXS["mouth"]
#
#             leftEye = landmarks[lStart:lEnd]
#             rightEye = landmarks[rStart:rEnd]
#             ear = (eye_aspect_ratio(leftEye) + eye_aspect_ratio(rightEye)) / 2.0
#
#             mouth = landmarks[mStart:mEnd]
#             mar = mouth_aspect_ratio(mouth)
#
#             # Very sensitive thresholds
#             if ear < 0.2:
#                 blink_count += 1
#             if mar > 0.50:
#                 mouth_count += 1
#
#             # Depth check with Mediapipe Face Mesh
#             frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#             results = face_mesh.process(frame_rgb)
#             if results.multi_face_landmarks:
#                 depth_frames += 1
#
#         cv2.imshow("Liveness Check", frame)
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break
#
#     print("✅ Liveness stats - Blinks: {}, Mouth Movements: {}, Depth Frames: {}"
#           .format(blink_count, mouth_count, depth_frames))
#
#     # Stricter liveness check
#     if blink_count >= 1 and mouth_count >= 1 and depth_frames >=1:  # 5 depth frames per second
#         print("✅ Liveness Confirmed!")
#         return True
#     else:
#         print("❌ Liveness Not Confirmed! Please try again.")
#         return False
#
#
# # ================================
# # Face Recognition Module Loading
# # ================================
#
# print("Loading face detection model...")
# face_detector = cv2.dnn.readNetFromCaffe("model/deploy.prototxt",
#                                          "model/res10_300x300_ssd_iter_140000.caffemodel")
#
# print("Loading face recognition model...")
# face_recognizer = cv2.dnn.readNetFromTorch("model/openface_nn4.small2.v1.t7")
#
# print("Loading trained recognizer and label encoder...")
# recognizer = pickle.loads(open("recognizer.pickle", "rb").read())
# le = pickle.loads(open("le.pickle", "rb").read())
#
# # =====================================
# # Setup for Liveness Detection (dlib, Mediapipe)
# # =====================================
#
# print("Setting up liveness detection modules...")
# dlib_detector = dlib.get_frontal_face_detector()
# dlib_predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.7)
#
# # =======================
# # Start Video Capture
# # =======================
# cap = cv2.VideoCapture(0)
#
# # ---------------------------
# # Run Liveness Check First
# # ---------------------------
# if check_liveness(cap, dlib_detector, dlib_predictor, face_mesh, duration=3):
#     print("Starting face recognition...")
#     # ---------------------------
#     # Face Recognition Loop
#     # ---------------------------
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             print("Failed to grab frame")
#             break
#
#         (h, w) = frame.shape[:2]
#         image_blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0,
#                                            (300, 300), (104.0, 177.0, 123.0), False, False)
#
#         face_detector.setInput(image_blob)
#         face_detections = face_detector.forward()
#
#         for i in range(0, face_detections.shape[2]):
#             confidence = face_detections[0, 0, i, 2]
#             if confidence > 0.6:
#                 box = face_detections[0, 0, i, 3:7] * np.array([w, h, w, h])
#                 (startX, startY, endX, endY) = box.astype("int")
#
#                 # Validate face coordinates
#                 if startX < 0 or startY < 0 or endX > w or endY > h:
#                     continue
#
#                 face = frame[startY:endY, startX:endX]
#                 if face.shape[0] == 0 or face.shape[1] == 0:
#                     continue
#
#                 face_blob = cv2.dnn.blobFromImage(face, 1.0 / 255, (96, 96),
#                                                   (0, 0, 0), True, False)
#                 face_recognizer.setInput(face_blob)
#                 vec = face_recognizer.forward()
#
#                 preds = recognizer.predict_proba(vec)[0]
#                 max_prob = max(preds)
#                 j = np.argmax(preds)
#
#                 if max_prob >= 0.96:
#                     name = le.classes_[j]
#                 else:
#                     name = "Unknown"
#
#                 text = "{}: {:.2f}%".format(name, max_prob * 100)
#                 cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)
#                 cv2.putText(frame, text, (startX, startY - 10),
#                             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#
#         cv2.namedWindow("Face Recognition", cv2.WINDOW_NORMAL)
#         cv2.imshow("Face Recognition", frame)
#         cv2.resizeWindow("Face Recognition", 800, 600)
#
#         if cv2.waitKey(1) & 0xFF == ord("q"):
#             break
# else:
#     print("Liveness check failed. Exiting system...")
#
# cap.release()
# cv2.destroyAllWindows()

