import React, { useState } from 'react';
import { firestore } from '../config/firebase';
import firebase from '../config/firebase';

const CreatePost = ({user}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    firestore.collection("blog").add({
      title: title,
      content: content,
      createdBy: user.uid,
      authorEmail: user.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTitle('');
    setContent('');

    setNotification('A Blog post was created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  return (
    <div className="flex items-center justify-center mt-3 bg-gray-50 py-4 px-6 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add a Blog Post
          </h2>
          {notification}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="post-title" className="sr-only">
                Post Title
              </label>
              <input
                id="post-title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Post title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Post Content
              </label>
              <div className="mt-1">
                <textarea
                  id="post-content"
                  name="content"
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Your blog content here ... "
                  defaultValue={""}
                  onChange={({ target }) => setContent(target.value)}
                />
              </div>
            </div>
          </div>
          <button
            className="text-white bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-xl my-2 shadow-md focus:outline-none"
            type="subit"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
