import {formatDate} from '../misc'

test('formatDate formats the date to look nice', () => {
  expect(formatDate(new Date('August 20, 2018'))).toBe('Aug 18')
})
