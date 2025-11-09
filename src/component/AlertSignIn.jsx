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
              color="danger"
              variant="light"
              className="transition-all flex items-center justify-center pt-2 pb-2 px-4 text-xs font-semibold hover:scale-105 duration-500"
            >
              Sign In
            </Button>
          </Link>
        }
      />
    </div>
  );
}
