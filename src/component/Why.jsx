import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button, Image } from "@heroui/react";
import Bolt from "./../assets/bolt.svg";
import Balance from "./../assets/balance.svg";
import Edit from "./../assets/edit.svg";
function Why() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 mt-10 pt-5 w-full h-full ">
        <h1 className="font-bold text-2xl">Why Choose Our T&C Generator</h1>
        <div className="grid grid-cols-1 md:grid-cols-3   gap-4 p-5">
          {/* First Card */}
          <Card className=" max-w-xs max-h-[200px] mx-auto rounded-xl pb-4 bg-[#242d39] md:max-w-[300px] hover:border-[#2962ea]/50 transition-all hover:shadow-lg hover:shadow-[#2962ea]/50 hover:cursor-pointer ">
            <CardHeader className="pb-0">
              <Image src={Bolt} width={25} height={25} alt="bolt image" />
            </CardHeader>
            <CardBody>
              <h1
                className="text-[#e4e6e8] text-lg font-bold
              mb-2"
              >
                Quick Generation
              </h1>
              <p className=" text-[#9CA3AF] text-sm">
                Generate comprehensive terms and condition in less than 5
                minutes.
              </p>
            </CardBody>
          </Card>
          {/* Second  Card */}
          <Card className=" max-w-xs max-h-[200px] mx-auto rounded-xl pb-4 bg-[#242d39] hover:border-[#2962ea]/50 transition-all hover:shadow-lg hover:shadow-[#2962ea]/50 hover:cursor-pointer ">
            <CardHeader className="pb-0">
              <Image src={Balance} width={25} height={25} alt="balance image" />
            </CardHeader>
            <CardBody>
              <h1
                className="text-[#e4e6e8] text-lg font-bold
              mb-2"
              >
                Legally Compliant
              </h1>
              <p className=" text-[#9CA3AF] text-sm">
                All documents are created in compliance with the latest legal
                reequiremnts.
              </p>
            </CardBody>
          </Card>
          {/* Third Card */}
          <Card className=" max-w-xs max-h-[200px] mx-auto rounded-xl pb-4 bg-[#242d39] hover:border-[#2962ea]/20 transition-all hover:shadow-lg hover:shadow-[#2962ea]/50 hover:cursor-pointer ">
            <CardHeader className="pb-0">
              <Image src={Edit} width={25} height={25} alt="edit image" />
            </CardHeader>
            <CardBody>
              <h1
                className="text-[#e4e6e8] text-lg font-bold
              mb-2"
              >
                Customizable
              </h1>
              <p className=" text-[#9CA3AF] text-sm">
                Easily customize and update your terms to match your business
                needs.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Why;
