import {createContext, useContext} from 'react'

export type SectionPreviewContextValue = {
  content?: Array<{_type?: string; children?: Array<{text?: string}>}>
  left?: Array<{_type?: string; children?: Array<{text?: string}>}>
  right?: Array<{_type?: string; children?: Array<{text?: string}>}>
  title?: string
  attribution?: string
}

export const SectionPreviewContext = createContext<SectionPreviewContextValue | null>(null)

export function useSectionPreviewValue() {
  return useContext(SectionPreviewContext)
}
