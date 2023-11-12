'use client'
const StoreUserId = (id: string) => {
    window.localStorage.userId = id?.id
    return <></>
}

export default StoreUserId
