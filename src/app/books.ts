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

export interface rawFiction{
    key:string;
    name:string;
    subject_type:string;
    solr_query:string;
    work_count:number;
    works:any[];
}

export interface rawSearch{
    numFound: number,
    start: number,
    numFoundExact: boolean,
    num_found: number,
    documentation_url: string,
    q: string,
    offset: any,
    docs: any[]
}

export interface rawSearchAuthor{
    numFound: number,
    start: number,
    numFoundExact: boolean,
    num_found: number,
    documentation_url: string,
    q: string,
    docs: any[]
}