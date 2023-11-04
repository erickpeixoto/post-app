export async function followUser(followerId: number, followingId: number) {
    try {
            //HANDLE api post request
            const response = await fetch('/api/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({followerId, followingId}),
            });
            const data = await response.json();
            return data;
    } catch (error: any) {
      throw new Error(error)
    }
  }
  export async function unfollowUser(followerId: number, followingId: number) {
    try {
            //HANDLE api post request
            const response = await fetch('/api/unfollow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({followerId, followingId}),
            });
            const data = await response.json();
            return data;
    } catch (error: any) {
      throw new Error(error)
    }
  }
  