// File: /utils/supabaseLogger.ts

import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { PostgrestError } from '@supabase/supabase-js'; // Importing the type for errors

// Define the allowed methods
type SupabaseMethod = 'select' | 'insert' | 'update' | 'delete';

// Base interface ensuring 'method' is present
interface BaseQuery {
  table: string;
  method: SupabaseMethod;
}

// Define interfaces for different query types without generics
interface SelectQuery extends BaseQuery {
  method: 'select';
  queryParams: {
    select?: string;
    eq?: { field: string; value: any };
    single?: boolean;
  };
}

interface InsertQuery extends BaseQuery {
  method: 'insert';
  queryParams: {
    data: any;
  };
}

interface UpdateQuery extends BaseQuery {
  method: 'update';
  queryParams: {
    data: any;
    eq: { field: string; value: any };
  };
}

interface DeleteQuery extends BaseQuery {
  method: 'delete';
  queryParams: {
    eq: { field: string; value: any };
  };
}

// Union type for all possible queries without generics
type SupabaseQuery = SelectQuery | InsertQuery | UpdateQuery | DeleteQuery;

// Define the response structure without generics
interface SupabaseResponse {
  data: any | null;
  error: PostgrestError | null;
}

// Type guards to help TypeScript narrow down the union type
function isSelectQuery(query: SupabaseQuery): query is SelectQuery {
  return query.method === 'select';
}

function isInsertQuery(query: SupabaseQuery): query is InsertQuery {
  return query.method === 'insert';
}

function isUpdateQuery(query: SupabaseQuery): query is UpdateQuery {
  return query.method === 'update';
}

function isDeleteQuery(query: SupabaseQuery): query is DeleteQuery {
  return query.method === 'delete';
}

// Function to handle Supabase queries and log interactions
async function logSupabaseQuery(query: SupabaseQuery): Promise<SupabaseResponse> {
  try {
    // Log the incoming query
    console.log(`Executing ${query.method.toUpperCase()} on table '${query.table}':`, query.queryParams);

    let result: { data: any; error: PostgrestError | null };

    // Use type guards to handle each query type
    if (isSelectQuery(query)) {
      let selectQuery = supabaseAdmin.from(query.table).select(query.queryParams.select || '*');
      if (query.queryParams.eq) {
        selectQuery = selectQuery.eq(query.queryParams.eq.field, query.queryParams.eq.value);
      }
      if (query.queryParams.single) {
        result = await selectQuery.single();
      } else {
        result = await selectQuery;
      }
    } else if (isInsertQuery(query)) {
      result = await supabaseAdmin
        .from(query.table)
        .insert(query.queryParams.data)
        .select()
        .single();
    } else if (isUpdateQuery(query)) {
      if (!query.queryParams.eq) {
        throw new Error('Update queries must have an "eq" condition.');
      }
      result = await supabaseAdmin
        .from(query.table)
        .update(query.queryParams.data)
        .eq(query.queryParams.eq.field, query.queryParams.eq.value)
        .select()
        .single();
    } else if (isDeleteQuery(query)) {
      if (!query.queryParams.eq) {
        throw new Error('Delete queries must have an "eq" condition.');
      }
      result = await supabaseAdmin
        .from(query.table)
        .delete()
        .eq(query.queryParams.eq.field, query.queryParams.eq.value)
        .select()
        .single();
    } else {
      // This block should never be reached due to type guards
      const _exhaustiveCheck: never = query.method;
      throw new Error(`Unsupported query method: ${query.method}`);
    }

    // Handle the result
    if (result.error) {
      console.error(`Error during ${query.method.toUpperCase()} on '${query.table}':`, result.error.message);
    } else {
      console.log(`${query.method.toUpperCase()} on '${query.table}' successful. Result:`, result.data);
    }

    return { data: result.data, error: result.error };
  } catch (error) {
    console.error(`Unexpected error during operation on '${query.table}':`, error);
    throw error;
  }
}

export default logSupabaseQuery;
