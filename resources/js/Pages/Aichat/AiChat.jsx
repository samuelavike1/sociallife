import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import React from "react";

export default function Dashboard({ auth, chats }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        prompt: '',
    });

    const submit_prompt = (e) => {
        e.preventDefault();
        // setData('post_id', posts.id);
        post(route('store-chat'));
        reset('prompt');
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative h-screen overflow-y-scroll">
                            {/*<pre>{JSON.stringify(chats,undefined,2)}</pre>*/}
                            <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                                <div className="text-center">

                                    <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                        Welcome to AI Chat
                                    </h1>
                                    <p className="mt-3 text-gray-600 dark:text-neutral-400">
                                        Your AI-powered copilot for the web
                                    </p>
                                </div>


                                <ul className="mt-16 space-y-5">

                                    <li className="flex gap-x-2 sm:gap-x-4">
                                        <svg className="flex-shrink-0 w-[2.375rem] h-[2.375rem] rounded-full" width="38"
                                             height="38" viewBox="0 0 38 38" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <rect width="38" height="38" rx="6" fill="#2563EB"/>
                                            <path
                                                d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25"
                                                stroke="white" strokeWidth="1.5"/>
                                            <path
                                                d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25"
                                                stroke="white" strokeWidth="1.5"/>
                                            <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"/>
                                        </svg>


                                        <div
                                            className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                                            <h2 className="font-medium text-gray-800 dark:text-white">
                                                How can we help?
                                            </h2>
                                            <div className="space-y-1.5">
                                                <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                                                    You can ask questions like:
                                                </p>
                                            </div>
                                        </div>

                                    </li>
                                    {/*prompt*/}
                                    {chats.map((chat) => (
                                        <>
                                        <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                                            <div className="grow text-end space-y-3">

                                                <div className="inline-block bg-blue-600 rounded-lg p-4 shadow-sm">
                                                    <p className="text-sm text-white">
                                                        {chat.prompt}
                                                    </p>
                                                </div>

                                            </div>

                                            <span
                                                className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                                              <span className="text-sm font-medium text-white leading-none">DM</span>
                                            </span>
                                        </li>

                                            <li className="flex gap-x-2 sm:gap-x-4">
                                           <span
                                               className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-amber-600">
                                              <span className="text-sm font-medium text-white leading-none">Ai</span>
                                            </span>


                                                <div
                                                    className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                                        {chat.prompt}
                                                    </h2>
                                                    <div className="space-y-1.5">
                                                        <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                                                            {chat.response}
                                                        </p>

                                                    </div>
                                                </div>

                                            </li>
                                        </>

                                    ))}
                                </ul>
                            </div>
                            <footer
                                className="max-w-4xl mx-auto sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-neutral-900 dark:border-neutral-700">
                                <form onSubmit={submit_prompt}>
                                    <div className="relative">
                                    <textarea
                                        id="prompt"
                                        name="prompt"
                                        value={data.prompt}
                                        onChange={(e) => setData('prompt', e.target.value)}
                                        className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Ask me anything...">
                                        required
                                    </textarea>

                                        <div
                                            className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white dark:bg-neutral-900">
                                            <div className="flex justify-between items-center">
                                                <div className="flex-grow"></div>
                                                <button
                                                    className="inline-flex flex-shrink-0 justify-center items-center px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    Send
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </form>

                            </footer>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
