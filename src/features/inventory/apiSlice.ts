import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface InventoryItem {
  name: string;
  category: string;
  value?: string;
  quantity: number;
  price: string;
  id: string;
  disabled?: boolean;
}

export const inventoryApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dev-0tf0hinghgjl39z.api.raw-labs.com" }),
  reducerPath: 'inventoryApi',
  tagTypes: ["Inventory"],
  endpoints: (build) => ({
    getInventory: build.query<InventoryItem[], void>({
      query: () => '/inventory', 
      providesTags: (result) =>
        result
          ? [{ type: "Inventory", id: "LIST" }, ...result.map(({ id }) => ({ type: "Inventory" as const, id }))]
          : [{ type: "Inventory", id: "LIST" }],
    }),

    // Delete inventory item
    deleteInventoryItem: build.mutation<void, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: "Inventory", id }, { type: "Inventory", id: "LIST" }],
    }),

    // Update inventory item
    updateInventoryItem: build.mutation<InventoryItem, Partial<InventoryItem> & Pick<InventoryItem, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `/inventory/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Inventory", id }],
    }),
  }),
});

export const {
  useGetInventoryQuery,
  useDeleteInventoryItemMutation,
  useUpdateInventoryItemMutation,
} = inventoryApiSlice;
