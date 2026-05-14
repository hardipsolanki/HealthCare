import slugify from 'slugify';

// Configure slugify options
const slugifyConfig = {
    lower: true,
    strict: true,
    trim: true
};




export const generateSlug = (name: string) => {
    const fileNameWithoutExtension = name.replace(/\.[^/.]+$/, "");
    return slugify(fileNameWithoutExtension, slugifyConfig);

}