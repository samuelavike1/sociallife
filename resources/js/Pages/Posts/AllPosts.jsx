import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from "react";
import ParentLayout from "@/Layouts/ParentLayout.jsx";


const AllPosts = ({ auth, posts }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">All-Posts</h2>}
        >
            <Head title="All-Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/*<pre>{JSON.stringify(posts,undefined,2)}</pre>*/}

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Post
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created By
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {posts.data.map((post) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {post.content.trim().length > 30 ? post.content.trim().substring(0, 30) + '...' : post.content}
                                    </th>
                                    <td className="px-6 py-4">
                                        <img src={post.image} alt='image' className="w-10 rounded"/>
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.user.name}
                                    </td>
                                    <td className="px-6 py-4 text-nowrap">
                                        {post.created_at}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {'post.status'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right space-x-4">
                                        <a href="#"
                                           className="font-medium text-amber-600 dark:text-amber-500 hover:underline">View</a>
                                        <a href="#"
                                           className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        <a href="#"
                                           className="font-medium text-red-500 hover:underline">Delete</a>
                                    </td>
                                </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

AllPosts.layout = (page) => <ParentLayout children={page}/>
export default AllPosts;
