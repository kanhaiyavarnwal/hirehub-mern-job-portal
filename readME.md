HireHub — MERN Job Portal

A full-stack job portal built using the MERN stack that connects job seekers with job opportunities. The application includes user authentication, job listings, job applications, resume uploads, and an admin panel for managing job postings.

🚀 Features

👤 User Features

User registration and login.

OTP-based email verification during signup.

Browse available job opportunities.

View job descriptions and requirements.

Apply for jobs by submitting applicant details.

Upload resumes using Cloudinary.

JWT-based authentication.

🔐 Admin Features

Secure admin login.

Create and publish job postings.

View available job listings.

Delete job postings.

Manage job-related information through an admin dashboard.

⚙️ Backend Features

RESTful API development using Express.js.

MongoDB database integration with Mongoose.

JWT authentication and protected routes.

Resume upload using Multer and Cloudinary.

Environment-based configuration.

Input validation and error handling.

🛠️ Technologies Used

Technology Purpose

React.js --> Frontend UI

Tailwind CSS --> Responsive styling

React Router DOM --> Client-side routing

Axios API --> requests

Node.js --> Backend runtime

Express.js --> REST API development

MongoDB --> Database

Mongoose --> Database modeling

JWT --> Authentication

Nodemailer --> OTP email delivery

Multer --> File upload handling

Cloudinary --> Resume storage

Git and GitHub --> Version control

📁 Project Structure

HireHub/
├── admin/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md



📋 Prerequisites

Install the following before running the project:

Node.js and npm

MongoDB local installation or a MongoDB Atlas account

Cloudinary account

Git

⚙️ Setup and Installation

1. Clone the repository

git clone https://github.com/kanhaiyavarnwal/hirehub-mern-job-portal


cd HireHub

2. Install backend dependencies


cd backend


npm install

Create a .env file inside the backend directory:


PORT=4000
MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_secure_random_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password


Use the exact environment variable names expected by your backend code. Configure the email variables only if your OTP implementation uses them.

3. Run the backend

   npm run dev

 If the dev script is not configured, check package.json and use the appropriate start command.

The backend will typically run at:

http://localhost:4000


4. Install frontend dependencies

  Open another terminal:

  cd frontend


  
  npm install

Create the frontend .env file if your application uses Vite:


 VITE_BACKEND_URL=http://localhost:4000


 Ensure the variable name matches the one used in your frontend code.

 5. Run the frontend

 npm run dev


 Open the local URL printed in your terminal, commonly:

 http://localhost:5173

6. Run the admin panel

Open another terminal:

cd admin


npm install

Create the frontend .env file if your application uses Vite:

VITE_BACKEND_URL=http://localhost:4000


npm run dev

Configure the admin frontend's backend URL using the environment variable expected by that application.

🔑 Configuration Notes

Configure MongoDB before starting the backend.

Add valid Cloudinary credentials to enable resume uploads.

Configure an email provider and app password if OTP email verification is enabled.

Ensure the frontend and admin panel point to the correct backend URL.

Never commit .env files or production secrets to GitHub.

🤖 AI Development Tool

AI Development Experience

During development, I used the selected AI development tool as a coding assistant to accelerate implementation, investigate errors, and improve the structure of the HireHub application.

I reviewed and tested the generated suggestions, adapted the code to my project requirements, and debugged issues encountered during frontend and backend integration. I used the tool to support development while maintaining an understanding of the application logic and implementation decisions.

Specific AI-Assisted Tasks


1. React Component Development — Assisted with structuring the signup, login, job listing,  and admin dashboard interfaces.

2. REST API Development — Assisted with implementing and debugging Express controllers and routes for authentication and job management.

3. MongoDB Integration — Helped investigate schema validation, database queries, and integration issues.

4. Authentication and File Uploads — Assisted with JWT authentication, OTP verification, Multer, and Cloudinary integration.

5. Debugging and Refactoring — Helped identify runtime errors, troubleshoot API integration and CORS issues, and improve code readability.




🔒 Security

Keep API keys and credentials in environment variables.

Validate request data on the backend.

Hash user passwords before storing them.

Verify JWTs on protected routes.

Protect administrative endpoints with appropriate authorization.

Restrict CORS to trusted origins in production.


🎯 Learning Outcomes

This project demonstrates practical experience with:

Full-stack MERN application development.

REST API design and frontend-backend integration.

Authentication and authorization.

MongoDB data modeling.

File uploads and third-party service integration.

Debugging, version control, and AI-assisted development.


👨‍💻 Author

Kanhaiya Varnwal
GitHub : https://github.com/kanhaiyavarnwal


Portofolio: https://varnwalkanhaiya.netlify.app/
