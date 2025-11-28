
export interface ReadingLists{
  Reading:ListItem[],
  Completed: ListItem[],
  Dropped: ListItem[],
  PlanToRead: ListItem[]
}

export interface ListItem{
    cover: String;
    title: String;
    author: String;
    score?: number;
    finishDate?: Date;
    key: String;
}

