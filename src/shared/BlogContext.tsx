/* eslint-disable react-refresh/only-export-components */
import { createContext,FC,ReactNode,useContext,useState } from "react";


import { Blog } from "../types";

interface BlogContextType {
    blogs: Blog[];
    addBlog: (blog: Blog) => void;
    updateBlog: (blog: Blog) => void;
    deleteBlog: (id: number) => void;
  }
  
export const BlogContext = createContext<BlogContextType | undefined>(undefined)

export const BlogProvider: FC<{children:ReactNode}> = ({
     children
}) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

  const addBlog = (blog: Blog) => {
    setBlogs([...blogs, blog]);
  };

  const updateBlog = (updatedBlog: Blog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  const deleteBlog = (id: number) =>
    setBlogs(blogs.filter((blog) => blog.id !== id));

  return (
    <BlogContext.Provider value={{blogs,addBlog,updateBlog,deleteBlog}}>
        {children}
    </BlogContext.Provider>
  )
}
export const useBlogs = () => {
    const context = useContext(BlogContext);
    if (!context) {
      throw new Error("useBlogs must be used within a BlogProvider");
    }
    return context;
  };

