import { BookType } from "./BookType";
import { ShelveType } from "./ShelveType";

export interface ItemType extends ShelveType, BookType {
    isBook?: boolean;
}