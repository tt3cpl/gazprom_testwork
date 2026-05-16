import { Table, type TableColumn } from '@consta/table/Table';

type Post = {
    id: number;
    title: string;
};

type PostRow = {
    id: number;
    title: string;
};

type Props = {
    posts: Post[];
    onRowClick: (id: number) => void;
};

const PostsTable = ({ posts, onRowClick }: Props) => {
    const preparedRows: PostRow[] = posts.map((post) => ({
        id: post.id,
        title: post.title,
    }));

    const columns: TableColumn<PostRow>[] = [
        {
            title: 'ID',
            accessor: 'id',
            width: 120,
        },
        {
            title: 'Заголовок',
            accessor: 'title',
            width: 'auto',
        },
    ];

    return (
        <Table
            rows={preparedRows}
            columns={columns}
            getRowKey={(row) => row.id}
            onRowClick={(row) => onRowClick(row.id)}
            stickyHeader
            virtualScroll
            rowHoverEffect
            zebraStriped
        />
    );
};

export default PostsTable;