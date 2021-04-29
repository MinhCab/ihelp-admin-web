import React from 'react'
import { CardHeader, Card, Avatar, ListItemText, ListItemAvatar, List, ListItem } from '@material-ui/core';

const Admins = [
    { id: '1sadasd', avatar: 'J', name: 'Johnathan Deo', role: 'Web Designer' },
    { id: '2dasda', avatar: 'N', name: 'Nirav Joshi', role: 'Fullstack Developer' },
    { id: '3asdasweq', avatar: 'G', name: 'Genelia Desouza', role: 'Graphic Designer' },
    { id: '4wqe', avatar: 'P', name: 'Johnathan Deo', role: 'Web Designer' },
    { id: 'e5', avatar: 'J', name: 'Johnathan Deo', role: 'Web Designer' },
    { id: '6wqe', avatar: 'N', name: 'Nirav Joshi', role: 'Fullstack Developer' },
];

const DashboardAdmins = () => {
    const style = {
        cursor: 'pointer',
    }
    return (
        <Card>
            <CardHeader titleTypographyProps={{ variant: 'h4' }} title="Admins" subheader="List all Admins here" />
            
        </Card>
    );
}

export default DashboardAdmins;