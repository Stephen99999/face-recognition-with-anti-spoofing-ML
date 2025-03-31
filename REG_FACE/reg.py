import subprocess
import cv2
import os
import time


def register(name):
    # Create database directory if it doesn't exist
    database_path = "database"
    os.makedirs(database_path, exist_ok=True)

    # Ask for username
    print("Registration will take a minute please ensure you move head left, right, up and down during the process")
    name = name
    user_path = os.path.join(database_path, name)

    # Create folder for the new user
    os.makedirs(user_path, exist_ok=True)

    # Open webcam
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Error: Could not open webcam.")
        exit()

    print("Initializing camera...")
    time.sleep(2)  # Allow camera to warm up
    print("Capturing face automatically...")

    image_count = 0
    capture_time = 60  # Total duration in seconds
    interval = 0.5  # Capture every 0.5 seconds
    total_images = capture_time / interval  # Expected number of images (40)

    start_time = time.time()

    while image_count < total_images:
        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to capture frame.")
            break

        # Convert to grayscale for better face detection (optional)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Save the image
        image_count += 1
        img_path = os.path.join(user_path, f"{image_count}.jpg")
        cv2.imwrite(img_path, frame)
        print(f"Saved {img_path}")

        # # Display frame
        # cv2.namedWindow("Registration", cv2.WINDOW_NORMAL)
        # cv2.imshow("Registration", frame)
        # cv2.resizeWindow("Registration", 800, 600)

        # Wait for the interval
        time.sleep(interval)

        # Check if 'q' is pressed to quit early
        if cv2.waitKey(1) & 0xFF == ord("q"):
            print("Early exit requested.")
            break

    cap.release()
    cv2.destroyAllWindows()

    print(f"Face registration complete for {name}. Updating the model...")

    # Run training script
    subprocess.run(["python", "C:\\Users\\23470\\FYP\\FYP\\REG_FACE\\training.py"], shell=True)

    print("Training complete. You can now run the recognition script.")
