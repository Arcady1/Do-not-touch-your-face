'''
Based on:
https://docs.opencv.org/3.4.2/d7/d8b/tutorial_py_face_detection.html
'''

import numpy as np
import cv2 as cv
import os

DIR_PATH = '/home/grigoriy/envs/face_touch/lib/python3.6/site-packages/cv2/data/'

face_cascade = cv.CascadeClassifier(os.path.join(DIR_PATH,'haarcascade_frontalface_default.xml'))
eye_cascade = cv.CascadeClassifier(os.path.join(DIR_PATH,'haarcascade_eye.xml'))
img = cv.imread('test_image.jpg')

#percent by which the image is resized
scale_percent = 50

#calculate the 50 percent of original dimensions
width = int(img.shape[1] * scale_percent / 100)
height = int(img.shape[0] * scale_percent / 100)

img = cv.resize(img, (width, height))

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

faces = face_cascade.detectMultiScale(gray, 1.3, 5)
for (x,y,w,h) in faces:
    cv.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
    roi_gray = gray[y:y+h, x:x+w]
    roi_color = img[y:y+h, x:x+w]
    eyes = eye_cascade.detectMultiScale(roi_gray)
    for (ex,ey,ew,eh) in eyes:
        cv.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)

cv.imshow('img',img)
cv.waitKey(0)
cv.destroyAllWindows()




