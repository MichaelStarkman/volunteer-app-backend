# volunteer-app-backend
Express back end for Volunteer app

Volunteer-App

Volunteer-App allows organizations and community coordinators to post available volunteer opportunities in their local neighborhoods. Users are able to post events with the date of the event, # of volunteers needed for the project, location, and the ability to upload a photo from the previous event or their own organizational logo

Tech Stack: MERN
Back-End: MongoDB, Express.js, Node.js
Front-End : React.js


MVP:
A working full-stack application built using MongoDB, Express.js, and Node.js for the back-end and React.js for the front-end
Two models - user/org and events
User login functionality
Be deployed online and accessible to the public via Heroku

User Model:
OrgName/username: string
password: string
events: []
strech: profile photo: img

Events Model:
location: string
Date: date
peopleNeeded: int
description: string
image (org logo or event photo): img
user: string

Stretch Goals:
Commited Model:
username: string
commmited: boolean

social media login availablity 

