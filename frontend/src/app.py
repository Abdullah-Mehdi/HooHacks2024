from flask import Flask, Response, jsonify, stream_with_context
from flask_cors import CORS
import cv2
import numpy as np
import mediapipe as mp
import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

account_sid = os.getenv('SID')
auth_token = os.getenv('TOKEN')
client = Client(account_sid, auth_token)

app = Flask(__name__)
CORS(app)

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_draw = mp.solutions.drawing_utils
 
# Global variable to indicate fall detection status
fall_detection_status = False

def webcam():
    global fall_detection_status
    camera = cv2.VideoCapture(0)

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while True:
            success, frame = camera.read()
            if not success:
                break

            # Convert the frame color to RGB
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(frame_rgb)

            # Draw the pose annotation on the frame.
            mp_draw.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

            if results.pose_landmarks:
                landmarks = results.pose_landmarks.landmark
                fall_detection_status = fall_detected(landmarks, mp_pose)

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        camera.release()

@app.route('/webcam')
def webcam_display():
    return Response(stream_with_context(webcam()), mimetype='multipart/x-mixed-replace; boundary=frame')

def calculate_angle(a, b, c):
    # Calculate the angle between three points.
    a = np.array(a)  # First
    b = np.array(b)  # Mid
    c = np.array(c)  # End

    # Calculate the angle between the three points using the arctan2 function
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle > 180.0:
        angle = 360-angle
        
    return angle

# Existing fall_detected function goes here
def fall_detected(landmarks, mp_pose):
    # Extracting necessary landmarks
    nose = landmarks[mp_pose.PoseLandmark.NOSE.value]
    shoulder_right = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
    shoulder_left = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    hip_right = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]
    hip_left = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]

    # Calculating midpoints
    shoulder_mid = np.mean([shoulder_right, shoulder_left], axis=0)
    hip_mid = np.mean([hip_right, hip_left], axis=0)
    
    # Estimating the neck position for better accuracy
    neck = [nose.x, nose.y - (shoulder_mid[1] - nose.y)]

    # Calculating the spine angle
    spine_angle = calculate_angle(shoulder_mid, hip_mid, neck)
    

    # Fall detection logic
    if spine_angle > 20 or nose.y > shoulder_mid[1]:
        print(fall_detected)

        return True  # Fall detected
        
    return False  # No fall detected

def send_alert_call():
    call = client.calls.create(
        twiml='<Response><Say>Hello! This phone call is to alert you that your registered loved one has fallen! Bye bye!</Say></Response>',
        to='+15712610995',
        from_='+16174315765'
    )
    print(call.sid)

@app.route('/trigger-call', methods=['POST'])
def trigger_call():
    send_alert_call()
    return jsonify({'message': 'Call triggered successfully'})

@app.route('/fall-detected')
def check_fall_detected():
    global fall_detection_status
    return jsonify({'fallDetected': fall_detection_status})

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
