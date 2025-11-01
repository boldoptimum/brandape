# BrandApe Export Facilitation Platform

This is a web application for buyers and vendors to connect and facilitate the export of products. Features include user registration, profile management, and a product marketplace with escrow services.

## Project Setup

To run this project locally, you will need a modern web browser and a local development server.

1.  **Prerequisites:**
    *   Node.js and npm (or yarn)
    *   A local web server (like `serve` or VS Code's Live Server)

2.  **Installation:**
    *   Place all the provided project files in a single directory.
    *   This project uses `esbuild` for fast bundling. You can set it up or use a compatible tool like Vite.

3.  **Environment Variables:**
    *   The application requires an API key for services like the Gemini API. This should be stored in an environment variable `process.env.API_KEY`. For local development, you might use a tool like `dotenv`.

4.  **Running the Application:**
    *   Start your local development server in the project's root directory.
    *   Open your web browser and navigate to the local server's address (e.g., `http://localhost:3000`).

## Frontend Testing

This project uses Jest and React Testing Library for component testing.

1.  **Setup:**
    *   Ensure you have the necessary dev dependencies installed:
        ```bash
        npm install --save-dev jest @testing-library/react @testing-library/jest-dom
        ```
    *   Configure Jest in your `package.json` or a `jest.config.js` file.

2.  **Running Tests:**
    *   Tests are located alongside the components they test (e.g., `LoginScreen.test.tsx`).
    *   Run the test suite using the command:
        ```bash
        npm test
        ```

## Deployment to AWS

This static web application can be easily deployed using AWS S3 for hosting and AWS CloudFront as a CDN for performance and SSL.

### Step 1: Build the Application

First, create a production-ready build of the application. This process will bundle all your static assets (HTML, CSS, JS, images) into a `dist` or `build` folder.

```bash
npm run build
```

### Step 2: Configure S3 for Static Website Hosting

1.  **Create an S3 Bucket:**
    *   Go to the AWS S3 console and create a new bucket. The bucket name must be globally unique (e.g., `brandape-webapp-prod`).
    *   Uncheck "Block all public access" during creation, and acknowledge that the bucket will be public.

2.  **Enable Static Website Hosting:**
    *   Select your newly created bucket, go to the **Properties** tab.
    *   Scroll down to **Static website hosting** and click **Edit**.
    *   Enable static website hosting and set the **Index document** to `index.html`.
    *   Save the changes. Note the **Bucket website endpoint** URL.

3.  **Set Bucket Policy:**
    *   Go to the **Permissions** tab of your bucket and edit the **Bucket policy**.
    *   Paste the following JSON policy, replacing `YOUR_BUCKET_NAME` with your actual bucket name. This makes the objects in your bucket publicly readable.
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
            }
        ]
    }
    ```
    *   Save the policy.

4.  **Upload Build Files:**
    *   Go to the **Objects** tab and upload the entire contents of your local `build` folder to the S3 bucket.

### Step 3: Configure CloudFront for CDN

1.  **Create a CloudFront Distribution:**
    *   Go to the AWS CloudFront console and click **Create Distribution**.
    *   For the **Origin domain**, select your S3 bucket from the dropdown list.
    *   Under **Viewer protocol policy**, select **Redirect HTTP to HTTPS**.
    *   In **Settings**, set the **Default root object** to `index.html`.

2.  **Deploy and Test:**
    *   Click **Create Distribution**. The deployment can take several minutes.
    *   Once the status is "Deployed", use the **Distribution domain name** provided by CloudFront to access your web application. It will be faster, more secure, and globally available.
