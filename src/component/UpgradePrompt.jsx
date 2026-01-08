import React from "react";
import { Button } from "@heroui/react";

export default function UpgradePrompt({ onUpgrade }) {
  return (
    <div className="fixed bottom-4 right-4 bg-[#374151] p-4 rounded-lg shadow-lg border border-[#2962ea] max-w-sm">
      <h3 className="text-[#e4e6e8] font-bold mb-2">
        Reach the template limit?
      </h3>
      <p className="text-[#828a96] text-sm mb-4">
        Upgrade to Pro for unlimited templates, custom branding, and more
        features!
      </p>
      <Button
        className="btn-primary w-full py-2"
        onPress={onUpgrade}
      >
        Upgrade Now
      </Button>
    </div>
  );
}
