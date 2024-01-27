# Deployment
Here we provide options on how to deploy Lexi. Adapt these instructions as necessary to fit your project's specific setup and configuration. The deployment process can vary depending on the particulars of your client and server architecture.

Deploying this project can be done in two different ways depending on your needs. Here's a guide for both methods:

### Method 1: Separate Deployment for Client and Server

This method involves hosting the client and server on different platforms. For instance, deploying the client on Firebase Hosting and the server on a platform like Render.

#### Deploying the Client to Firebase Hosting

1. **Prepare the Client for Deployment**:
   - Ensure your client application is production-ready.
   - Set up `firebase.json` and other necessary configurations.
   - Include a `build` script in your `package.json`.
2. **Deploy**:
   - Follow the instructions in [this guide to Firebase Hosting](https://firebase.google.com/docs/hosting) to deploy your client application.

#### Deploying the Server to Render

1. **Prepare the Server for Deployment**:
   - Confirm that your server has all necessary dependencies and is ready for deployment.
   - Make sure it listens on the `PORT` environment variable provided by Render.
2. **Deploy**:
   - Use [this guide to Render](https://render.com/docs/deploy-node-express-app) for deploying your server application.

#### Configuring Environment Variables

- **Client**:
  - In your client directory, create a `.env.production` file and include the server's address.
- **Server**:
  - Set up the necessary environment variables in the settings of your Render dashboard for the server.

### Method 2: Combined Deployment for Client and Server

This approach involves deploying both the client and server together on the same server, using a platform like Render.

#### Deploying Both Client and Server to Render

1. **Prepare for Deployment**:
   - Adjust your project structure to serve both client and server from the same codebase.
   - Configure the server to serve the client's static files.
2. **Deploy**:
   - Follow [this Render deployment guide](https://render.com/docs/deploy-node-express-app), ensuring your server serves your client application's static files.

#### Configuring Environment Variables

- **Server**:
  - In Render's dashboard, under your application settings, add the necessary environment variables.
- **Client**:
  - If your client application needs to know the server's address, configure it during the build process, or use relative URLs for API calls.

---

As said above make change to this instructions as fit to your project's need.
