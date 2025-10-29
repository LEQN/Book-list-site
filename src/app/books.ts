export interface Books {
    author: String;
    cover: String;
    publishYear: number;
    key: String;
    title: String;
}

export interface rawTrending{
    query:String;
    works:any[];
    days: number;
    hours: number;
}

export interface rawClassics{
    key:string;
    name:string;
    subject_type:string;
    solr_query:string;
    work_count:number;
    works:any[];
}