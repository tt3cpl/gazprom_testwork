import '../styles/main.css';
import { Text } from '@consta/uikit/TextDeprecated';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { Select } from '@consta/uikit/Select';
import { Button } from '@consta/uikit/Button'

const options = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
];

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

function Pagination({
    currentPage,
    totalPages,
    limit,
    onPageChange,
    onLimitChange,
}: PaginationComponentProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <Theme preset={presetGpnDefault}>
        <div className="pagination-container">
            <div className="limit-select">
                <Text
                className="limit-text"
                view='primary'
                weight="bold"
                size='s'
                lineHeight="2xs"
                display='inline'>
                    Элементов на странице:
                </Text>
                <Select
                    className="limit-select"
                    size="s"
                    items={options}
                    value={options.find((item) => item.value === limit)}
                    onChange={(item) => onLimitChange(item?.value || 10)}
                    getItemKey={(item) => item.value}/>
            </div>

            <div className="pagination-controls">
                <Button
                    label="Предыдущая"
                    view="primary"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}/>

                <div className="page-numbers">
                    {getPageNumbers().map((page, index) =>
                        typeof page === 'string' ? (
                            <Text
                                key={`dots-${index}`}
                                className="page-dots"
                                view="secondary"
                                size="s">
                                {page}
                            </Text>
                        ) : (
                            <Button
                                key={page}
                                label={String(page)}
                                view={currentPage === page ? 'primary' : 'ghost'}
                                size="s"
                                onClick={() => onPageChange(page as number)}/>
                        ),
                    )}
                </div>

                <Button
                    label="Следующая"
                    view="primary"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}/>
            </div>

            <div>
                <Text
                size="xs"
                view="secondary">
                    Страница {currentPage} из {totalPages}
                </Text>
            </div>
        </div>
        </Theme>
    );
}

export default Pagination;