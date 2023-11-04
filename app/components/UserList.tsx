'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { User } from "@prisma/client";
import { useRouter } from 'next/navigation'
export default function UserList({ users }: { users: User[] }) {
const router = useRouter()

  return (
    <div className="flex flex-col gap-3 mt-[50px]">
      <Table 
        selectionMode="single" 
        aria-label="User List Table"
        onSelectionChange={(e: any) => { 
          router.push(`/?auth=${Number(e.currentKey)}`)
        }}
            >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>USERNAME</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
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
