# The Blog 📝

The Blog is a full-stack blogging web application that allows users to create accounts, publish blog posts, and manage their own content. I developed this project to gain practical experience in full-stack web development and improve my understanding of authentication, database management, and server-side functionality.

## ✨ Features

- **User Registration** – Create an account to get started.
- **User Login** – Log in securely using email and password.
- **Create Blog Posts** – Publish posts with a title, description, and content.
- **View Blog Posts** – Browse blog posts and read individual articles.
- **My Blogs** – View your own published posts.
- **Edit Posts** – Update your existing blog content.
- **Delete Posts** – Delete your own posts.
- **User Profile** – View your account information.
- **Author Information** – Connect posts with their authors.
- **Responsive Design** – A clean interface for a comfortable reading experience.

## 🛠️ Technologies Used

| Technology       Purpose 
|
| Next.js -       Application framework 
| React -         User interface 
| Tailwind CSS -  Styling 
| Auth.js -       User authentication 
| Prisma ORM -    Database access 
| PostgreSQL -    Database 
| Supabase -      Hosted PostgreSQL database 
| Vercel -        Deployment 
| Git & GitHub -  Version control 

## 🚀 Getting Started

Follow these steps to run the project on your local machine.


### 1. Clone the Repository

git clone https://github.com/Smadara/Blog-App.git


### 2. Open the Project Folder

cd Blog-App


### 3. Install Dependencies

npm install


### 4. Set Up Environment Variables

Create a `.env` file in the root directory and add your configuration:

DATABASE_URL="your_postgresql_connection_string"
AUTH_SECRET="your_auth_secret"


Replace the example values with your own database connection string and authentication secret.

**Security note:** Never share your database credentials or commit your `.env` file to GitHub.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

Make sure your database schema and tables are correctly configured before running the application.

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database

The application uses PostgreSQL to store user and blog post information. Prisma ORM handles database operations, including creating, retrieving, updating, and deleting posts.

User authentication allows authors to manage their own blog posts.

## 📚 What I Learned

Developing this project helped me gain hands-on experience with:

- Building applications using the Next.js App Router.
- Implementing user registration and authentication.
- Working with PostgreSQL and Prisma ORM.
- Performing CRUD operations.
- Managing user-specific content.
- Using server actions for application functionality.
- Deploying a web application with Vercel.
- Debugging development and deployment issues.



## 🌐 Live Demo

**Live Website:** https://blog-app-eosin-eta-62.vercel.app

## 👩‍💻 Author

**Shachini Madara**

Software Engineering Undergraduate  
NSBM Green University

- GitHub: https://github.com/Smadara
- LinkedIn: https://www.linkedin.com/in/shachini-madara

---

This project is part of my journey in learning full-stack web development. I plan to continue improving it as I gain more experience and explore new technologies.