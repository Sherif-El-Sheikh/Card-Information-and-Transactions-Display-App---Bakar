# Task for Junior Front-End Developer Position (React & Shadcn) at Bakar Company

## Introduction
This project is a web-based application designed to display card and transaction information using React and Shadcn/UI components.
>It fetches card details and transactions from an API and presents them in a clean, user-friendly interface.

## Demo
You may watch the following video demo:

[Card%20and%20Transaction%20Demo.mp4](https://github.com/user-attachments/assets/Videos/Card%20and%20Transaction%20Demo)
  you can try the live demo yourself [here]().


## Features

### Card Information Display:
- **Last 4 digits**: Displays the last 4 digits of the card number.
- **Expiry Date**: Shows the expiration date in MM/YY format.
- **CVC**: Displays the CVC code of the card.
- **Card Brand**: Displays the card's brand (e.g., Visa, MasterCard).
- **Card details**: Card Number, CVV, Expiration Date, Card Brand, Card Status, Card Holder Name, Card Type, Card Creation Date, Cardholder Billing Address 
-  Data is fetched from a provided API.

### Transactions Information Table:
- **Amount**: Displays the transaction amount.
- **Currency**: Shows the transaction currency.
- **Cardholder**: Displays the name of the cardholder.
- **Status**: Shows the current status of the transaction.
- **Created**: Displays the creation date of the transaction

- ## Project Structure

The project structure is as follows:

- `src/`: Source code for the application.
  - `assets/`: Static assets.
  - `components/`: Reusable components.
  - `hooks/`: Custom React hooks.
  - `pages/`: Application pages.
  - `types/`: TypeScript interfaces and types.
  - `lib/`: Utility functions.
- `public/`: Static assets.
- `index.html`: Entry point for the application.
- `package.json`: Project metadata and dependencies.

- ## Technologies Used
- **React.js**: JavaScript library for building user interfaces.
- **Shadcn/UI**: UI components for building fast and accessible web apps.
- **Vite**: Fast build tool.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Type-safe superset of JavaScript.
- **Axios**: For making API requests.
- **React-router-dom**: For routing and navigation.
- **Sonner**: For enhanced user notifications and feedback.
- **Lucide-react**: For vector icons in the user interface.
- **React-Helmet-Async**: For managing document head and meta tags for better SEO.
- **Html2canvas**: For rendering HTML content as an image.

  ## Skills and Techniques Covered
  **React Development**: Functional components, hooks (e.g., `useState`, `useEffect`, `useContext`), context API for state management.
- **Routing and Navigation**: Implemented client-side routing using `react-router-dom`.
- **API Integration**: Used `axios` to fetch data from APIs and display it in the app.
- **State Management**: Managed global state using React's Context API.
- **UI/UX Design**: Implemented a user-friendly interface using Shadcn/UI and Tailwind CSS.
- **Error Handling and Notifications**: Implements error handling strategies and user notifications using sonner, enhancing the user interface and experience.
- **SEO Management**: Leveraging react-helmet-async for managing meta tags and improving SEO.
- **Rendering HTML as Images**: Using html2canvas to capture HTML content as images, useful for report generation or user content export.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- A modern web browser

### Installation

To get the application running locally on your machine, follow these steps:

1. Clone the repo

   ```sh
   git clone https://github.com/Sherif-El-Sheikh/Card-Information-and-Transactions-Display-App---Bakar
   ```

2. Change directory

   ```shell
   cd Card-Information-and-Transactions-Display-App---Bakar
   ```

3. Install dependencies

   ```shell
   npm install
   ```

4. Start the development server

   ```shell
   npm run dev
   ```

5. Visit `http://127.0.0.1:5173/` in your browser.

## Acknowledgment

> This task was completed as part of a Junior Front-End Developer position for Bakar Company, where I was provided with an API to integrate into the application.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
