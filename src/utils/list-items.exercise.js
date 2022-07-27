import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from 'utils/api-client'
import {setQueryDataForBook} from './books'

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useListItems(user) {
  const {data} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(res => res.listItems),
    config: {
      onSuccess: listItems => {
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book)
        }
      },
    },
  })
  return data ?? []
}

function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems.find(li => li.bookId === bookId)
}

function useUpdateListItem(user, options) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        token: user.token,
        data: updates,
      }),
    {...defaultMutationOptions, ...options},
  )
}

function useRemoveListItem(user, options) {
  return useMutation(
    ({id}) =>
      client(`list-items/${id}`, {
        method: 'DELETE',
        token: user.token,
      }),
    {...defaultMutationOptions, ...options},
  )
}

function useCreateListItem(user, options) {
  return useMutation(
    ({bookId}) =>
      client('list-items', {
        data: {bookId},
        token: user.token,
      }),
    {...defaultMutationOptions, ...options},
  )
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
