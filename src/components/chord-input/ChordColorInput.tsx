import { EditMode } from '../../domain/EditMode'
import { ClickCellContainer } from './ClickCellContainer'
import * as React from 'react'
import { IChordInputSettings } from '../ChordEditor'
import { ChordMatrix } from '../../services/chord-matrix'
import styled from '@emotion/styled'
import { ColorInput } from '../ColorInput'

export interface IChordTextInputProps {
  settings: IChordInputSettings
  matrix: ChordMatrix
  editMode: EditMode
  onMatrixChange: (matrix: ChordMatrix) => void
  onEditModeChange: (editMode: EditMode) => void
}

interface IInputCellProps {
  size: number
}

const InputCell = styled.div<IInputCellProps>`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  grid-column: span ${(props) => props.size};
  position: relative;
`

const ColorButton = styled.button<{ color: string }>`
  background-color: transparent;
  border: none;
  height: 100%;
  width: 100%;

  :focus,
  :active {
    border: none;
    outline: none;
  }
`

export const ChordColorInput = (props: IChordTextInputProps) => {
  const matrix = props.matrix

  return (
    <ClickCellContainer
      {...props.settings}
      numFrets={matrix.numFrets}
      numStrings={matrix.numStrings}
      clickThrough={props.editMode !== EditMode.EDIT_COLOR}
    >
      {matrix.rows.map((_, fretIndex) =>
        matrix.getSections(fretIndex).map(({ length, empty, string: stringIndex }, sectionIndex) => (
          <InputCell
            key={`${fretIndex}-${sectionIndex}`}
            size={length}
            onClick={empty ? () => props.onEditModeChange(EditMode.EDIT_NOTES) : void 0}
          >
            {!empty && props.editMode === EditMode.EDIT_COLOR && (
              <ColorInput
                render={(renderProps) => (
                  <ColorButton onClick={renderProps.onClick} color={renderProps.value || 'var(--black)'}>
                    <span className="sr-only">pick color</span>
                  </ColorButton>
                )}
                value={matrix.get(fretIndex, stringIndex).color ?? 'var(--black)'}
                onChange={(color) => {
                  props.onMatrixChange(matrix.color(stringIndex, fretIndex, color))
                }}
              />
            )}
          </InputCell>
        ))
      )}
    </ClickCellContainer>
  )
}
