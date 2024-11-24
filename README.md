# Monglish Clubs - Project Roadmap and To-Do List

## 1. _Frontend Design_

The frontend of the Monglish Clubs website should be designed to have a responsive, user-friendly experience with support for both Arabic and English languages.

### 1.1 _Landing Page_

The landing page should feature a clean, engaging layout. The design includes the following sections:

- _Header_: Navigation bar with language switcher, logo, and key links.
- _Hero Section_: A visually striking introduction to the clubs and offerings.
- _Clubs Section_: Display different clubs and their descriptions.
- _Session Section_: Show details of current and upcoming sessions.
- _Footer_: Include contact information, social media links, and other resources.
- _Responsive Design_: Ensure that the page works well on both desktop and mobile views.
- _Languages_: The page should be available in both Arabic and English, with the ability to switch between them seamlessly.

_Tasks:_

- [x] Design header with navigation, language switcher, and logo.
- [x] Create hero section with visually appealing imagery and text.
- [x] Create accrediations section.
- [x] Design clubs section with cards or grid view.
- [x] Develop session section with upcoming event details.
- [x] Design footer with contact info and social media links.
- [x] Implement CTA for smooth scrolling to the ClubsSection.
- [x] Implement responsive design for desktop and mobile views.

### 1.2 _Cart_

The cart system should allow users to easily view and manage their selected items, along with registration options.

_Tasks:_

- [ ] Design cart view with the following elements:
  - WhatsApp button for instant inquiries.
  - Display cart items with clear descriptions and prices.
  - Popup to register student data when checking out.
- [ ] Make the cart responsive for both desktop and mobile views.

---

## 2. _Frontend Connection_

Frontend functionality needs to be connected to the backend for the following:

### 2.1 _For Card Items_

Ensure the frontend can dynamically display the card items (e.g., clubs, sessions, etc.).

_Tasks:_

- [ ] Set up card item display functionality.
- [ ] Fetch card item data from the backend.
- [ ] Ensure responsive display of cards on both mobile and desktop.

### 2.2 _Student Data_

Capture student data when a user registers for a session.

_Tasks:_

- [ ] Set up student registration form.
- [ ] Connect form to backend to store student data.
- [ ] Ensure data is stored correctly for later use and display in the dashboard.

---

## 3. _Backend Logic_

The backend should handle data management, including club details and student registration.

### 3.1 _Add Clubs Table_

A database table is required to store details about each club.

_Tasks:_

- [ ] Design and implement the _clubs table_ with fields like name, description, session details, price, etc.
- [ ] Ensure proper relationships are set up if clubs are related to sessions or other entities.

### 3.2 _Create Clubs Controller_

A controller is needed to handle CRUD operations for clubs (Create, Read, Update, Delete).

_Tasks:_

- [ ] Develop the _Clubs Controller_ with the necessary methods to manage clubs:
  - Create a club.
  - Fetch all clubs.
  - Update a club.
  - Delete a club.

### 3.3 _Create Table for Student Data_

A table to store the data of students who register for clubs.

_Tasks:_

- [ ] Create the _student data table_ with necessary fields such as name, contact information, selected club(s), payment status, etc.
- [ ] Ensure the table can handle multiple registrations for the same student if needed.

### 3.4 _Show Student Data in Dashboard_

A dashboard for administrators to view student registrations and their orders.

_Tasks:_

- [ ] Create a dashboard view that lists student registrations and the clubs they’ve signed up for.
- [ ] Implement filtering and sorting options in the dashboard for ease of use.
- [ ] Display any other necessary data, such as payment status, session details, etc.
