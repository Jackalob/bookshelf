import styled from '@emotion/styled/macro'
import {css, keyframes} from '@emotion/core'
import {Dialog as ReachDialog} from '@reach/dialog'
import {ImSpinner2} from 'react-icons/im'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'

const theme = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
}

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const Spinner = styled(ImSpinner2)`
  animation: ${spin} 1s linear infinite;
`
Spinner.defaultProps = {
  'aria-label': 'loading'
}

const Button = styled.button`
  padding: 10px 15px;
  border: 0;
  line-height: 1;
  border-radius: 3px;
  ${({variant = 'primary'}) => css(theme[variant])}
`

// const Button = styled.button({
//   padding: '10px 15px',
//   border: '0',
//   lineHeight: '1',
//   borderRadius: '3px',
// }, ({variant = 'primary'}) => theme[variant])

const Input = styled.input({
  borderRadius: '3px',
  border: `1px solid ${colors.gray10}`,
  background: colors.gray,
  padding: '8px 12px',
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

// 💰 I'm giving a few of these to you:
const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

export {Button, Input, FormGroup, CircleButton, Dialog, Spinner}
