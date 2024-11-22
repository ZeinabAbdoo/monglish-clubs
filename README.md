# Monglish Clubs - Project Roadmap and To-Do List

## 1. *Frontend Design*
The frontend of the Monglish Clubs website should be designed to have a responsive, user-friendly experience with support for both Arabic and English languages.

### 1.1 *Landing Page*
The landing page should feature a clean, engaging layout. The design includes the following sections:
- *Header*: Navigation bar with language switcher, logo, and key links.
- *Hero Section*: A visually striking introduction to the clubs and offerings.
- *Clubs Section*: Display different clubs and their descriptions.
- *Session Section*: Show details of current and upcoming sessions.
- *Footer*: Include contact information, social media links, and other resources.
- *Responsive Design*: Ensure that the page works well on both desktop and mobile views.
- *Languages*: The page should be available in both Arabic and English, with the ability to switch between them seamlessly.

*Tasks:*
- [ ] Design header with navigation, language switcher, and logo.
- [ ] Create hero section with visually appealing imagery and text.
- [ ] Design clubs section with cards or grid view.
- [ ] Develop session section with upcoming event details.
- [ ] Design footer with contact info and social media links.
- [ ] Implement responsive design for desktop and mobile views.
- [ ] Implement Arabic and English language support.

### 1.2 *Cart*
The cart system should allow users to easily view and manage their selected items, along with registration options.

*Tasks:*
- [ ] Design cart view with the following elements:
  - WhatsApp button for instant inquiries.
  - Display cart items with clear descriptions and prices.
  - Popup to register student data when checking out.
- [ ] Ensure the design works in both Arabic and English versions.
- [ ] Make the cart responsive for both desktop and mobile views.

---

## 2. *Frontend Connection*
Frontend functionality needs to be connected to the backend for the following:

### 2.1 *For Card Items*
Ensure the frontend can dynamically display the card items (e.g., clubs, sessions, etc.).

*Tasks:*
- [ ] Set up card item display functionality.
- [ ] Fetch card item data from the backend.
- [ ] Ensure responsive display of cards on both mobile and desktop.

### 2.2 *Student Data*
Capture student data when a user registers for a session.

*Tasks:*
- [ ] Set up student registration form.
- [ ] Connect form to backend to store student data.
- [ ] Ensure data is stored correctly for later use and display in the dashboard.

---

## 3. *Backend Logic*
The backend should handle data management, including club details and student registration.

### 3.1 *Add Clubs Table*
A database table is required to store details about each club.

*Tasks:*
- [ ] Design and implement the *clubs table* with fields like name, description, session details, price, etc.
- [ ] Ensure proper relationships are set up if clubs are related to sessions or other entities.

### 3.2 *Create Clubs Controller*
A controller is needed to handle CRUD operations for clubs (Create, Read, Update, Delete).

*Tasks:*
- [ ] Develop the *Clubs Controller* with the necessary methods to manage clubs:
  - Create a club.
  - Fetch all clubs.
  - Update a club.
  - Delete a club.

### 3.3 *Create Table for Student Data*
A table to store the data of students who register for clubs.

*Tasks:*
- [ ] Create the *student data table* with necessary fields such as name, contact information, selected club(s), payment status, etc.
- [ ] Ensure the table can handle multiple registrations for the same student if needed.

### 3.4 *Show Student Data in Dashboard*
A dashboard for administrators to view student registrations and their orders.

*Tasks:*
- [ ] Create a dashboard view that lists student registrations and the clubs they’ve signed up for.
- [ ] Implement filtering and sorting options in the dashboard for ease of use.
- [ ] Display any other necessary data, such as payment status, session details, etc.