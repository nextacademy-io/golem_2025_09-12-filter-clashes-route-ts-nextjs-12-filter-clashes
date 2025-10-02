# Next.js Workshop: Filter Clashes - route.ts

In this task you'll implement a clash filtering system using [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) and custom hooks. You'll learn how to create API endpoints, implement client-side data fetching, build reusable hooks, and create an interactive filter component with search button functionality.

## Route Handlers and API Routes Overview

Before proceeding, familiarize yourself with Next.js API concepts:

- **[Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Complete guide to creating API endpoints
- **[Dynamic Route Segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)** - For parameterized routes
- **[Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)** - Building reusable data fetching logic

> [!IMPORTANT] > **Client vs Server Data Fetching**: While Server Components excel at initial data loading, interactive filtering requires client-side fetching to update the UI dynamically without page refreshes.

## Project Structure Setup

### Create Filter Functionality Structure

Set up the file structure for clash filtering functionality:

```
src/
├── app/
│   ├── api/
│   │   └── clashes/
│   │       └── route.ts (API endpoint)
│   └── clashes/
│       └── page.tsx (existing clash list)
├── components/
│   ├── clash-filter/
│   │   ├── index.ts
│   │   └── clash-filter.tsx (filter input component)
│   └── clash-list/
│       └── clash-list.tsx (updated to use filter)
└── domain/
    └── clashes/
        ├── actions.ts (server actions)
        ├── use-clashes.ts (custom hook)
        └── index.ts
```

## Server Action Implementation

### Create Filter Clashes Action

Implement the server-side filtering logic with GraphQL integration:

```typescript
// src/domain/clashes/actions.ts
'use server';

import { getClient } from '@/apollo/server';
import { gql } from '@apollo/client';

const GET_ALL_CLASHES = gql`
  query GetAllClashes {
    clashes {
      id
      title
      description
      location
      address
      date
      pictureUrl
      createdByPeer {
        id
        name
      }
      participants {
        id
        name
      }
    }
  }
`;

export async function filterClashes(term: string) {
  try {
    // Fetch all clashes from GraphQL API
    const { data } = await getClient().query({
      query: GET_ALL_CLASHES,
      fetchPolicy: 'no-cache', // Ensure fresh data
    });

    // If no search term, return all clashes
    if (!term || term.trim() === '') {
      return data.clashes;
    }

    // Filter clashes by title or description (case-insensitive)
    const searchTerm = term.toLowerCase().trim();
    const filteredClashes = data.clashes.filter((clash: any) => {
      const titleMatch = clash.title?.toLowerCase().includes(searchTerm) ?? false;
      const descriptionMatch = clash.description?.toLowerCase().includes(searchTerm) ?? false;
      return titleMatch || descriptionMatch;
    });

    return filteredClashes;
  } catch (error) {
    console.error('Error filtering clashes:', error);
    throw new Error('Failed to filter clashes');
  }
}
```

Key implementation points:

- Use `'use server'` directive for Server Actions
- Fetch all clashes first using GraphQL query
- Implement case-insensitive filtering on title and description
- Handle empty search terms by returning all clashes
- Provide proper error handling

> [!TIP]
> Since the GraphQL API doesn't support filtering, we implement it client-side after fetching all data. This approach works well for smaller datasets but consider pagination for larger ones.

## API Route Handler Implementation

### Create Clashes Route Handler

Build the API endpoint using [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers):

```typescript
// src/app/api/clashes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { filterClashes } from '@/domain/clashes/actions';

export async function GET(request: NextRequest) {
  try {
    // Extract search term from query parameters
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term') ?? '';

    // Filter clashes using server action
    const clashes = await filterClashes(term);

    return NextResponse.json({
      success: true,
      data: clashes,
      count: clashes.length,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch clashes',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
```

Key features:

- **Query Parameters**: Extract `term` from URL search params
- **Error Handling**: Proper HTTP status codes and error responses
- **Consistent Response**: Structured JSON with success/error states
- **Type Safety**: Use NextRequest and NextResponse types

> [!IMPORTANT]
> Follow the [Route Handler documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) for best practices on request handling, response formatting, and error management.

## Custom Hook Implementation

### Create useClashes Hook

Build a reusable hook for clash data management:

```typescript
// src/domain/clashes/use-clashes.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { type GetAllClashesForFilterQuery } from '@/gql/graphql';

// Extract the clash type from the query result
type ClashFromQuery = GetAllClashesForFilterQuery['clashes'][0];

interface UseClashesReturn {
  clashes: ClashFromQuery[];
  loading: boolean;
  error: string | null;
  reload: (term: string) => Promise<void>;
}

export function useClashes(): UseClashesReturn {
  const [clashes, setClashes] = useState<ClashFromQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClashes = useCallback(async (searchTerm: string = '') => {
    try {
      setLoading(true);
      setError(null);

      // Build API URL with query parameter
      const url = new URL('/api/clashes', window.location.origin);
      if (searchTerm.trim()) {
        url.searchParams.set('term', searchTerm.trim());
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch clashes');
      }

      setClashes(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setClashes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const reload = useCallback(
    async (term: string) => {
      await fetchClashes(term);
    },
    [fetchClashes],
  );

  // Load initial data
  useEffect(() => {
    fetchClashes();
  }, [fetchClashes]);

  return { clashes, loading, error, reload };
}
```

Key features:

- **TypeScript Types**: Full type safety for clash data
- **State Management**: Loading, error, and data states
- **Memoization**: `useCallback` for performance optimization
- **URL Construction**: Proper query parameter handling
- **Error Handling**: Comprehensive error states and messaging

> [!TIP]
> Learn more about [custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) for creating reusable stateful logic across components.

## Filter Component Implementation

### Create ClashFilter Component

Build an interactive search input with search button:

```typescript
// src/components/clash-filter/clash-filter.tsx
'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface ClashFilterProps {
  onFilter: (term: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export default function ClashFilter({
  onFilter,
  loading = false,
  placeholder = 'Search clashes by title or description...',
}: ClashFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onFilter(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onFilter(''); // Clear the search when clearing input
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex gap-2">
        <div className="relative flex-1">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search
              className={`h-5 w-5 ${loading ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`}
            />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     text-sm"
            disabled={loading}
          />

          {/* Clear Button */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center
                       text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:bg-blue-300 disabled:cursor-not-allowed
                   text-sm font-medium whitespace-nowrap"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
}
```

Key features:

- **Search Button**: Explicit search trigger prevents unnecessary API calls
- **Enter Key Support**: Press Enter to search for better UX
- **Visual Feedback**: Loading states and search button indicators
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Clear Functionality**: Easy way to reset search and automatically clear results
- **Responsive Design**: Works on mobile and desktop

> [!TIP]
> **Search Button Benefits**: Using a search button provides predictable behavior, prevents input focus issues, and gives users control over when searches are performed. This approach is more reliable than automatic filtering while typing.

### Export Components

```typescript
// src/components/clash-filter/index.ts
export { default } from './clash-filter';
```

## Updated ClashList Integration

### Integrate Filter into ClashList

Update the existing ClashList component to use the new filter functionality:

```typescript
// src/components/clash-list/clash-list.tsx
'use client';

import { useClashes } from '@/domain/clashes/use-clashes';
import ClashFilter from '@/components/clash-filter';
import ClashCard from './clash-card';

export default function ClashList() {
  const { clashes, loading, error, reload } = useClashes();

  const handleFilter = async (term: string) => {
    await reload(term);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
          <h3 className="text-red-800 font-medium mb-2">Error Loading Clashes</h3>
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={() => reload('')}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Clashes</h1>
        <ClashFilter onFilter={handleFilter} loading={loading} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && clashes.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 flex items-center justify-center">
            <Search className="h-12 w-12" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No clashes found</h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search terms or create a new clash.
          </p>
        </div>
      )}

      {/* Clashes Grid */}
      {!loading && clashes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clashes.map((clash) => (
            <ClashCard key={clash.id} clash={clash} />
          ))}
        </div>
      )}

      {/* Results Counter */}
      {!loading && clashes.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {clashes.length} clash{clashes.length !== 1 ? 'es' : ''}
        </div>
      )}
    </div>
  );
}
```

Key integration points:

- **Remove GraphQL**: Replace direct GraphQL queries with custom hook
- **Add Filter Component**: Position filter prominently in the header
- **Loading States**: Show skeleton loading during data fetching
- **Empty States**: Provide helpful messaging when no results found
- **Error Handling**: Display retry options for failed requests

## Bonus: Server Action Integration

### Direct Server Action Usage

For improved performance, modify the hook to use server actions directly:

```typescript
// src/domain/clashes/use-clashes.ts (Bonus Version)
'use client';

import { useState, useEffect, useCallback } from 'react';
import { type GetAllClashesForFilterQuery } from '@/gql/graphql';
import { filterClashes } from './actions';

// Extract the clash type from the query result
type ClashFromQuery = GetAllClashesForFilterQuery['clashes'][0];

export function useClashes(): UseClashesReturn {
  const [clashes, setClashes] = useState<ClashFromQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClashes = useCallback(async (searchTerm: string = '') => {
    try {
      setLoading(true);
      setError(null);

      // Call server action directly (bypassing API route)
      const result = await filterClashes(searchTerm);
      setClashes(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setClashes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const reload = useCallback(
    async (term: string) => {
      await fetchClashes(term);
    },
    [fetchClashes],
  );

  useEffect(() => {
    fetchClashes();
  }, [fetchClashes]);

  return { clashes, loading, error, reload };
}
```

Benefits of direct server action usage:

- **Reduced Latency**: Eliminates API route overhead
- **Better Type Safety**: Direct TypeScript integration
- **Simplified Architecture**: Fewer layers in the data flow
- **Enhanced Performance**: Direct server-to-client communication

> [!TIP] > **Server Actions vs API Routes**: Server Actions are ideal for form submissions and simple data operations, while API Routes are better for complex REST APIs, third-party integrations, and when you need full HTTP control.

## Testing and Validation

### Filter Testing Checklist

Test these scenarios:

1. **Initial Load**: All clashes displayed without filter
2. **Search Functionality**: Filter by title and description using search button
3. **Enter Key Support**: Press Enter to trigger search
4. **Empty Results**: Graceful handling of no matches
5. **Error Handling**: Network failures and server errors
6. **Clear Function**: Reset search to show all clashes
7. **Loading States**: Visual feedback during search (button shows "Searching...")
8. **Focus Behavior**: Input maintains focus during searches

## URL State Management (Advanced)

### Sync Filter with URL Parameters

For enhanced UX, synchronize the filter state with URL parameters:

```typescript
// Enhanced ClashFilter with URL sync
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClashFilter({ onFilter }: ClashFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  // Update URL when search is performed
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm.trim()) {
      params.set('q', searchTerm.trim());
    } else {
      params.delete('q');
    }
    router.push(`?${params.toString()}`, { scroll: false });
    onFilter(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    router.push(`?${params.toString()}`, { scroll: false });
    onFilter('');
  };

  // Rest of component implementation...
}
```

Benefits:

- **Shareable URLs**: Users can share filtered results
- **Browser Navigation**: Back/forward buttons work with filters
- **Bookmark Support**: Save filtered states
- **SEO Benefits**: Search engines can index filtered content

## File Structure Summary

After completing this task, your enhanced file structure will include:

```
src/
├── app/
│   ├── api/
│   │   └── clashes/
│   │       └── route.ts
│   └── clashes/
│       └── page.tsx (updated)
├── components/
│   ├── clash-filter/
│   │   ├── index.ts
│   │   └── clash-filter.tsx
│   └── clash-list/
│       └── clash-list.tsx (updated)
├── domain/
│   └── clashes/
│       ├── actions.ts (updated)
│       ├── use-clashes.ts (new)
│       └── index.ts (updated)
└── apollo/ (existing)
```

## Key Learning Outcomes

By completing this workshop, you'll master:

- **[Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** for API endpoint creation
- **[Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)** for data management
- **Client-Side Data Fetching** patterns and error handling
- **Search Button Patterns** for predictable user interactions
- **Component Integration** and state synchronization

> [!IMPORTANT] > **Next.js Route Handlers Documentation**: This workshop follows the official [Route Handlers Guide](https://nextjs.org/docs/app/building-your-application/routing/route-handlers). Refer to it for advanced patterns like middleware, authentication, and caching strategies.
