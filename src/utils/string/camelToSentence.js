import { capitalize } from '.';

export const camelToSentence = (str) => capitalize(str.replace(/([A-Z])/g, ' $1'));
