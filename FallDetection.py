import cv2 as cv # Import OpenCV for image processing
import argparse # Import argparse for command line parsing
import logging # Import logging for logging-related functions
import time # Import time for time-related functions
from pprint import pprint # Import pprint for pretty printing
import numpy as np # Import NumPy for numerical processing
import sys # Import sys for system-specific parameters and functions
# Import TfPoseEstimator for pose estimation
from tf_pose.estimator import TfPoseEstimator 
# Import get_graph_path and model_wh from networks for model path and width/height
from tf_pose.networks import get_graph_path, model_wh 
import os # Import os for file handling

logger = logging.getLogger('TfPoseEstimator-WebCam')
logger.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('[%(asctime)s] [%(name)s] [%(levelname)s] %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

fps_time = 0

#
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='tf-pose-estimation realtime webcam')
    parser.add_argument('--camera', type=str, default=0)
    parser.add_argument('--resize', type=str, default='0x0',
                        help='if provided, resize images before they are processed. default=0x0, Recommends : 432x368 or 656x368 or 1312x736 ')
    parser.add_argument('--resize-out-ratio', type=float, default=4.0,
                        help='if provided, resize heatmaps before they are post-processed. default=1.0')

    parser.add_argument('--model', type=str, default='mobilenet_thin', help='cmu / mobilenet_thin')
    parser.add_argument('--show-process', type=bool, default=False,
                        help='for debug purpose, if enabled, speed for inference is dropped.')
    parser.add_argument('--save_video',type=bool,default=False, 
                        help='To write output video. default name file_name_output.avi')
    args = parser.parse_args()

cap = cv.VideoCapture(0) # Open video file or camera

while cap.isOpened(): # While video or camera is open
    ret, frame = cap.read() # Read frame from video or camera
    # Error catching
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break