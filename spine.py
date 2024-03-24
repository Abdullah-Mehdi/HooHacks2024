import cv2
import mediapipe as mp
import numpy as np

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

def calculate_angle(a, b, c):
    """Calculate the angle between three points."""
    a = np.array(a)  # First
    b = np.array(b)  # Mid
    c = np.array(c)  # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle > 180.0:
        angle = 360-angle
        
    return angle

# Start capturing webcam feed
cap = cv2.VideoCapture('WomanFalling.mp4')

# Process the webcam feed frame by frame
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        break
    
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)
    
    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark
        
        # Get coordinates for shoulders and hips
        shoulder_right = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
        shoulder_left = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
        hip_right = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]
        hip_left = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]

        # Get coordinates for knees and hips
        knee_right = [landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y]
        knee_left = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
        hip_right = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]
        hip_left = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]

        
        # Calculate midpoints
        shoulder_mid = np.mean([shoulder_right, shoulder_left], axis=0)
        hip_mid = np.mean([hip_right, hip_left], axis=0)
        
        # Use the neck as the top point for more accuracy
        neck = [landmarks[mp_pose.PoseLandmark.NOSE.value].x, landmarks[mp_pose.PoseLandmark.NOSE.value].y - (shoulder_mid[1] - landmarks[mp_pose.PoseLandmark.NOSE.value].y)]
        
        # Calculate the orientation of the spine
        spine_angle = calculate_angle(shoulder_mid, hip_mid, neck)
        print(f"Spine angle: {spine_angle}")
        
        # Check if knees are higher than hips
        knees_higher_than_hips = (knee_right[1] < hip_right[1]) and (knee_left[1] < hip_left[1])

        # Visualization: Draw the spine
        cv2.line(frame, (int(shoulder_mid[0] * frame.shape[1]), int(shoulder_mid[1] * frame.shape[0])), 
                 (int(hip_mid[0] * frame.shape[1]), int(hip_mid[1] * frame.shape[0])), (255, 0, 0), 2)
        
        if spine_angle > 20 and knees_higher_than_hips:
            fall_detected = True
            print("Womp Womp, Fall detected!")
            
            # Visualization: Draw the spine on the frame where the fall is detected
            cv2.line(frame, (int(shoulder_mid[0] * frame.shape[1]), int(shoulder_mid[1] * frame.shape[0])), 
                    (int(hip_mid[0] * frame.shape[1]), int(hip_mid[1] * frame.shape[0])), (255, 0, 0), 2)
            
            # Display the frame with the detected fall
            cv2.imshow('MediaPipe Pose', frame)
            
            # Wait indefinitely until a key is pressed
            cv2.waitKey(0)
            
            break  # Exit the loop after showing the frame


    # Display the frame
    cv2.imshow('MediaPipe Pose', frame)
    
    if cv2.waitKey(5) & 0xFF == 113:  # ASCII for 'q'
        break

cap.release()
cv2.destroyAllWindows()
