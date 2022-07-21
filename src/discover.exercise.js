/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useEffect, useRef, useState} from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import './bootstrap'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'

function DiscoverBooksScreen() {
  const {data, error, run, isLoading, isSuccess, isError} = useAsync()
  const [query, setQuery] = useState('')
  const queried = useRef(false)

  function handleSearchSubmit(event) {
    event.preventDefault()
    setQuery(event.target.elements.search.value)
    queried.current = true
  }

  useEffect(() => {
    if (!queried.current) return
    run(client(`books?query=${encodeURIComponent(query.trim())}`))
  }, [query, queried])

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes css={{color: colors.danger}} aria-label="error" />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError && (
        <div css={{color: colors.danger}}>
          <p>there was an error:</p>
          <pre>{error.message}</pre>
        </div>
      )}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
