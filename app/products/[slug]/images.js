'use client'

import Image from "next/image"

const Images = ({product}) => {
    return product.images.map((i)=>{
        return (
            <div className="relative aspect-square w-full h-auto">
            <Image
                alt={i.name}
                className="rounded-lg"
                src={i.file.url}
                fill
                style={{objectFit: 'cover'}}
              />
            </div>
        )
    })
}

export default Images