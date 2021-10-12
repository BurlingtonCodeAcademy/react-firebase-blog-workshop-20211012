import { useState, useEffect } from 'react';
import Head from 'next/head';
import { firestore, auth } from '../config/firebase';
import CreatePost from '../components/CreatePost';
import Link from 'next/link';

const Home = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  auth
    .onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    })

  useEffect(() => {
    firestore
      .collection('blog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>My React Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">React Firebase Blog</h1>
        {notification}
        {!loggedIn ? (
          <div className="my-2 font-mono text-lg">
            <Link href="/users/register">
              <a className="text-indigo-600">Register</a>
            </Link>{" "}
            |
            <Link href="/users/login">
              <a className="text-indigo-600"> Login</a>
            </Link>
          </div>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
        {loggedIn && <CreatePost user={user}/>}
        <div className="flex flex-col items-center justify-around max-w-4xl m-auto sm:w-full">
          {blogs.map((blog) => (
            <div className="mt-6 mb-6">
              <p key={blog.id}>
                <Link href="/blog/[id]" as={"/blog/" + blog.id}>
                  <a
                    className="p-6 mt-6 border w-96 rounded-xl font-mono text-2xl hover:text-indigo-600 hover:bg-gray-100 underline"
                    itemProp="hello"
                  >
                    {blog.title}
                  </a>
                </Link>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
