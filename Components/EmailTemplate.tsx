import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);

<<<<<<< HEAD
export default EmailTemplate
=======
export default EmailTemplate;
>>>>>>> adadeafd27503ab90701a4ae73a80517c93ace64
