import Link from "next/link";
import posts from "../posts.json";

const Blog = () => (
  <div>
    <h1>Blog </h1>

    <ul>
      {Object.entries(posts).map((value, index) => {
        return (
          <li key={index}>
            <Link href="/blog/[id]" as={"/blog/" + value[0]}>
              <p>{value[1].title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default Blog;
