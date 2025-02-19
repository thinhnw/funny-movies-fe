# Introduction

The client-facing web application of [funny-movie-api](https://github.com/thinhnw/funny-movies-api)

The live app can be accessed through: https://app.funnymovies.thinhnw.site

# Prerequisites
- Node 20.16.0

# Installation & Configuration

Clone the repository
```sh
git clone https://github.com/thinhnw/funny-movies-fe.git
cd funny-movies-fe
```

Set the `.env`
```sh
NEXT_PUBLIC_API_URL=http://localhost:3000 #your API URL
NEXT_PUBLIC_WS_URL=ws://localhost:3000 # your WS URL
```

Install the dependencies
```sh
npm install
```

# Running the Application

Run the application
```sh
npm run dev
```

# Usage

1. **Sign Up (New Users)**  
   - Navigate to the "/signup" page.  
   - Enter your email and password to create an account.  
   - Upon successful sign-up, you will be automatically logged in and directed to the Newsfeed.  

2. **Log In (Returning Users)**  
   - Navigate to the "/login" page.  
   - Enter your email and password.  
   - Upon login, you will be taken to the Newsfeed.

3. **Newsfeed Browsing**  
   - The Newsfeed lists all shared videos chronologically, with the newest videos at the top.  
   - Users can click on any video to watch it directly within the app.  
   - Refresh the Newsfeed as needed to view new content.  

4. **Sharing a Video**  
   - Click the "Share a movie" button.  
   - Provide a YouTube video link.
   - Submit the form to share the video.  

5. **Notification System**  
   - When a video is shared by any user, all other users will receive a notification.  

6. **Logging Out**  
   - Users can log out at any time by clicking the "Logout" button

