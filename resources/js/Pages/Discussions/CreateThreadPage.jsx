import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import CreateThreadForm from '@/Components/Threads/CreateThreadForm';

export default function CreateThreadPage() {
    return (
        <MainLayout>
            <Head title="Create a New Thread" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CreateThreadForm />
            </div>
        </MainLayout>
    );
} 