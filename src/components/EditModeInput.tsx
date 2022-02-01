import * as React from 'react'
import { EditMode } from '../domain/EditMode'
import styled from '@emotion/styled'
import Button from 'react-bootstrap/Button'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: stretch;

  > button {
    flex: 1;
    margin: 1px;
  }
`

interface IProps {
  onEditModeChange: (mode: EditMode) => void
  editMode: EditMode
}

export default ({ onEditModeChange, editMode }: IProps) => {
  const onChange = (mode: EditMode) => () => onEditModeChange(mode)

  return (
    <>
      <ButtonContainer>
        <Button onClick={onChange(EditMode.EDIT_NOTES)} variant={editMode === EditMode.EDIT_NOTES ? 'dark' : 'outline-dark'} size="sm">
          Edit Notes
        </Button>
        <Button onClick={onChange(EditMode.EDIT_TEXT)} variant={editMode === EditMode.EDIT_TEXT ? 'dark' : 'outline-dark'} size="sm">
          Edit Text
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button onClick={onChange(EditMode.EDIT_COLOR)} variant={editMode === EditMode.EDIT_COLOR ? 'dark' : 'outline-dark'} size="sm">
          Edit Colors
        </Button>
        <Button onClick={onChange(EditMode.EDIT_SHAPE)} variant={editMode === EditMode.EDIT_SHAPE ? 'dark' : 'outline-dark'} size="sm">
          Edit Shapes
        </Button>
      </ButtonContainer>
    </>
  )
}
