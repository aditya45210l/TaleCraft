import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  keys,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  keys:number;
}) => {
  
  return (
    <motion.div
initial={{ x: -50, opacity: 0 }}
whileInView={{ x: 0, opacity: 1 }}
transition={{ delay: keys * 0.1, duration:0.3, ease: "easeIn" }}
viewport={{ once: true, amount: 0.3 }}
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none ",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans truncate font-bold  dark:text-neutral-200 ">
          {title}
        </div>
        <div className="font-sans text-xs font-normal line-clamp-2 text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
