   const generateSlug = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    }

export default generateSlug;