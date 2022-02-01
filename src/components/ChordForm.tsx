import * as React from 'react'
import { ChangeEvent, useState } from 'react'
import constants from '../constants'
import { ChordSettings, ChordStyle, Orientation } from 'svguitar'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { ChevronDown, ChevronUp, Trash2 } from 'react-feather'
import styled from '@emotion/styled'
import { RangeInput } from './RangeInput'
import { ColorInput } from './ColorInput'
import { IconButton } from './IconButton'
import { useInputState } from '../hooks/use-input-state'

interface IProps {
  settings: ChordSettings
  onSettings: (settings: ChordSettings) => void
  onResetSettings: () => void
}

const ButtonWithIcon = styled(Button)`
  padding-left: 0;

  svg {
    margin-right: 0.5rem;
    position: relative;
    top: -0.15rem;
  }
`

const useNumericInputState = (
  props: IProps,
  settingName: keyof ChordSettings,
  constraints: {
    min?: number
    max?: number
  } = {}
) => {
  const number = props.settings[settingName]
  if (typeof number !== 'number') {
    throw new Error('Cannot use useNumericInputState with non-numeric value')
  }

  return useInputState<number, string>(
    number,
    (x) => (x != null ? String(x) : ''),
    (val) =>
      props.onSettings({
        ...props.settings,
        [settingName]: Number(val)
      }),
    (val) => {
      const numberValue = Number(val)

      return !(
        isNaN(numberValue) ||
        (typeof constraints.min !== 'undefined' && numberValue < constraints.min) ||
        (typeof constraints.max !== 'undefined' && numberValue > constraints.max)
      )
    }
  )
}

const useStringInputState = (props: IProps, settingName: keyof ChordSettings) => {
  const stringValue = props.settings[settingName]
  if (stringValue != null && typeof stringValue !== 'string') {
    throw new Error('Cannot use useStringInputState for non-strings')
  }

  return useInputState(
    stringValue,
    (x) => x,
    (val) =>
      props.onSettings({
        ...props.settings,
        [settingName]: val
      })
  )
}

const useBooleanInputState = (props: IProps, settingName: keyof ChordSettings) => {
  const booleaValue = props.settings[settingName]
  if (booleaValue != null && typeof booleaValue !== 'boolean') {
    throw new Error('Cannot use useBooleanInputState for non-strings')
  }

  return useInputState(
    booleaValue,
    (x) => x,
    (val) =>
      props.onSettings({
        ...props.settings,
        [settingName]: val
      })
  )
}

export const ChordForm = (props: IProps) => {
  const [showMoreSettings, setShowMoreSettings] = useState(false)

  // numeric settings
  const [position, setPosition] = useNumericInputState(props, 'position', { min: 1 })
  const [frets, setFrets] = useNumericInputState(props, 'frets', { min: 2 })
  const [strings, setStrings] = useNumericInputState(props, 'strings', { min: 2 })
  const [fretSize, setFretSize] = useNumericInputState(props, 'fretSize')
  const [nutSize, setNutSize] = useNumericInputState(props, 'nutSize')
  const [strokeWidth, setStrokeWidth] = useNumericInputState(props, 'strokeWidth', { min: 2 })

  // string settings
  const [title, setTitle] = useStringInputState(props, 'title')
  const [color, setColor] = useStringInputState(props, 'color')
  const [backgroundColor, setBackgroundColor] = useStringInputState(props, 'backgroundColor')
  const [style, setStyle] = useStringInputState(props, 'style')
  const [orientation, setOrientation] = useStringInputState(props, 'orientation')

  // boolean settings
  const [fixedDiagramPosition, setFixedDiagramPosition] = useBooleanInputState(props, 'fixedDiagramPosition')

  return (
    <Form>
      <Form.Row>
        <Form.Group controlId="title" as={Col} lg="3" sm="6">
          <Form.Label column={true}>Title</Form.Label>
          <Form.Control type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} value={title || ''} />
        </Form.Group>
        <Form.Group controlId="startingFret" as={Col} lg="3" sm="6">
          <Form.Label column={true}>Starting Fret</Form.Label>
          <Form.Control type="number" placeholder="Starting fret..." onChange={(e) => setPosition(e.target.value)} value={position} />
        </Form.Group>
        <Form.Group controlId="numberOfFrets" as={Col} lg="3" sm="6">
          <Form.Label column={true}>Number of Frets</Form.Label>
          <Form.Control
            type="number"
            placeholder="Number of frets..."
            onChange={(e) => setFrets(e.target.value)}
            max={constants.maxFrets}
            min="2"
            value={frets}
          />
        </Form.Group>
        <Form.Group controlId="numberOfStrings" as={Col} lg="3" sm="6">
          <Form.Label column={true}>Number of Strings</Form.Label>
          <Form.Control
            type="number"
            placeholder="Number of strings..."
            onChange={(e) => setStrings(e.currentTarget.value)}
            max={constants.maxStrings}
            value={strings}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Col>
          <ButtonWithIcon variant="link" onClick={() => setShowMoreSettings(!showMoreSettings)}>
            {showMoreSettings ? (
              <>
                <ChevronUp />
                Hide Settings
              </>
            ) : (
              <>
                <ChevronDown />
                Show More Settings
              </>
            )}
          </ButtonWithIcon>
        </Col>
      </Form.Row>

      {showMoreSettings && (
        <>
          <Form.Row>
            <Form.Group controlId="style" as={Col} lg="3" sm="6">
              <Form.Label column={true}>Style</Form.Label>
              <Form.Control as="select" onChange={(e) => setStyle(e.target.value)} value={style}>
                <option value={ChordStyle.normal}>Normal</option>
                <option value={ChordStyle.handdrawn}>Handdrawn</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="orientation" as={Col} lg="3" sm="6">
              <Form.Label column={true}>Orientation</Form.Label>
              <Form.Control as="select" onChange={(e) => setOrientation(e.target.value)} value={orientation}>
                <option value={Orientation.vertical}>Vertical</option>
                <option value={Orientation.horizontal}>Horizontal</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="height" as={Col} lg="3" sm="6">
              <Form.Label column={true}>Height</Form.Label>
              <RangeInput type="range" min={0.7} max={5} step={0.1} onChange={(e) => setFretSize(e.target.value)} value={fretSize} />
            </Form.Group>

            <Form.Group controlId="nutSize" as={Col} lg="3" sm="6">
              <Form.Label column={true}>Nut Size</Form.Label>
              <RangeInput type="range" min={0.3} max={1.5} step={0.025} onChange={(e) => setNutSize(e.target.value)} value={nutSize} />
            </Form.Group>

            <Form.Group controlId="strokeWidth" as={Col} lg="3" sm="6">
              <Form.Label column={true}>Stroke Width</Form.Label>
              <RangeInput
                type="range"
                min={1}
                max={10}
                step={1}
                onChange={(e) => setStrokeWidth(e.currentTarget.value)}
                value={strokeWidth}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="color" as={Col} lg="3" sm="6">
              <Form.Label column={true}>Color</Form.Label>
              <ColorInput onChange={setColor} value={color} />
            </Form.Group>

            <Form.Group controlId="backgroundColor" as={Col} lg="3" sm="6">
              <Form.Label column={true}>Background Color</Form.Label>
              <ColorInput onChange={setBackgroundColor} value={backgroundColor} />
            </Form.Group>

            <Form.Group controlId="fixedDiagramPosition" as={Col} lg="3" sm="6" className="text-lg-center">
              <Form.Label column={true}>Position</Form.Label>
              <Form.Check
                checked={!!fixedDiagramPosition}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFixedDiagramPosition(e.target.checked)}
                custom
                type="checkbox"
                label="Fix Diagram Position"
              />
            </Form.Group>

            <Form.Group controlId="reset" as={Col} lg="3" sm="6">
              <Form.Label column={true}>Reset</Form.Label>
              <IconButton variant="outline-dark" onClick={props.onResetSettings}>
                <Trash2 />
                Reset all Settings
              </IconButton>
            </Form.Group>
          </Form.Row>
        </>
      )}
    </Form>
  )
}
