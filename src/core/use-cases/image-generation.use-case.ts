type GeneratedImage = Image | null;

interface Image {
  url: string;
  alt: string;
}

export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string
): Promise<GeneratedImage> => {

    try {

        const response = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                originalImage,
                maskImage
            })
        });


        if (!response.ok) {
            throw new Error('No se pudo generar la imagen');
        }

        const {url,revised_prompt:alt} = await response.json();

        console.log('url',url,'alt',alt);
        
        return {url,alt};

        
    } catch (error) {
        console.log(error);
        return null;
    }

};
