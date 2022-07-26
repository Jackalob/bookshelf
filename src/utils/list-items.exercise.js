import {useQuery, useMutation, queryCache} from 'react-query'
import {client} from 'utils/api-client'

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useListItems(user) {
  const {data} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(res => res.listItems),
  })
  return data ?? []
}

function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems.find(li => li.bookId === bookId)
}

function useUpdateListItem(user) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        token: user.token,
        data: updates,
      }),
    defaultMutationOptions,
  )
}

function useRemoveListItem(user) {
  return useMutation(
    ({id}) =>
      client(`list-items/${id}`, {
        method: 'DELETE',
        token: user.token,
      }),
    defaultMutationOptions,
  )
}

function useCreateListItem(user) {
  return useMutation(
    ({bookId}) =>
      client('list-items', {
        data: {bookId},
        token: user.token,
      }),
    defaultMutationOptions,
  )
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
