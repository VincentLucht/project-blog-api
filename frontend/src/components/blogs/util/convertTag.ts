const convertTag = (tag: string) => {
  if (tag === 'WebDevelopment') {
    return 'Web Development';
  } else if (tag === 'FullStack') {
    return 'Full Stack';
  } else {
    return tag;
  }
};

export default convertTag;
