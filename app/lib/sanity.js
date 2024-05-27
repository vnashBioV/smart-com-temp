import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: 'eh51fhm9',
    dataset: 'production',
    apiVersion: '2024-04-21',
    useCdn: true
});

const imgBuilder = ImageUrlBuilder(client);

export const urlFor = (source) =>{
    return imgBuilder.image(source);
}