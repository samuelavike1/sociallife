import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputError from "@/Components/InputError.jsx";
import React, {useEffect, useState} from "react";
import ParentLayout from "@/Layouts/ParentLayout.jsx";


const Index = ({ auth, posts }) => {
    const { data, setData, post, processing, errors, reset} = useForm({
        content: '',
        image: '',
        tag: '',
    });


      const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'));
        reset();
    };

    return (
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Posts</h2>}
            >
                <Head title="Posts"/>

                <div className="py-2">
                    {/*<div className="max-w-4xl mx-auto sm:px-6 lg:px-8">*/}
                    {/*    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">*/}
                            {/*<pre>{JSON.stringify(posts,undefined,2)}</pre>*/}

                            <form className="flex items-center max-w-lg mx-auto">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <div className="relative w-full">

                                    <input type="text" id="search"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Search..." required/>
                                </div>
                                <button type="submit"
                                        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                         fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    Search
                                </button>
                            </form>


                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div className="py-2">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            {/*<pre>{JSON.stringify(posts,undefined,2)}</pre>*/}

                            <form onSubmit={submit}>
                                <div
                                    className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                        <label htmlFor="comment" className="sr-only">Post</label>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            value={data.content}
                                            rows="3"
                                            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                            placeholder="What is in your mind......"
                                            onChange={(e) => setData('content', e.target.value)}
                                            required
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
                                        <button
                                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {posts.data.map((post) => (

                    <div className="py-2">
                        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 flex space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-6 w-6 text-gray-600 -scale-x-100 dark:text-gray-100"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                    </svg>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <span
                                                    className="text-gray-800 dark:text-gray-100">{post.user.name}</span>
                                                <small
                                                    className="ml-2 text-sm text-gray-600 dark:text-gray-100">{post.updated_at}</small>
                                                {post.created_at !== post.updated_at && <small className="text-sm
                                                 text-gray-600"> &middot; edited</small>}
                                            </div>


                                        </div>
                                        <Link href={route('posts.show', post.id)}>
                                            { post.image && (
                                                <div className='mb-2'>
                                                    <img
                                                        src={post.image}
                                                        alt="Image" className="mb-4 w-full h-auto rounded"/>
                                                </div>
                                            )}

                                            <div className='mb-4'>
                                                <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
                                            </div>
                                        </Link>
                                        <div>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd"
                                                      d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                      clip-rule="evenodd"/>
                                            </svg>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </AuthenticatedLayout>
    );
}
Index.layout = (page) => <ParentLayout children={page}/>
export default Index;
