import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { prisma } from "../lib/prisma";

interface Posts {
  posts: {
    title: string;
    content: string;
    image: string;
  }[];
}

interface FormValues {
  title: string;
  content: string;
  image: string;
}

const Home = ({ posts }: Posts) => {
  const [form, setForm] = useState<FormValues>({
    title: "",
    content: "",
    image: "",
  });

  async function create(values: FormValues) {
    try {
      fetch("http://localhost:3000/api/create", {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => setForm({ title: "", content: "", image: "" }));
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (values: FormValues) => {
    try {
      create(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full flex justify-center items-center min-h-screen">
        <div>
          <h1 className="text-center text-2xl font-bold">Post Anything</h1>
          <form
            onSubmit={(e) => {
              handleSubmit(form);
              e.preventDefault();
            }}
            className="my-10"
          >
            <div className="flex flex-col my-4 gap-y-3">
              <label>Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Write title here..."
                className="border-gray-400 border pl-2 rounded-md py-2 outline-none"
              />
            </div>
            <div className="flex flex-col my-4 gap-y-3">
              <label>Content</label>
              <input
                type="text"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write content here..."
                className="border-gray-400 border pl-2 rounded-md  py-2 outline-none"
              />
            </div>
            <div className="flex flex-col my-4 gap-y-3">
              <label>Image</label>
              <input
                type="file"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="border-gray-400 border p-5 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md border bg-blue-400"
            >
              Submit
            </button>
          </form>

          <div>
            <ul>
              {posts.map((post, index) => (
                <li key={index}>
                  <div>
                    {post.title}
                    {post.content}
                    <img src={post.image} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      image: true,
    },
  });

  return {
    props: {
      posts,
    },
  };
};
