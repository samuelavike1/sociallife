import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, {useState} from "react";
import ParentLayout from "@/Layouts/ParentLayout.jsx";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {InputText} from "primereact/inputtext";

const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image} alt={rowData.image} width="64px" className="shadow-4" />;
};

const trimContent = (rowData) => {
    const maxLength = 30; // Set your desired maximum length
    const trimmedContent = rowData.content.length > maxLength
        ? rowData.content.substring(0, maxLength) + '...' // Trim the post content
        : rowData.content;

    return <span>{trimmedContent}</span>;
};


const AllPosts = ({ auth, posts }) => {

    const [globalFilterValue, setGlobalFilterValue] = useState("");

    const onGlobalFilterChange = (e, any) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
              className="rounded-lg  text-gray-800 dark:text-gray-200 leading-tight"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
          />
        </span>
            </div>
        );
    };

    const header = renderHeader();

    const statusBodyTemplate = (rowData) => {
        return (
            <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rowData.is_active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {rowData.is_active === 1 ? 'Active' : 'Inactive'}
      </span>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">All-Posts</h2>}
        >
            <Head title="All-Posts"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/*<pre>{JSON.stringify(posts,undefined,2)}</pre>*/}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-5 text-gray-900 dark:text-gray-100">
                        <DataTable
                            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            value={posts.data}
                            paginator rows={5}
                            rowsPerPageOptions={[5,10, 25, 50]}
                            tableStyle={{ minWidth: '50rem' }}
                            dataKey="id"
                            filterDisplay="row"
                            globalFilterFields={['content', 'user.name', 'is_active','content']}
                            globalFilter={globalFilterValue}
                            header={header}
                            emptyMessage="No Post found."
                        >
                            <Column  field="id" header="ID" style={{ width: '5%' }}></Column>
                            {/*<Column header="Image" field="image"></Column>*/}
                            <Column header="Image" body={imageBodyTemplate} style={{ width: '5%' }}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            />
                            <Column header="content" body={trimContent}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            ></Column>
                            <Column field="user.name" header="Created By" style={{ width: '10%', textWrap:"nowrap"}}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            ></Column>
                            <Column field="is_active" header="Status" body={statusBodyTemplate}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    style={{ width: '10%', textWrap:"nowrap"}}
                            ></Column>
                            <Column field="created_at" header="Created At" style={{ width: '10%', textWrap:"nowrap" }}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            ></Column>
                            <Column field="updated_at" header="Updated At" style={{ width: '10%', textWrap:"nowrap" }}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            ></Column>

                        </DataTable>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

AllPosts.layout = (page) => <ParentLayout children={page}/>
export default AllPosts;
