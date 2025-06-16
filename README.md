# Xplore Core

The Core Engine Gateway, the central hub of our digital ecosystem, ensures seamless interactions across various microservices like Authentication, Wallet Services, and AI-driven Language Model Processing. It's the architectural linchpin that facilitates data and command flow, boosting our system's efficiency and security. Its modular design not only augments scalability and ease of maintenance but also streamlines the introduction and deployment of innovative features and services.

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Post-Installation Steps](#post-installation-steps)
- [Usage](#usage)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Branching Strategy](#branching-strategy)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## About

At its core, the Core Engine Gateway functions as the cornerstone of our application's architecture, enabling efficient communication among the myriad microservices within our landscape. It excels as the primary facilitator for data and command exchange, underpinning seamless service integration and cooperation.

### Key Responsibilities

- **Gateway Operations**: Serves as the primary conduit for all incoming queries, routing them to the correct microservice for action.
- **Data Management**: Adapts and standardizes data to ensure uniformity and compatibility across our ecosystem.
- **Security Protocols**: Implements stringent security measures for authentication, authorization, and data integrity.
- **Error Management**: Employs comprehensive error-handling, retry mechanisms, and failover strategies to bolster system reliability.
- **System Monitoring**: Integrates advanced monitoring and logging functionalities for enhanced operational insight and troubleshooting.

### Core Principles

- **Modularity**: Employs a compartmentalized architecture for easier scalability, maintenance, and future growth.
- **Performance**: Optimizes for speed and efficiency, utilizing asynchronous operations and caching to improve service delivery.
- **Resilience**: Prioritizes system reliability, incorporating robust design patterns and redundancy to counteract failures.
- **Interoperability**: Ensures seamless third-party service integration by adhering to established standards and protocols.
- **Innovation**: Dedicates to perpetual refinement and advancement, evolving continuously to meet changing needs and leverage new technologies.

## Getting Started

This guide will help you get a local instance of the Core Engine Gateway up and running for development and testing.

### Prerequisites

Before you begin, ensure you have these essential tools installed:

- [Node.js](https://nodejs.org/) - Execution environment
- [NestJS](https://nestjs.com/) - Application framework
- [Docker](https://www.docker.com/) - Container platform

### Installation

Refer to the [Installation](#installation) section to prepare your development environment.

## Post-Installation Steps

Follow these steps to configure and kickstart your application post-installation:

### 1. Environment Setup

#### a. Create a `.env` file at the project's root to house environment-specific variables.

#### b. Populate this file with necessary values from `.env.example`.

#### c. Update placeholders in `.env` with your real configuration data, such as database URLs and API keys.

### 2. Database Initialization

A MongoDB instance is crucial for the application. Set this up locally or connect to a cloud instance:

- **Local MongoDB**: Verify its operation on your machine, pointing your `.env` `DATABASE_URL` to it.
- **Cloud MongoDB**: Update your `.env` `DATABASE_URL` with the provided remote connection string.

### 3. Docker Integration

Using Docker Compose streamlines running the application, especially when managing microservices:

##### 1. Ensure your `docker-compose.yml` outlines all dependent services.

##### 2. Boot up the services with `docker-compose up` in your terminal.

## Usage

Interacting with the Core Engine Gateway involves:

- **Sending Requests**: Direct your HTTP requests to `http://localhost:${PORT}` for routing to the appropriate service.
- **Exploring APIs**: Access the Postman Collection at https://documenter.getpostman.com/view/26592466/2sA3Bn6Xva

## Configuration

System setup revolves around environment variables for ease of configuration. Key points include database settings, authentication parameters, and logging specifics. The `.env.example` file lists all necessary variables.

## Deployment

Deploying the Core Engine Gateway can be achieved through:

- **Docker**: Create a Docker image and launch your service.
- **Kubernetes**: Use Kubernetes for scalable container management.
- **CI/CD**: Automate deployment with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions.

### Detailed API Endpoint Explanation and Sequence

#### User Module

This module is responsible for user registration, authentication, and management through the following sequence of API calls:

- **Send OTP** (`/api/v1/user/send-otp`):  
   Initiates the registration or login process by sending an OTP to the user's provided phone number. This is typically the first step in verifying a user's identity.

- **Verify OTP** (`/api/v1/user/verify-otp`):  
   Confirms the OTP sent to the user. If the phone number is not already associated with an existing user, a new user account is created. If the phone number is recognized, the process moves forward to further user validation or access.

- **User Journey** (`/api/v1/user/journey`):  
   Provides a summary of the user's progress in the app, including selected roles, KYC completion, and MPIN setup. This can be used to guide the user through incomplete steps or provide status updates.

- **Get User Roles** (`/api/v1/user/roles`):  
   Retrieves the roles available to the user within the system. This can include roles such as administrator, standard user, or any custom roles defined in the system.

- **Assign User Role** (`/api/v1/user/role`):  
   Allows for the assignment of roles to a user account. This is a critical API for access control, ensuring users have the correct permissions according to their responsibilities.

- **Update User KYC** (`/api/v1/user/kyc`):  
   Updates the user's KYC (Know Your Customer) information manually. This is typically used in scenarios where the KYC process needs customization or manual intervention.

- **Get User Info** (`/api/v1/user`):  
   Retrieves detailed information about the user, such as user ID, name, email, etc. This endpoint supports functionality across the platform that requires user details.

- **Create MPIN** (`/api/v1/user/create-mpin`):  
   Allows a user to set a personal identification number (MPIN), which can be used for quicker login or authentication within the app.

- **Verify MPIN** (`/api/v1/user/verify-mpin`):  
   Validates the MPIN entered by the user during operations requiring authentication, such as transactions or settings changes.

#### Wallet Module

This module manages the user's digital wallet and virtual credentials (VCs):

- **Get User Wallet** (`/api/v1/wallet`):  
   Retrieves details of the user's wallet, including linked accounts and balance information.

- **Add File to Wallet** (`/api/v1/wallet/file`):  
   Uploads and stores files in the user's wallet, converting them into virtual credentials (VCs) as needed.

- **Get User VCs** (`/api/v1/wallet/vcs`):  
   Fetches a list of all virtual credentials stored in the user's wallet, such as identity documents or certificates.

- **Get Single VC** (`/api/v1/wallet/vc`):  
   Retrieves detailed information about a specific virtual credential.

- **Delete Multiple VCs** (`/api/v1/wallet/vc`):  
   Allows for the deletion of multiple VCs from the user's wallet, helping manage and maintain only relevant credentials.

- **Get Shared VC Requests** (`/api/v1/wallet/vc/shared/requests`):  
   Displays all the VCs that have been shared by the user, providing a history and management interface for shared credentials.

- **Update Shared VC Consent** (`/api/v1/wallet/vc/shared/requests/update`):  
   Updates the consent provided for shared VCs, allowing the user to manage who has access to their credentials.

- **Update Shared VC Status** (`/api/v1/wallet/vc/shared/requests/status`):  
   Modifies the status of shared VCs, such as activating or deactivating access, thus managing the accessibility of shared information.

- **Share Multiple VCs** (`/api/v1/wallet/vc/share`):  
   Allows a user to share multiple VCs at once, providing flexibility and control over what information is shared and with whom.

- **Create User Wallet** (`/api/v1/wallet`):  
   Explicitly creates a wallet for a user, typically used when a user completes KYC but a wallet needs to be set up manually or under specific conditions.

- **Delete User Wallet** (`/api/v1/wallet`):  
   Deletes the user's wallet, useful for managing data privacy or when a user decides to close their account.

#### E-Auth Module

This module interacts with external authentication and KYC providers:

- **Get KYC Providers** (`/api/v1/e-auth/`):  
   Lists all KYC providers integrated with the system, such as DigiLocker or Google OAuth, providing options for user identity verification.

- **Callback for KYC Completion** (`/e-auth/callback`):  
   Acts as a callback endpoint for OAuth or other identity services. Once a user completes the KYC process with an external provider, this endpoint is triggered, allowing the system to update user details, create a wallet, and finalize user onboarding.

![Alt text](assets/core_api_flow.jpg)

### Conclusion

Each module and its respective APIs are designed to handle specific aspects of user management, wallet operations, and external authentication, forming a comprehensive ecosystem for managing user interactions, credentials, and authentication processes efficiently and securely.

## Branching Strategy

To maintain a clear and organized workflow, we use the following branching strategy:

1. **Feature Branches**

   - For new features:
   - Format: `feature/brief-description`
   - Example: `feature/user-authentication`, `feature/shopping-cart`

2. **Bugfix Branches**

   - For fixing bugs:
   - Format: `bugfix/brief-description`
   - Example: `bugfix/login-error`, `bugfix/cart-not-updating`

3. **Hotfix Branches**

   - For urgent fixes that need to be deployed immediately:
   - Format: `hotfix/brief-description`
   - Example: `hotfix/critical-security-patch`, `hotfix/payment-gateway`

4. **Improvement Branches**

   - For improvements or refactoring that aren't new features:
   - Format: `improvement/brief-description`
   - Example: `improvement/code-refactor`, `improvement/ui-enhancements`

5. **Release Branches**

   - For preparing a release:
   - Format: `release/version-number`
   - Example: `release/1.0.0`, `release/2.1.3`

6. **Experiment Branches**

   - For experimental features or spikes:
   - Format: `experiment/brief-description`
   - Example: `experiment/new-ui-concept`, `experiment/performance-tuning`

7. **Chore Branches**
   - For routine tasks such as updating dependencies or documentation:
   - Format: `chore/brief-description`
   - Example: `chore/update-dependencies`, `chore/add-documentation`

## Contributing

Contributions are welcomed! Please follow these steps to contribute:

##### 1. Fork the project.

##### 2. Create your feature branch (`git checkout -b feature/AmazingFeature`).

##### 3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).

##### 4. Push to the branch (`git push origin feature/AmazingFeature`).

##### 5. Open a pull request.

## License

Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for more information.

## Acknowledgments

- Kudos to all contributors and the NestJS community.
- Appreciation for anyone dedicating time to enhance open-source software.
