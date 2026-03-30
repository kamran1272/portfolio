import MonoBlog from "./MonoBlog";
import { insights } from "../../data/siteData";

const Blog = () => {
  return (
    <section className="content max-w-[1300px] mx-auto py-24 px-4" id="blog">
      <div className="text-center mb-16">
        <h2 className="section-title text-3xl md:text-4xl font-semibold mb-4">
          Insights & Approach
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          A few of the areas I care about most when working on websites:
          stronger positioning, better structure, cleaner implementation, and
          more search-friendly foundations.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {insights.map((data) => (
          <MonoBlog data={data} key={data.id} />
        ))}
      </div>
    </section>
  );
};

export default Blog;
