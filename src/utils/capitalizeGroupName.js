export const capitalizeGroupName = (groupName) => {
    return groupName
        .split(/[_\s]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
