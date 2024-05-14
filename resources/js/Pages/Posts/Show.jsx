import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm} from '@inertiajs/react';
import Dropdown from "@/Components/Dropdown.jsx";
import React, {useEffect, useState} from "react";
import Modal from "@/Components/Modal.jsx";
import ParentLayout from "@/Layouts/ParentLayout.jsx";
import InputError from "@/Components/InputError.jsx";

const ShowPost = ({ auth, posts, comments }) => {
    const { data, setData, post, patch, processing, errors,delete: destroy, reset } = useForm({
        comment: '',
        post_id: '',
        content: posts.content || '',
        image: posts.image || '',
    });
    const [confirmingPostDeletion, setConfirmingPostDeletion] = useState(false);
    const [confirmingPostEdition, setConfirmingPostEdition] = useState(false);

    const confirmPostDeletion = (e) => {
        e.preventDefault();
        setConfirmingPostDeletion(true);
    };
    const confirmPostEdition = (e) => {
        e.preventDefault();
        setConfirmingPostEdition(true);
    };

    const deletePost = (posts) => {
        // e.preventDefault();
        // router.delete(route('posts.destroy',posts.id))
        destroy(route('posts.destroy', posts.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const updatePost = (e) => {
      e.preventDefault();
        patch(route('posts.update', posts.id));
    }

    const closeModal = () => {
        setConfirmingPostDeletion(false);
        setConfirmingPostEdition(false);
        reset();
    };

    const submit_comment = (e) => {
        e.preventDefault();
        setData('post_id', posts.id);
        post(route('comment.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Post</h2>}
        >
            <Head title="Post" />

                    <div className="py-2">
                        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                {/*<pre>{JSON.stringify(posts,undefined,2)}</pre>*/}
                                {/*<pre>{JSON.stringify(comments,undefined,2)}</pre>*/}
                                <div className="p-6 flex space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 -scale-x-100 dark:text-gray-100"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                    </svg>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <span className="text-gray-800 dark:text-gray-100">{posts.user.name}</span>
                                                <small className="ml-2 text-sm text-gray-600 dark:text-gray-100">{posts.updated_at}</small>
                                                { posts.created_at !== posts.updated_at && <small className="text-sm
                                             text-gray-600"> &middot; edited</small>}
                                            </div>
                                            {posts.user.id === auth.user.id &&
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <button>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                 className="h-4 w-4 text-gray-400" viewBox="0 0 20 20"
                                                                 fill="currentColor">
                                                                <path
                                                                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
                                                            </svg>
                                                        </button>
                                                    </Dropdown.Trigger>
                                                    <Dropdown.Content>
                                                        <Dropdown.Link as="button" method="put" onClick={confirmPostEdition}>
                                                            Edit
                                                        </Dropdown.Link>
                                                        <Dropdown.Link as="button" onClick={confirmPostDeletion}>
                                                            Delete
                                                        </Dropdown.Link>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            }

                                        </div>
                                        { posts.image && (
                                            <div className='mb-2'>
                                                <img
                                                    src={posts.image}
                                                    alt="Image" className="mb-4 w-full h-auto rounded"/>
                                            </div>
                                        )}
                                        <div className='mb-4'>
                                            <p className="text-gray-800 dark:text-gray-200">{posts.content}</p>
                                        </div>
                                        <div className='mb-10'>

                                            <form onSubmit={submit_comment}>
                                                <label htmlFor="chat" className="sr-only">Your comment</label>
                                                <div
                                                    className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                value={data.comment}
                                                rows="1"
                                                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Comment..."
                                                onChange={(e) => setData('comment', e.target.value)}
                                            ></textarea>
                                                    <button type="submit"
                                                            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                                        <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true"
                                                             xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                             viewBox="0 0 18 20">
                                                            <path
                                                                d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                                                        </svg>

                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                        {comments.data.map((comment) => (
                                            <div className='mb-4'>
                                                <div className="w-full max-w-3xl mx-auto">
                                                    <div
                                                        className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                                        <div className="relative">
                                                            <div className="md:flex items-center md:space-x-4 mb-3">
                                                                <div
                                                                    className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">

                                                                    <div
                                                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                             width="16"
                                                                             height="16">
                                                                            <path className="fill-slate-300"
                                                                                  d="M14.853 6.861C14.124 10.348 10.66 13 6.5 13c-.102 0-.201-.016-.302-.019C7.233 13.618 8.557 14 10 14c.51 0 1.003-.053 1.476-.143L14.2 15.9a.499.499 0 0 0 .8-.4v-3.515c.631-.712 1-1.566 1-2.485 0-.987-.429-1.897-1.147-2.639Z"/>
                                                                            <path className="fill-slate-500"
                                                                                  d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V11.5a.5.5 0 0 0 .8.4l1.915-1.436c.845.34 1.787.536 2.785.536 3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0Z"/>
                                                                        </svg>
                                                                    </div>

                                                                    <time className="text-sm font-medium text-gray-600  dark:text-gray-100 md:w-28">{comment.created_at}
                                                                    </time>
                                                                </div>

                                                                <div className="text-slate-500 ml-14"><span
                                                                    className="text-slate-900 font-bold dark:text-gray-100">{comment.user.name}</span> commented
                                                                </div>
                                                            </div>

                                                            <div className="bg-white dark:bg-gray-900 dark:text-gray-100 p-4 rounded border border-gray-200 dark:border-gray-700 text-slate-500 shadow ml-14 md:ml-44">
                                                                {comment.comment}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                            <Modal show={confirmingPostDeletion} onClose={closeModal}>

                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 py-12">

                                    <div className="p-4 md:p-5 text-center">
                                        <svg
                                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        <h3 className="mb-10 text-lg font-normal text-gray-500 dark:text-gray-400">
                                            Are you sure you want to delete this post?
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                            onClick={e => deletePost(posts)}
                                            // onClick={route('posts.destroy', posts.id)} method="delete"
                                        >
                                            Yes, I'm sure
                                        </button>
                                        <button
                                            type="button"
                                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            onClick={closeModal}
                                        >
                                            No, cancel
                                        </button>
                                    </div>
                                </div>

                            </Modal>

                            <Modal show={confirmingPostEdition} onClose={closeModal}>
                                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

                                    <div
                                        className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Update Post
                                        </h3>

                                    </div>
                                    <form onSubmit={updatePost}>
                                        <div
                                            className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                <label htmlFor="comment" className="sr-only">Post</label>
                                                <textarea
                                                    id="content"
                                                    name="content"
                                                    value={data.content}
                                                    onChange={(e) => setData('content', e.target.value)}
                                                    rows="8"
                                                    className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                    placeholder="Post something..."
                                                ></textarea>
                                                <InputError message={errors.content} className="mt-2"/>
                                            </div>
                                            <div
                                                className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        id="image-upload"
                                                        name='image'
                                                        accept="image/*"
                                                        onChange={e => setData('image', e.target.files[0])}
                                                    />

                                                    <label htmlFor="image-upload"
                                                           className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                        <svg className="w-4 h-4" aria-hidden="true"
                                                             xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                             viewBox="0 0 20 18">
                                                            <path
                                                                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                                        </svg>
                                                        <span className="sr-only">Upload image</span>
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <button
                                                            className="text-gray-900 dark:text-white bg-primary-700 hover:bg-blue-600 hover:text-white border border-blue-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                        Update product
                                                    </button>
                                                    <Link onClick={closeModal}
                                                            className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                        Cancel
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    </div>


        </AuthenticatedLayout>
    );
}
ShowPost.layout = (page) =>
    <ParentLayout children={page}/>
export default ShowPost;
