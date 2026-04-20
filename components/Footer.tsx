"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";
import {
  buttonVariants,
  headingVariants,
  subtextVariants,
  listVariants,
} from "./animations/Animation";

const Footer = () => {
  return (
    <footer className="bg-obsidian  h-auto w-full md:px-10 text-white">
      <section className="grid grid-cols-1 md:grid-cols-3 place-items-start md:place-items-center items-start gap-10 md:gap-0 mt-24 px-6 md:px-0">
        <div className="flex flex-col justify-center items-start gap-2">
          <motion.div
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            {/* <Image
              src="/Logo-White.svg"
              alt="Forge Studios Logo"
              width={50}
              height={40}
            /> */}
          </motion.div>

          <motion.h5
            variants={subtextVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
            className="ds font-semibold text-2xl md:text-3xl text-white tracking-wide mt-2 uppercase"
          >
            Black Horse
          </motion.h5>
          <motion.p
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
            className="sub text-sm md:text-base text-white font-light max-w-md"
          >
            A platform that aggregates corporate fleet demand and supply all in
            one place, making it easy for teams to move around in real time and
            at less cost.
          </motion.p>
        </div>
        <div className="flex flex-col justify-center items-start gap-4">
          <motion.span
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
            className="text-cyan-300 text-sm md:text-base sub font-light"
          >
            Quick Links
          </motion.span>
          <Link href="/" className="text-black">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={1}
              viewport={{ once: true }}
              className=" text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              Home 
            </motion.span>{" "}
          </Link>
          <Link href="#business" className="text-black">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={3}
              viewport={{ once: true }}
              className="text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              Businesses 
            </motion.span>{" "}
          </Link>
          <Link href="#transport-partners" className="text-black">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={5}
              viewport={{ once: true }}
              className="text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              Transport Partners
            </motion.span>{" "}
          </Link>
          <Link href="#pricing-and-billing-page" className="text-black">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={7}
              viewport={{ once: true }}
              className="text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              Pricing & Billing
            </motion.span>{" "}
            {/* <span className="text-xs bg-(--primary-color) p-1 text-black ds tracking-wider rounded-sm">
              Applications Closed
            </span> */}
          </Link>
        </div>
        <div className="flex flex-col justify-center items-start gap-4">
          <motion.span
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
            className="text-cyan-300 text-sm md:text-base sub font-light"
          >
            Get in touch with us
          </motion.span>
          <Link href="" className="text-black">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={1}
              viewport={{ once: true }}
              className=" text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              info@joltride.com
            </motion.span>{" "}
          </Link>
          <Link href="tel:+233509081558" className="text-black">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={3}
              viewport={{ once: true }}
              className=" text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              (+233) 50 908 1558
            </motion.span>{" "}
          </Link>
        </div>
      </section>
      <div className="w-full flex items-center justify-center pb-12 pt-24">
        <hr className="h-0.5 w-full bg-cyan-300 flex items-center justify-center" />
      </div>
      <div className="flex md:flex-row flex-col-reverse gap-5 md:gap-0 justify-between  items-start md:items-center w-full md:px-0 px-6 pb-12">
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true }}
        >
          <span className="text-sm ds text-white font-light transition-colors hover:text-cyan-300 ">
            © {new Date().getFullYear()} Powered by Dimax Digital Ltd.
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4">
          <Link href="" className="text-text-cyan-950 ">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={2}
              viewport={{ once: true }}
              className="text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              <Linkedin size={18} /> 
            </motion.span>{" "}
          </Link>
          <Link href="" className="text-text-cyan-950 ">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={3}
              viewport={{ once: true }}
              className="text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              <Instagram size={18} />
            </motion.span>{" "}
          </Link>
          <Link href="" className="text-text-cyan-950 ">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={4}
              viewport={{ once: true }}
              className="text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              <Twitter size={18} />
            </motion.span>{" "}
          </Link>
          <Link href="" className="text-text-cyan-950 ">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={5}
              viewport={{ once: true }}
              className="text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
              <Facebook size={18} />
            </motion.span>{" "}
          </Link>
          <Link href="" className="text-text-cyan-950 ">
            <motion.span
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={5}
              viewport={{ once: true }}
              className="text-sm ds text-white font-light transition-colors hover:text-cyan-300"
            >
               
            </motion.span>{" "}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
