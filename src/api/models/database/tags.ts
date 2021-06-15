
/**
 * @summary Represent a record in tags table
 */
export interface ITag {
    id: string;
    name: string;
    description: string;
}

export type INewTag = Omit<ITag, 'id'>