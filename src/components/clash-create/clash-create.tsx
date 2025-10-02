'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { createClash } from '@/domain/clashes';

type FormState = {
  message: string;
  errors: Record<string, string[]>;
  values?: Record<string, string>;
};

export default function ClashCreate() {
  const router = useRouter();
  const initialState: FormState = { message: '', errors: {} };
  const [state, formAction, pending] = useActionState(createClash, initialState);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <form action={formAction} className="space-y-6">
          {/* Title field */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={state.values?.title || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={pending}
            />
            {state.errors?.title && (
              <p className="text-sm text-red-600 mt-1" role="alert">
                {state.errors.title[0]}
              </p>
            )}
          </div>

          {/* Description field */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={state.values?.description || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-gray-100"
              disabled={pending}
            />
            {state.errors?.description && (
              <p className="text-sm text-red-600 mt-1" role="alert">
                {state.errors.description[0]}
              </p>
            )}
          </div>

          {/* Two-column layout for location and address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={state.values?.location || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={pending}
              />
              {state.errors?.location && (
                <p className="text-sm text-red-600 mt-1">{state.errors.location[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={state.values?.address || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={pending}
              />
              {state.errors?.address && (
                <p className="text-sm text-red-600 mt-1">{state.errors.address[0]}</p>
              )}
            </div>
          </div>

          {/* Date field */}
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              defaultValue={state.values?.date || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={pending}
            />
            {state.errors?.date && (
              <p className="text-sm text-red-600 mt-1">{state.errors.date[0]}</p>
            )}
          </div>

          {/* Picture URL field */}
          <div className="space-y-2">
            <label htmlFor="pictureUrl" className="block text-sm font-medium text-gray-700">
              Picture URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pictureUrl"
              name="pictureUrl"
              defaultValue={state.values?.pictureUrl || ''}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={pending}
            />
            {state.errors?.pictureUrl && (
              <p className="text-sm text-red-600 mt-1">{state.errors.pictureUrl[0]}</p>
            )}
          </div>

          {/* Participant IDs field (optional) */}
          <div className="space-y-2">
            <label htmlFor="participantIds" className="block text-sm font-medium text-gray-700">
              Participant IDs (optional)
            </label>
            <input
              type="text"
              id="participantIds"
              name="participantIds"
              defaultValue={state.values?.participantIds || ''}
              placeholder="1, 2, 3 (comma-separated)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={pending}
            />
            {state.errors?.participantIds && (
              <p className="text-sm text-red-600 mt-1">{state.errors.participantIds[0]}</p>
            )}
          </div>

          {/* Created By Peer ID field */}
          <div className="space-y-2">
            <label htmlFor="createdByPeerId" className="block text-sm font-medium text-gray-700">
              Created By Peer ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="createdByPeerId"
              name="createdByPeerId"
              defaultValue={state.values?.createdByPeerId || ''}
              placeholder="Enter peer ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={pending}
            />
            {state.errors?.createdByPeerId && (
              <p className="text-sm text-red-600 mt-1">{state.errors.createdByPeerId[0]}</p>
            )}
          </div>

          {/* Form actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white 
                     font-medium rounded-md hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
            >
              {pending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Clash'
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 
                     text-gray-700 font-medium rounded-md hover:bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>

          {/* Global error message */}
          {state.message && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600" aria-live="polite">
                {state.message}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
