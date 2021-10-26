import {Ability} from '@casl/ability';

function subjectName(item) {
    if (!item || typeof item === 'string') {
        return item;
    }
    return item.__type;
}

export default new Ability([], {subjectName});
