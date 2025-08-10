import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/react";
import Bolt from "./../assets/bolt.svg";
import Balance from "./../assets/balance.svg";
import Edit from "./../assets/edit.svg";

function Why() {
  const features = [
    {
      icon: Bolt,
      title: "Quick Generation",
      description:
        "Generate comprehensive terms and conditions in less than 5 minutes.",
    },
    {
      icon: Balance,
      title: "Legally Compliant",
      description:
        "All documents are created in compliance with the latest legal requirements.",
    },
    {
      icon: Edit,
      title: "Customizable",
      description:
        "Easily customize and update your terms to match your business needs.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10 pt-5 w-full h-full">
      <h1 className="font-bold text-2xl">Why Choose Our T&C Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 mx-auto">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className=" max-h-[200px] max-w-[400px] mx-auto rounded-xl pb-4 bg-[#242d39] 
              hover:border-[#2962ea]/50 transition-all hover:shadow-lg 
              hover:shadow-[#2962ea]/50 hover:cursor-pointer"
          >
            <CardHeader className="pb-0">
              <Image
                src={feature.icon}
                width={25}
                height={25}
                alt={feature.title}
              />
            </CardHeader>
            <CardBody>
              <h1 className="text-[#e4e6e8] text-lg font-bold mb-2">
                {feature.title}
              </h1>
              <p className="text-[#9CA3AF] text-sm md:text-base">
                {feature.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Why;
