import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { List, Pagination, Segmented, Spin } from 'antd';
import { useCommentsStore } from '../hooks/useCommentsStore';
import { useShallow } from 'zustand/react/shallow'
import dayjs from 'dayjs';

interface Comment {
	id: number;
	taskId: string;
	massiveTaskId: string;
	comment: string;
	parentCommentId: string;
	authorId: string;
	type: string;
	dtInsert: string;
}

interface Page {
	size: number;
	number: number;
	totalElements: number;
	totalPages: number;
}

interface CommentsResponse {
	data: Comment[]
	first: number
	items: number
	last: number
	next: number
	pages: number
	prev: number | null

}

const fetchComments = async (params: { page: number, size: number, sort: 'asc' | 'desc' }): Promise<CommentsResponse> => {
	const { page, size, sort } = params;
	const url = `http://localhost:3000/comments/?_page=${page}&_per_page=${size}&_sort=${sort === 'asc' ? '-' : '' }dtInsert`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
};


export const Comments = () => {
	const {page, size, sort, setPage, setSort} = useCommentsStore(useShallow(state => ({
		page: state.page,
		size: state.size,
		sort: state.sort,
		setSort: state.setSort,
		setPage: state.setPage,
	})));

		const useCommentsData = (params: {page: number, size: number, sort: 'asc' | 'desc'}) => {
			return useQuery<CommentsResponse, Error>({
				queryKey: ['comments', params],
				queryFn: () => fetchComments(params),
				placeholderData: keepPreviousData
			});
		}

	const { data, error, isLoading, isFetching } = useCommentsData({ sort, page, size });

	if (isLoading) return <Spin />;
	if (error) return <div style={{color: 'tomato'}}>Error: {error.message}</div>;

	const handleSort = (value: 'asc' | 'desc') => {
		if (!isFetching) {
			  setSort(value);
		}
	};

	const handlePageChange = (page: number) => {
		if (!isFetching) {
			  setPage(page);
		}
	};

	const handlePagination = (page: number) => {
		handlePageChange(page);
	}

	return (
		<>
			<Segmented
				value={  sort}
				options={[
					{ value: 'asc', label: 'Новые' },
					{ value: 'desc', label: 'Старые' },
				]}
				onChange={handleSort}
			/>
			<List
				itemLayout="horizontal"
				dataSource={data?.data || []}
				renderItem={(item: Comment) => (
					<List.Item>
						<List.Item.Meta
							title={`Comment by ${item.authorId}`}
							description={`${dayjs(item.dtInsert).format('DD-MM-YYYY')} ${item.comment}`}
						/>
					</List.Item>
				)}
			/>
			<Pagination
				current={page}
				pageSize={size}
				total={data?.items}
				onChange={handlePagination}
			/>
		</>
	);
};
