import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/react";
import { motion } from "framer-motion";
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

  // Animation variants for staggered card appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-20 pt-5 w-full h-full">
      <motion.h1
        className="font-bold text-2xl text-[#e4e6e8]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Why Choose Our T&C Generator
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <Card className="max-h-[200px] max-w-[400px] mx-auto rounded-xl pb-4 bg-[#242d39] border border-transparent hover:border-[#2962ea]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#2962ea]/20 hover:cursor-pointer group">
              <CardHeader className="pb-0">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={feature.icon}
                    width={28}
                    height={28}
                    alt={feature.title}
                  />
                </motion.div>
              </CardHeader>
              <CardBody>
                <motion.h1 className="text-[#e4e6e8] text-lg font-bold mb-2 group-hover:text-[#2962ea] transition-colors duration-300">
                  {feature.title}
                </motion.h1>
                <p className="text-[#9CA3AF] sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Why;
