import { Table, type TableColumn } from '@consta/table/Table';

type User = {
    id: number;
    name: string;
    email: string;
};

type UserRow = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

type Props = {
    users: User[];
    onRowClick: (id: number) => void;
};

const UsersTable = ({ users, onRowClick }: Props) => {
    const preparedRows: UserRow[] = users.map((user) => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ').slice(1).join(' '),
        email: user.email,
    }));

    const columns: TableColumn<UserRow>[] = [
        {
            title: 'Имя',
            accessor: 'firstName',
        },
        {
            title: 'Фамилия',
            accessor: 'lastName',
        },
        {
            title: 'Email',
            accessor: 'email',
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

export default UsersTable;