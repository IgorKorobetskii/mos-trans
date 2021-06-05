import React, { useEffect, useState } from 'react'
import { User } from '../types'

const UsersList = ({ auth }: { auth: User }) => {
  const [usersList, setUsersList] = useState<User[]>([])

  useEffect(() => {
    const fetchUsersList = async () => {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth.username},${auth.password}`
        }
      })
      if (response.status !== 200) return;
      const payload = await response.json()
      setUsersList(payload.users)
    }
    fetchUsersList()
  }, [auth])

  return (
    <div>
      {usersList.map((user) => <div key={user.id}>{JSON.stringify(user)}</div>)}
    </div>
  )
}

export default UsersList
