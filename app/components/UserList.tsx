'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { User } from "@prisma/client";

export default function UserList({ users }: { users: User[] }) {
        
  return (
    <div className="flex flex-col gap-3 mt-[50px]">
      <Table 
        selectionMode="single" 
        defaultSelectedKeys={["2"]} 
        aria-label="User List Table"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{ 
                new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
