export interface PodcastLists {
    feed: FeedInterface;
}

interface FeedInterface {
    author: Author;
    entry: Array<Entry>;
    icon: LabelInterface;
    id: LabelInterface;
    link: Array<Link>;
    rights: LabelInterface;
    title: LabelInterface;
    updated: LabelInterface;
}

interface Author {
    name: LabelInterface;
    uri: LabelInterface;
}

interface LabelInterface {
    label: string;
}

interface Link {
    attributes: Attribute;
}

interface Attribute {
    href: string;
    rel: string;
    type: string;
}

interface Entry {
    category: Category;
    id: Category;
    ['im:artist']: Category;
    ['im:contentType']: Category;
    ['im:image']: Array<Category>;
    ['im:name']: LabelInterface;
    ['im:price']: Category;
    ['im:releaseDate']: Category;
    link: Category;
    rights: LabelInterface;
    summary: LabelInterface;
    title: LabelInterface;
}

interface Category {
    label?: string;
    attributes: EntryAttribute;
}

interface EntryAttribute {
    ['im:id']?: string;
    label?: string;
    scheme?: string;
    term?: string;
    href?: string;
    height?: string;
    amount?: string;
    currency?: string;
    rel?: string;
}
