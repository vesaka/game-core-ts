export const cx = (list: ClassList, classList: ClassList | string = ''): ClassList => {
    if (typeof classList === 'string') {
        list[classList] = true;
    }

    return Object.assign(list, classList) as ClassList;
};