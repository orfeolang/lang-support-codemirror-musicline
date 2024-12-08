import { parser as musiclineParser } from './musicline.syntax.grammar'
// import { parser as orfeoParser } from './orfeo.syntax.grammar'
import { parser as orfeoErrorParser } from './orfeoError.syntax.grammar'

import { LRLanguage, LanguageSupport } from '@codemirror/language'
import { styleTags, Tag, tags } from '@lezer/highlight'

const customTagNames = [
  // Musicline
  'timepoint',
  'voice',
  'eventTypeMarker',
  'eventTypeNote',
  'eventTypeRest',
  'eventTypeRested',
  'eventTypeTail',
  'eventTypeTempo',
  'eventDataMarker',
  'eventDataNoteEscapeChar',
  'eventDataNote',
  'eventDataRestedEscapeChar',
  'eventDataRested',
  'eventDataTempo',

  // OrfeoError
  'errorHeader',
  'errorLineCursor',
  'errorIconEjectPoint',
  'errorIconSequenceStart',
]

const customTags = Object.fromEntries(
  customTagNames.map(tagName => [tagName, Tag.define()])
)

export const musiclineLanguage = LRLanguage.define({
  parser: musiclineParser.configure({
    props: [
      styleTags({
        LineComment:                       tags.lineComment,
        Timepoint:                         customTags.timepoint,
        Voice:                             customTags.voice,
        EventTypeMarker:                   customTags.eventTypeMarker,
        EventTypeNote:                     customTags.eventTypeNote,
        EventTypeRest:                     customTags.eventTypeRest,
        EventTypeRested:                   customTags.eventTypeRested,
        EventTypeTail:                     customTags.eventTypeTail,
        EventTypeTempo:                    customTags.eventTypeTempo,
        EventDataMarker:                   customTags.eventDataMarker,
        EventDataNoteEscapeChar:           customTags.eventDataNoteEscapeChar,
        EventDataNoteEscaped:              customTags.eventDataNote,
        EventDataNoteUnescapedFormatShort: customTags.eventDataNote,
        EventDataNoteUnescapedFormatLong:  customTags.eventDataNote,
        EventDataRestedEscapeChar:         customTags.eventDataRestedEscapeChar,
        EventDataRestedEscaped:            customTags.eventDataRested,
        EventDataRestedUnescaped:          customTags.eventDataRested,
        EventDataTempo:                    customTags.eventDataTempo,
      }),
    ],
  })
})

export function musicline() {
  return new LanguageSupport(musiclineLanguage)
}

/*
export const orfeoLanguage = LRLanguage.define({
  parser: orfeoParser.configure({
    props: [
      styleTags({
        AtomicComment:          t.comment,
        BlockComment:           t.blockComment,
        Duration:               t.number,
        Marker:                 t.labelName,
        Metronome:              t.literal,
        MusicExprOpen:          t.paren,
        MusicExprClose:         t.paren,
        MusicExprDuration:      t.attributeValue,
        Note:                   t.string,
        NoteBacktick:           t.string,
        NoteContainer:          t.string,
        RepeaterDash:           t.character,
        RepeaterDot:            t.character,
        Rest:                   t.null,
        RestifiedNote:          t.comment,
        RestifiedNoteBacktick:  t.comment,
        RestifiedNoteContainer: t.comment,
        RestifiedRepeaterDash:  t.comment,
        RestifierBackslash:     t.modifier,
        RhythmDot:              t.arithmeticOperator,
        RhythmFlag:             t.arithmeticOperator,
      }),
    ],
  })
})

export function orfeo() {
  return new LanguageSupport(orfeoLanguage)
}

*/

export const orfeoErrorLanguage = LRLanguage.define({
  parser: orfeoErrorParser.configure({
    props: [
      styleTags({
        ErrorHeader:            customTags.errorHeader,
        ErrorLineCursor:        customTags.errorLineCursor,
        ErrorIconEjectPoint:    customTags.errorIconEjectPoint,
        ErrorIconSequenceStart: customTags.errorIconSequenceStart,
      }),
    ],
  })
})

export function orfeoError() {
  return new LanguageSupport(orfeoErrorLanguage)
}
