import { CircularProgress, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

interface TableColumn {
    id: "title" | "url" | "created_at" | "author",
    label: string,
    width?: number,
    textAlign?: "right"
}

const tableColumns: readonly TableColumn[] = [
    {
        id: "title",
        label: "Title",
        width: 150
    },
    {
        id: "url",
        label: "URL",
        width: 150
    },
    {
        id: "created_at",
        label: "Created at",
        width: 150
    },
    {
        id: "author",
        label: "Author",
        width: 150
    },
]

export interface PostsDataInterface {
    title: string,
    url: string,
    created_at: Date,
    author: string
}

const Home = () => {
    const [postsInfo, setPostsInfo] = useState<PostsDataInterface[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [postsInfoLength, setPostsInfoLength] = useState<number>(0);
    const pageSize: number = 20;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setPageCount(_pageCount => _pageCount + 1)
        }, 10000)

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        getPostsInfo();
        return () => {
            setPostsInfo(postsInfo);
        };
    }, [pageCount])

    const getPostsInfo = async () => {
        try{
            
            setLoading(true);

            await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`)
            .then(response => {

                const getPostData = response.data;

                const _postsInfo = [...postsInfo, ...getPostData.hits];

                setPostsInfo(_postsInfo);
                setPostsInfoLength(_postsInfo.length);

            })

            setLoading(false);
            
        }
        catch(e) {
            setLoading(false);
        }
    }

    const handlePageChange = async (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    }

    const getDetailsInfo = async (post: PostsDataInterface) => {
        history.push({
            pathname: '/details',
            state: post
        })
    }

    return (
        <>
            <h1 data-testid="header" style={{"textAlign": "center"}}>Post List</h1>
            {
                loading ? <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress data-testid="loaderTest" size={30} />
                </Box> : <></>
            }
            <Container style={{maxWidth: "100%"}}>
                <Paper>
                    <TableContainer sx={{height: "calc(100vh - 150px)"}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead data-testid="tableHeader">
                                <TableRow>
                                    {
                                        tableColumns.map(column => 
                                            <TableCell key={column.id} align={column.textAlign} style={{minWidth: column.width}}>
                                                {column.label}
                                            </TableCell>    
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody data-testid="tableBody">
                                {
                                    postsInfo.slice((currentPage - 1)*pageSize, (currentPage - 1)*pageSize + pageSize).map((row, index) => {
                                        return (
                                            <TableRow key={index} onClick={() => getDetailsInfo(row)} >
                                                {
                                                    tableColumns.map(column => {
                                                        const postInfoValue = row[column.id];
                                                        return (
                                                            <TableCell key={column.id}>
                                                                {postInfoValue}
                                                            </TableCell>
                                                        )
                                                    })
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination data-testid="pagePagination" count={postsInfoLength / pageSize } page={currentPage} onChange={handlePageChange} />

                </Paper>
            </Container>
        </>
    );
};

export default Home;