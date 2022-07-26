/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {useMutation, queryCache} from 'react-query'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'
import {
  useListItem,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
} from 'utils/list-items'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()
  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({user, book}) {
  const listItem = useListItem(user, book.id)
  
  const [update] = useUpdateListItem(user)
  const [remove] = useRemoveListItem(user)
  const [create] = useCreateListItem(user)

  const handleRemoveClick = () => {
    return remove({id: listItem.id})
  }
  const handleAddClick = () => {
    return create({bookId: book.id})
  }

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={() =>
              update({
                id: listItem.id,
                finishDate: null,
              })
            }
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() =>
              update({
                id: listItem.id,
                finishDate: Date.now(),
              })
            }
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={handleRemoveClick}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={handleAddClick}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
