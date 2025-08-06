# 💪 Workout Planner - MERN Stack Fitness Tracker

A comprehensive full-stack MERN (MongoDB, Express, React, Node.js) application designed to help fitness enthusiasts create, manage, and track their personalized workout plans with secure user authentication and real-time data synchronization.

## 🌟 Features

### 🔐 **Secure Authentication System**
- **JWT-based Authentication**: Secure user sessions with JSON Web Tokens
- **User Registration & Login**: Streamlined sign-up and login experience
- **Protected Routes**: Route-level authentication for secure data access
- **Password Validation**: Strong password requirements for enhanced security

### 🏋️‍♂️ **Comprehensive Workout Management**
- **Create Workouts**: Add exercises with custom details (name, weight, repetitions)
- **Real-time Updates**: Instant UI updates without page refreshes
- **Delete Workouts**: Remove completed or unwanted workout entries
- **Workout History**: View all past workout sessions with timestamps

### 📊 **Advanced Analytics Dashboard**
- **Total Workouts**: Track your workout consistency
- **Total Weight**: Monitor cumulative weight lifted
- **Total Repetitions**: Count all reps performed
- **Average Weight**: Calculate performance averages

### 🎨 **Modern User Interface**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during data operations
- **Error Handling**: Graceful error messages and fallback states
- **Intuitive Navigation**: Clean and user-friendly interface

### 🛡️ **Data Privacy & Security**
- **User-specific Data**: Each user's workouts are completely isolated
- **Secure API Endpoints**: Protected backend routes with authentication
- **Data Validation**: Client and server-side input validation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing for single-page application
- **Date-fns** - Modern JavaScript date utility library
- **Context API** - State management for user authentication and workouts
- **CSS3** - Custom styling with modern design principles

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing library

### Deployment
- **Frontend**: Vercel - Fast and reliable static site hosting
- **Backend**: Render - Cloud platform for web services
- **Database**: MongoDB Atlas - Cloud-hosted MongoDB

## 📸 Application Screenshots

### 🏠 Home Dashboard
*Main workout tracking interface with statistics and recent workouts*

### 🔑 Authentication Pages
*Clean and secure login/signup forms*

### 📝 Workout Form
*Intuitive form for adding new workout entries*

### 📱 Responsive Design
*Optimized experience across all device sizes*

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Irin-27/workout-frontend.git
   cd workout-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_BACKEND_URL=your_backend_url_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Footer.js       # Application footer
│   ├── Navbar.js       # Navigation bar with auth controls
│   ├── WorkoutDetails.js # Individual workout display
│   └── WorkoutForm.js  # Form for adding new workouts
├── context/            # React Context for state management
│   ├── AuthContext.js  # User authentication state
│   └── WorkoutsContext.js # Workout data management
├── hooks/              # Custom React hooks
│   ├── useAuthContext.js # Auth context hook
│   ├── useLogin.js     # Login functionality
│   ├── useLogout.js    # Logout functionality
│   ├── useSignup.js    # User registration
│   └── useWorkoutsContext.js # Workout context hook
├── pages/              # Main application pages
│   ├── Home.js         # Dashboard with workouts and stats
│   ├── Login.js        # User login page
│   └── Signup.js       # User registration page
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and responsive design
```

## 🔧 Key Features Implementation

### State Management
- **Context API**: Centralized state management for authentication and workouts
- **Reducers**: Predictable state updates with action-based patterns
- **Local Storage**: Persistent user sessions across browser sessions

### Error Handling
- **Network Errors**: Graceful handling of connectivity issues
- **Server Hibernation**: Specific handling for backend startup delays
- **Validation Errors**: Real-time form validation feedback
- **Loading States**: Visual indicators during async operations

### Security Features
- **Protected Routes**: Authentication-required pages
- **Token Validation**: JWT token verification on every request
- **Input Sanitization**: Prevention of malicious data entry
- **CORS Configuration**: Cross-origin request security

## 📊 API Integration

### Authentication Endpoints
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User authentication

### Workout Endpoints
- `GET /api/workouts` - Fetch user workouts
- `POST /api/workouts` - Create new workout
- `DELETE /api/workouts/:id` - Delete specific workout

## 🎯 Usage Guide

1. **Sign Up**: Create a new account with email and secure password
2. **Login**: Access your personal workout dashboard
3. **Add Workouts**: Use the form to log exercises with weight and reps
4. **View Progress**: Monitor your statistics and workout history
5. **Manage Data**: Delete unwanted entries and track your fitness journey

## 🐛 Recent Bug Fixes

### State Management Issues ✅
- Fixed white screen problem when adding new workouts
- Resolved state synchronization between components
- Improved real-time UI updates without page refresh

### Authentication Improvements ✅
- Enhanced error handling for backend hibernation
- Better user feedback during login/signup process
- Improved network connectivity error messages

### Performance Optimizations ✅
- Removed React.StrictMode to prevent double effect execution
- Optimized context provider structure
- Added proper loading states and error boundaries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Irin-27** - [GitHub Profile](https://github.com/Irin-27)

## 🚀 Live Demo

- **Frontend**: [Workout Planner App](https://workout-frontend-git-main-irins-projects.vercel.app/)
- **Backend API**: [Workout API](https://workout-51g7.onrender.com)

---

*Built with ❤️ using the MERN stack*





