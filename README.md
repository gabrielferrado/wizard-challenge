# Wizard Challenge

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/gabrielferrado/wizard-challenge/ci.yml?branch=main)](https://github.com/gabrielferrado/wizard-challenge/actions)
[![Coverage Status](https://img.shields.io/badge/coverage-XX%25-brightgreen)](./coverage/index.html)

A Next.js-based onboarding wizard application built to demonstrate a multistep registration flow, admin customization, and data visualization. This project was developed as part of a coding challenge and is fully deployed on Vercel.

## Live Demo

Check out the live demo here: [https://zealthy-wizard-challenge.vercel.app/](https://zealthy-wizard-challenge.vercel.app/)

## Overview

The application is divided into three main sections:

### Section 1 - User Onboarding Section

- **Description:**  
  This is the main page where users can sign up by providing their email and password. After submission, users navigate through a three-step onboarding wizard.
- **Wizard Steps:**
    - **Step 1 (Credentials):**  
      Users enter their email and password.
    - **Step 2 (User Details):**  
      A customizable page (configured via the admin section) where components such as a large text area for "About Me", an address form (street address, city, state, zip), and a birthdate selector can appear.
    - **Step 3 (Additional Details):**  
      Another customizable page to collect additional user data before proceeding further.

### Section 2 - Admin Section

- **Description:**  
  Accessible via the `/admin` URL, this section allows non-technical administrators to configure which data components appear on the 2nd and 3rd pages of the onboarding flow.
- **Features:**  
  Admins can assign components (e.g., Birthdate, About Me, Address) to each page, ensuring that each page has at least one component (and optionally two).

### Section 3 - Data Table

- **Description:**  
  Accessible via the `/data` URL, this section displays an HTML table of all user data that has been persisted to the backend database.
- **Purpose:**  
  It is used for testing and monitoring how the app interacts with the database (no authentication is required).

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **React**: UI library for building components.
- **Prisma**: ORM for interacting with the database.
- **Tailwind CSS**: Utility-first CSS framework.
- **Jest**: Testing framework for unit and integration tests.
- **GitHub Actions**: CI/CD pipeline to run tests and check coverage on each commit.

## Getting Started

### Prerequisites

- Node.js (v18.x recommended)
- npm

### How to run

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/gabrielferrado/wizard-challenge.git
   cd wizard-challenge

2. **Start Prisma**

   ```bash
   npx prisma db push && npx prisma db seed
   
3. **Start Project**

   ```bash
   npm dev
