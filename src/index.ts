import { parser as musiclineParser } from './musicline.syntax.grammar'
import { parser as orfeoParser } from './orfeo.syntax.grammar'
import { parser as orfeoErrorParser } from './orfeoError.syntax.grammar'

import { LRLanguage, LanguageSupport } from '@codemirror/language'
import { styleTags, tags as t } from '@lezer/highlight'

export const musiclineLanguage = LRLanguage.define({
  parser: musiclineParser.configure({
    props: [
      styleTags({
        Timepoint:         t.number,
        Voice:             t.integer,
        EventMarkerId:     t.heading1,
        EventNoteId:       t.heading2,
        EventRestId:       t.heading3,
        EventRestedId:     t.heading4,
        EventTailId:       t.heading5,
        EventTempoId:      t.heading6,
        EventMarkerData:   t.string,
        EventTempoData:    t.literal,
        Escape:            t.escape,
        EscapedNoteData:   t.list,
        UnescapedNoteData: t.list,
        LineComment:       t.lineComment,
      }),
    ],
  })
})

export function musicline() {
  return new LanguageSupport(musiclineLanguage)
}

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

export const orfeoErrorLanguage = LRLanguage.define({
  parser: orfeoErrorParser.configure({
    props: [
      styleTags({
        ErrorMessageMarker:     t.namespace,
        CodeLineIndicator:      t.number,
        ErrorEjectIcon:         t.character,
        ErrorSequenceStartIcon: t.keyword,
      }),
    ],
  })
})

export function orfeoError() {
  return new LanguageSupport(orfeoErrorLanguage)
}
