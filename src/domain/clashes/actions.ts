'use server';

import { getClient } from '@/apollo/server';
import { gql } from '@apollo/client';
import { createClashSchema } from './schemas';
import { redirect } from 'next/navigation';

const CREATE_CLASH = gql`
  mutation CreateClash($input: CreateClashInput!) {
    createClash(createClashInput: $input) {
      id
      title
    }
  }
`;

export async function createClash(
  prevState: {
    message: string;
    errors: Record<string, string[]>;
    values?: Record<string, string>;
  } | null,
  formData: FormData,
) {
  // Extract form values
  const formValues = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    location: formData.get('location') as string,
    address: formData.get('address') as string,
    date: formData.get('date') as string,
    pictureUrl: formData.get('pictureUrl') as string,
    participantIds: formData.get('participantIds') as string,
    createdByPeerId: formData.get('createdByPeerId') as string,
  };

  // Parse and validate form data with Zod
  const validatedFields = createClashSchema.safeParse({
    title: formValues.title,
    description: formValues.description,
    location: formValues.location,
    address: formValues.address,
    date: formValues.date,
    pictureUrl: formValues.pictureUrl,
    participantIds: formValues.participantIds
      ? formValues.participantIds
          .split(',')
          .map((id) => id.trim())
          .filter(Boolean)
      : [],
    createdByPeerId: formValues.createdByPeerId,
  });

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
      values: formValues,
    };
  }

  // Execute GraphQL mutation
  try {
    const { data } = await getClient().mutate<{ createClash: { id: string; title: string } }>({
      mutation: CREATE_CLASH,
      variables: {
        input: validatedFields.data,
      },
    });

    // Redirect on success
    if (data?.createClash?.id) {
      redirect(`/clashes/${data.createClash.id}`);
    }

    return {
      errors: {},
      message: 'Failed to create clash. Please try again.',
      values: formValues,
    };
  } catch {
    return {
      errors: {},
      message: 'Failed to create clash. Please try again.',
      values: formValues,
    };
  }
}
