<div align="center">
    <a href="https://www.cam.ac.uk/">
        <img src="https://www.cam.ac.uk/sites/www.cam.ac.uk/files/inner-images/logo.jpg" width="128px" />
    </a>
    <h1>LEXI: Large Language Models Experimental Interface</h1>
    <p>An innovative platform by <a href="https://cambridge-afar.github.io/">Affective Intelligence and Robotics Laboratory (AFAR)</a> of the University of Cambridge for conducting social interaction experiments with bots and Language Learning & Modeling Systems (LLMS).</p>
</div>

## 🌍 Project Overview

This platform is designed to facilitate advanced research in the field of user-bot interactions and LLMS models. It offers a comprehensive environment for conducting, monitoring, and analyzing experiments in this cutting-edge domain.

## 🚀 Quick Start

To set up and start using the project, follow these steps:

### Step 0: Download the following pre-requirements:

Node.JS - <a href="https://nodejs.org/en">https://nodejs.org/en</a><br>
Npm - <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">https://docs.npmjs.com/downloading-and-installing-node-js-and-npm</a><br>
Git - <a href ="https://git-scm.com/downloads">https://git-scm.com/downloads</a>
OpenAI api key - <a href ="https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key">OpenAI api key info</a>

### Step 1: Set Up MongoDB Database

Before setting up the project, you'll need a MongoDB database. You can set this up locally on your machine, or use MongoDB Atlas for a cloud-based solution.

- **Setting up MongoDB Locally:**
  Follow [this guide](https://docs.mongodb.com/manual/installation/) to install MongoDB locally on your system.

- **Setting up MongoDB on Atlas:**
  MongoDB Atlas offers a cloud-based solution. You can set up a free cluster following [this guide](https://docs.atlas.mongodb.com/getting-started/).

  **Make sure you are adding your ip to be white listed**

### Step 2: Clone the Repository

```bash
git clone https://github.com/Tomer-Lavan/Lexi
```

### Step 3: Install Dependencies

- For the client:
  ```bash
  cd client
  npm run setup
  ```

- For the server:
  ```bash
  cd server
  npm run setup
  ```

### Setup Process Details

During the setup process, you'll be guided through a series of prompts to configure your environment:

- `OPENAI_API_KEY`: Enter your OpenAI API key.
- `MONGODB_USER`: Enter the MongoDB username.
- `MONGODB_PASSWORD`: Enter the password for MongoDB.
- `MONGODB_URL`: Provide the MongoDB URL (mongodb+srv://<cluster-name>.mongodb.net).
- `MONGODB_DB_NAME`: Choose a name for your MongoDB database.

Additionally, the setup script will guide you in creating an administrative user for your system. You'll need to provide a username and password for this user.

### Functions of the Setup Script

The setup script automates several important tasks to get your server up and running:

- **Configures Environment Variables**: 
  - It creates a `.env` file containing essential environment variables like your OpenAI API key, MongoDB credentials, and other necessary configurations.
- **Installs Dependencies**: 
  - Executes `npm install` to install all the necessary npm packages that the server requires to function properly.
- **Builds the Project**: 
  - Runs the build process for your TypeScript code, compiling it and preparing your server for execution.
- **Initializes Admin User**: 
  - Creates an admin user within your system using the credentials you provide, facilitating immediate access to admin-level features.

This comprehensive setup ensures that all necessary components are correctly configured, laying the foundation for a smooth and efficient operation of the server.

### Step 4: Running the Project

- For the Client:
    ```bash
    cd client
    npm start
    ```

**client will run on: http://localhost:3000**

- For the Server:
    ```bash
    cd server
    npm run dev
    ``` 
**server will run on: http://localhost:5000**

Encountering difficulties with your local environment setup? Consult our [Troubleshooting Guide](TROUBLESHOOTING.md) for assistance in resolving your issues.

## 🌐 Deployment

Intersted to deploy Lexi? Please read our [Deployment Guide](DEPLOYMENT.md) for information on how to deploy.

## 🛠️ Contributing

Interested in contributing? We value your input and contributions! Please read our [Contributing Guidelines](CONTRIBUTION.md) for information on how to get started.

## 🔗 Useful Links

- [Project Homepage](https://www.cam.ac.uk/)
- [Research Paper](#) (Link to related research papers or articles)

## 📄 License

This project is licensed under the [CC BY-NC-ND 4.0 DEED License](LICENSE.md).

## 📞 Contact

For any inquiries or further information, reach out to us at [gl538@cam.ac.uk](mailto:gl538@cam.ac.uk).

## 👍 Show Your Support

Give a ⭐️ if this project helped you! Your support encourages us tremendously.
