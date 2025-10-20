'use client'	

import { BlockNoteEditor, PartialBlock } from '@blocknote/core'
import { BlockNoteView, useBlockNote } from '@blocknote/react'
import '@blocknote/core/style.css'
import './editor.css'
import { useTheme } from "next-themes"
import { useMemo, useEffect } from 'react'

interface EditorProps{
  onChange:(value:string) => void
  initialContent?:string
  editable?:boolean
}

function Editor ({onChange,initialContent,editable}:EditorProps) {

  const {resolvedTheme} = useTheme()

  const handleUpload = async (file:File) => {
    // For now, return a placeholder URL since EdgeStore requires authentication
    // In a real app, you'd implement your own file upload service
    return URL.createObjectURL(file)
  }

  const initialBlocks = useMemo(() => {
    return initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined
  }, [initialContent])

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialBlocks,
    uploadFile: handleUpload
  })

  useEffect(() => {
    return editor.onChange(() => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
    })
  }, [editor, onChange])

return (
    <div className="blocknote-editor">
      <BlockNoteView 
        editor={editor} 
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  )
}

export default Editor