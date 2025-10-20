'use client'	

import { useState } from "react"
import { useMutation } from "convex/react"
import { useParams } from "next/navigation"

import {Dialog,DialogContent,DialogHeader} from '@/components/ui/dialog'
import { useConverImage } from "@/hooks/use-cover-image"
import { SingleImageDropzone } from "@/components/single-image-dropzone"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

export function CoverImageModal () {

  const params = useParams()
  const update = useMutation(api.documents.update)
  const [file,setFile] = useState<File>()
  const [isSubmitting,setIsSubmitting] = useState(false)
  const coverImage = useConverImage()

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
    coverImage.onClose()
  }

  const onChange = async (file?:File) => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      // Create a local blob URL for the image
      const imageUrl = URL.createObjectURL(file)

      await update({
        id:params.documentId as Id<'documents'>,
        coverImage:imageUrl
      })

      onClose()
    }
  }

return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover Image
          </h2>
        </DialogHeader>
        <SingleImageDropzone className="w-full outline-none"
        disabled={isSubmitting}
        value={file}
        onChange={onChange}/>
      </DialogContent>
    </Dialog>
)
}