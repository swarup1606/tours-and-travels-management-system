# ✈️Tours-and-travels-management-system🌆
Tours and Travels Management System is a web app that streamlines travel operations by managing tour packages, bookings, itineraries, and customer inquiries, enabling efficient planning for travel agencies and tour operators✈️☺️.

### Purpose
The Tours and Travels Management System is designed to simplify the process of booking flight tickets to various destinations across India. This platform exists to provide travelers with a seamless and efficient way to search, book, and manage their travel arrangements, ensuring a hassle-free experience whether for leisure or business. It addresses the growing demand for an integrated travel booking solution that combines flight reservations with comprehensive tour management.

### Features
- **Flight Booking:** Easily search for and book flight tickets to numerous destinations within India.
- **Tour Package Management:** Organize and manage a variety of tour packages that include flights, accommodations, and sightseeing.
- **Booking Management:** Track and manage all bookings, from initial reservation to final confirmation.
- **Itinerary Planning:** Create, update, and view detailed itineraries for each trip.
- **User Authentication:** Secure login and registration system to ensure personalized travel management.
- **Customer Inquiries:** Integrated support system to handle customer queries and provide assistance promptly.

### Target Audience
- **Travel Agencies & Tour Operators:** Professionals seeking an efficient system to manage and streamline travel bookings and tour packages.
- **Individual Travelers:** Users looking for a one-stop platform to book flights, manage itineraries, and organize their travel plans.
- **Corporate Clients:** Organizations needing a robust tool for managing business travel and group bookings.

## Installation / Setup

1. **Clone the Repository:**
   ```bash 
   git clone https://github.com/swarup1606/tours-and-travels-management-system.git
   cd tours-and-travels-management-system
   
2. Install Dependencies: If you're using Node.js, install the necessary packages by running:
   ```bash 
   npm install

3. Environment Setup: Create a .env file in the project root and add your environment variables.
   ```bash
   # Server Configuration
   PORT=3000
   
   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=tours_travels_db

4. Database Setup (MySQL Workbench)
The project uses MySQL for database management.

   - Install MySQL Workbench:
   - Download and install MySQL Workbench if you haven't already.
   
   - Create a Database Schema:
   
   - Open MySQL Workbench and connect to your MySQL server.
   - Create a new schema (database) named tours_travels_db (or any preferred name).
   - Import Database Schema & Data:
   
   - In the project repository, locate the SQL file (e.g., db/schema.sql) which contains the commands to create tables and populate initial data.
   - Open the SQL file in MySQL Workbench.
   - Run the SQL script to set up the database structure and sample data.
   - Update Environment Variables:
   - Ensure your .env file reflects the correct database name, username, and password.

5. Running the Application
   Start your Node.js server by executing:
   ```bash
   node server.js
-    Once the server is running, open your browser and navigate to http://localhost:3000 to view the application.

6. Usage
   - User Authentication:
      Register a new account or log in using existing credentials to access the dashboard.
   
   - Dashboard Navigation:
   - Use the dashboard to:
   
   - View and manage flight bookings.
   - Explore available tour packages.
   - Manage itineraries.
   - Submit and view customer inquiries.

7. Contact Info
- For support or questions, please reach out via:

   - Email: swarupkakade1810@gmail.com
