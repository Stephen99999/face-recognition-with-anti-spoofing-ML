import os

model_path = "Anti_Spoofing/resources/detection_model/deploy.prototxt"
if not os.path.exists(model_path):
    print("Model file is missing!")
else:
    print("Model file found.")

