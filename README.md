## IT DEPARTMENT 2025 RECRUITMENT TAKE HOME ASSESSMENT

### INTRODUCTION

Welcome to the Take-Home Technical Assessment for the PrepaidPlus Merchant Portal project.
This exercise is designed to:

- Evaluate your ability to implement a real-world feature in a production-like environment.
- Test collaboration skills: seeking clarification, managing Git workflow, and structuring maintainable code.
- Provide you with a fair experience that mirrors how our team works day-to-day.

NB:

- The backend APIs for authentication already exist. Your task will be to build the front-end authentication flow that integrates with them.
- You will be compensated for your time at the rate of a freelance junior developer being P220.00 per task completed (P880.00 if all 4 tasks are completed).

### TIMELINE & SUPPORT

- Intro Meeting (Monday Afternoon)
- Kick-off call with senior dev (overview, setup help, Q&A)
- Assessment Duration: 4 Days (Monday – Thursday)
- Be prepared to walk us through your code during the Friday/Saturday session
- You will work independently, but you are encouraged to reach out for clarification via call, email, or WhatsApp.
- Any changes must be committed and pushed to a branch titled with your first name to the designated GitHub repo with appropriate documentation.
- You will be provided a framework7 codebase, postman collection, and a github repo to work with.

### DELIVERABLES

Login Page

- Form with email/username + password.
- Connect to backend login endpoint.
- Handle success (redirect to dashboard) and failure (error messages).

Registration Page

- Form for new merchants.
- Integrate with backend registration endpoint.
- Basic form validation.

Password Reset Flow

- Request password reset (enter email, get reset link).
- Form to set new password.

Session Management

- Store auth tokens securely (store/indexedDB).
- Redirect unauthorized users to login.

 

### EVALUATION CRITERIA

Category | Description

- Code Quality | Clean, readable, modular, and idiomatic code with proper structure.
- Problem Solving & Implementation | Correctness of logic, handling of edge cases, performance, and completeness of the solution.
- Project Structure & Architecture. | Appropriate use of design patterns, separation of concerns, and overall maintainability.
- Documentation & Clarity. | Code comments, README clarity, and setup instructions.
- Ownership & Completeness | Completion of all assigned stories, evidence of going beyond minimum requirements (if any).

### TAKE NOTE

- https://framework7.io/
- We inject repositories into services & usecases
- API collection [assessment.postman_collection.json](assessment.postman_collection.json)
- Testing user with admin rights Email: testing.user@prepaidplus.co.bw, Password: aP+gUFV7ArbEZx+4GfvpaA==:GHfqQIKB0kxvblc4fdQ/jg== (to help during creation of users) NB: this password is already encrypted
- Users can not self register thier accounts but have them created by an admin user who already has admin rights hence credentials above
- For future passwords encryptions which will be required to login use the code below or its equivallant

<pre> ```javascript
    const config = { hashingSecret: "thisIsASecret" };
    const crypto = require("crypto");

    decryptString(encryptedString, secret = config.hashingSecret) {
        if (
            typeof encryptedString === "string" &&
            encryptedString.includes(":")
        ) {
            const [ivBase64, encryptedData] = encryptedString.split(":");
            const iv = Buffer.from(ivBase64, "base64");
            const key = crypto.createHash("sha256").update(secret).digest();

            const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

            let decrypted = decipher.update(encryptedData, "base64", "utf8");
            decrypted += decipher.final("utf8");

            return decrypted;
        } else {
            return false;
        }
    }
``` </pre>
