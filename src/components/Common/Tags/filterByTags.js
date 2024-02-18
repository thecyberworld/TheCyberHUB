const customSplit = (str, invisibleChar) => {
    const result = [];
    let temp = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === invisibleChar) {
            temp += `${invisibleChar} ${invisibleChar}`;
            i += 2;
        } else if (str[i] === " ") {
            result.push(temp);
            temp = "";
        } else {
            temp += str[i];
        }
    }
    if (temp) result.push(temp);
    return result;
};

export const filterByTags = (tag, searchTerm, setSearchTerm) => {
    const invisibleChar = "\u200b"; // Zero width space character
    const updatedSearchTerm = searchTerm ? customSplit(searchTerm, invisibleChar) : [];
    if (tag.includes(" ")) {
        tag = tag.replace(/ /g, `${invisibleChar} ${invisibleChar}`);
    }
    const index = updatedSearchTerm.indexOf(tag);
    if (index !== -1) {
        updatedSearchTerm.splice(index, 1);
    } else {
        updatedSearchTerm.push(tag);
    }
    setSearchTerm(updatedSearchTerm.join(" "));
};
