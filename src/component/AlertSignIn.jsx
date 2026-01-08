import { Alert, Button } from "@heroui/react";

import { Link } from "react-router-dom";
export default function AlertSignIn() {
  return (
    <div className="flex items-center justify-center w-full mt-4 px-2">
      <Alert
        color="danger"
        description="Please sign in to unlock this feature. "
        title="Sign In Required to Continue"
        variant="faded"
        classNames={{
          title: "text-xs font-medium pb-",
          description: "text-xs",
          root: "w-full bg-red-100/20 border-red-300/30",
          icon: "text-red-400 ",
        }}
        endContent={
          <Link to="/login">
            <Button
              size="sm"
              className="btn-primary flex items-center justify-center px-4 py-2 text-xs font-semibold hover:scale-105 duration-500"
            >
              Sign In
            </Button>
          </Link>
        }
      />
    </div>
  );
}
