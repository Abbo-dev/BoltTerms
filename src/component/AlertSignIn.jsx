import { Alert, Button } from "@heroui/react";

import { Link } from "react-router-dom";
export default function AlertSignIn() {
  return (
    <div className="flex items-center justify-center w-full mt-4">
      <Alert
        color="danger"
        description="Please sign in  or log in to unlock this premium feature."
        endContent={
          <Link to="/login">
            <Button color="warning" size="sm" variant="flat">
              Sign Up
            </Button>
          </Link>
        }
        title="Sign In Required to Continue"
        variant="faded"
        withIcon
      />
    </div>
  );
}
