import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Tag {
  name: string;
  count: number;
}

const TagsBrowser: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [perPage, setPerPage] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.stackexchange.com/2.3/tags?pagesize=${perPage}&order=${sortDirection}&sort=${sortBy}&site=stackoverflow`);
        setTags(response.data.items);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchTags();
  }, [perPage, sortBy, sortDirection]);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerPage(Number(event.target.value));
  };

  const handleSortByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

  const handleSortDirectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortDirection(event.target.value as 'asc' | 'desc');
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">Tags Browser</Typography>
      <FormControl>
        <InputLabel>Per Page</InputLabel>
        <Select value={perPage} onChange={handlePerPageChange}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={handleSortByChange}>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="count">Count</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Sort Direction</InputLabel>
        <Select value={sortDirection} onChange={handleSortDirectionChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.name}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TagsBrowser;