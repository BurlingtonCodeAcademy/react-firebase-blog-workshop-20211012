import { firestore } from '../../config/firebase'
import Link from 'next/link'

const Blog = (props) => {

  return (
    <div className="flex flex-col items-start justify-start min-h-0 py-2 px-2">
      <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-5">{props.title}</h2>
      <p className="text-lg font-light text-gray-800">
        {props.content}
      </p>
      <Link href="/">
        <button className="text-white bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-xl my-2 shadow-md focus:outline-none">
          <a>Back</a>
        </button>
      </Link>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  const content = {}
  await firestore
    .collection('blog')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['content'] = result.data().content;
    });

  return {
    props: {
      title: content.title,
      content: content.content,
    }
  }
}

export default Blog
