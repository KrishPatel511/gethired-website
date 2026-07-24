import { motion } from "motion/react";
import { fadeUp } from "../animations/motionVariants";

// Blog/insight card (image path comes from en.json)
// Inherits the scroll-stagger trigger from the parent grid via variants.
const BlogCard = ({ post }) => {
  const assetBaseUrl = import.meta.env.VITE_IMAGES;

  return (
    <motion.article variants={fadeUp} className="group cursor-pointer">
      <div className="h-48 rounded-xl overflow-hidden">
        <img
          src={`${assetBaseUrl}${post?.image}`}
          alt={post?.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <span className="inline-block mt-4 bg-lilac text-navy text-xs font-bold px-3 py-1.5 rounded-lg">
        {post?.tag}
      </span>

      <h3 className="mt-3 text-xl sm:text-[22px] leading-snug font-semibold text-navy group-hover:text-primary transition-colors">
        {post?.title}
      </h3>

      <p className="mt-3 text-xs text-slate-400 font-semibold">
        {post?.date} · {post?.readTime}
      </p>
    </motion.article>
  );
};

export default BlogCard;
