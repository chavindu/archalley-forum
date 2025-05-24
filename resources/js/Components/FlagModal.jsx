import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';

export default function FlagModal({ show, onClose, flaggableId, flaggableType, flaggableName }) {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await axios.post('/api/flags', {
                flaggable_id: flaggableId,
                flaggable_type: flaggableType,
                reason,
            });

            onClose();
            setReason('');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while submitting the flag.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Flag {flaggableType.split('\\').pop()}
                </h2>
                
                <p className="text-sm text-gray-600 mb-4">
                    You are flagging "{flaggableName}". Please provide a detailed reason for your flag.
                </p>

                <div className="mb-4">
                    <InputLabel htmlFor="reason" value="Reason" />
                    <TextInput
                        id="reason"
                        type="textarea"
                        className="mt-1 block w-full"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        minLength={10}
                        maxLength={1000}
                        placeholder="Please explain why you are flagging this content..."
                    />
                    <InputError message={error} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <SecondaryButton onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={isSubmitting || !reason.trim()}>
                        {isSubmitting ? 'Submitting...' : 'Submit Flag'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
} 