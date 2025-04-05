import { keepPreviousData, useQuery, useQueries } from '@tanstack/react-query';
import { List, Pagination, Segmented, Spin, SegmentedProps, Select, Card, Flex } from 'antd';
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

interface ICommentsParams {
	page: number
	size: number
	sort: 'asc' | 'desc'
}

interface Author {
	id: string;
	name: string;
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

const fetchAuthor = async (authorId: string): Promise<Author> => {
	const response = await fetch(`http://localhost:3000/users/${authorId}`);
	if (!response.ok) {
		throw new Error('Failed to fetch author');
	}
	return response.json();
};

export const Comments = () => {
	const {
		page, 
		size, 
		sort, 
		setPage, 
		setSort,
		setSize,
	} = useCommentsStore(useShallow(state => ({
		page: state.page,
		size: state.size,
		sort: state.sort,
		setSort: state.setSort,
		setPage: state.setPage,
		setSize: state.setSize,
	})));

	const useCommentsData = (params: ICommentsParams) => {
		return useQuery<CommentsResponse, Error>({
			queryKey: ['comments', params],
			queryFn: () => fetchComments(params),
			placeholderData: keepPreviousData
		});
	}
 
	const { data: commentsData, error, isLoading, isFetching } = useCommentsData({ sort, page, size });
	
	const authorIds = commentsData?.data.map(comment => comment.authorId) ?? [];
	
	// const authorQueries = useQueries({
	// 	queries: authorIds.map(id => ({
	// 		queryKey: ['author', id],
	// 		queryFn: () => fetchAuthor(id),
	// 		enabled: !!id
	// 	}))
	// });

	const useAuthorsById = (authorIds: string[]) => {
		const queries =  useQueries({
		queries: authorIds.map(id => ({
			queryKey: ['authors', id],
			queryFn: () => fetchAuthor(id),
			enabled: !!id
		}))
	})
	return {authorQueries: queries}};

	const { authorQueries} = useAuthorsById(authorIds)

	const getAuthorName = (authorId: string) => {
		const authorQuery = authorQueries.find(query => query.data?.id === authorId);
		return authorQuery?.data?.name ?? authorId;
	};

	const perPageOptions = [{ value: 3 }, { value: 4 }, { value: 5 }, { value: 10 }]

	const sortDirectionOptions: SegmentedProps<'asc' | 'desc'>['options'] = [
		{ value: 'asc', label: 'Новые' },
		{ value: 'desc', label: 'Старые' },
	]

	const renderItem = (item: Comment) => (
		<List.Item>
			<List.Item.Meta
				title={`Comment by ${getAuthorName(item.authorId)}`}
				description={`${dayjs(item.dtInsert).format('DD.MM.YYYY')} ${item.comment}`}
			/>
		</List.Item>
	)
	

	const handleSort = (value: 'asc' | 'desc') => {
		if (!isFetching) {
			  setSort(value);
		}
	};

	const handleSize = (value: number) => {
		if (!isFetching) {
			  setSize(value);
		}
	};

	const handlePageChange = (page: number) => {
		if (!isFetching) {
			  setPage(page);
		}
	};

	const handlePagination = (page: number) => {
		if (!isFetching) {
			handlePageChange(page);
		}
	}

console.log(commentsData?.data)

	if (isLoading) return <Spin />;
	if (error) return <div style={{color: 'tomato'}}>Error: {error.message}</div>;

	return (
		<Flex align='center' style={{margin: '0 auto'}}>
			<Card>
				<Segmented
					value={sort}
					options={sortDirectionOptions}
					onChange={handleSort}
				/>
				<Select 
					options={perPageOptions}
					defaultValue={size}
					onChange={handleSize}
				/>
				<List
					itemLayout="horizontal"
					dataSource={commentsData?.data}
					renderItem={(item) => renderItem(item)}
				/>
				{
					(commentsData?.pages ?? 0) > 1
						? <Pagination
							current={page}
							pageSize={size}
							total={commentsData?.items}
							onChange={handlePagination}
							/>
						: null
				}
			</Card>
		</Flex>
	);
};
