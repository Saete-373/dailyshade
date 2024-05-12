export function SelectTag(_tags, index) {
  const updateTags = _tags.map((tag, i) => {
    if (i == index) {
      const toggle = tag[1] == false ? true : false;
      return [tag[0], toggle];
    } else {
      return tag;
    }
  });
  return updateTags;
};
